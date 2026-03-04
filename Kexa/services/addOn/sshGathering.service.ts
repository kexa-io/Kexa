/*
    * Provider : ssh
    * Thumbnail : https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Unofficial_SSH_Logo.svg/512px-Unofficial_SSH_Logo.svg.png
    * Documentation : https://www.npmjs.com/package/ssh2
    * Creation date : 2026-03-04
    * Resources :
    *       - sshd_config
    *       - sysctl
    *       - users
    *       - services
    *       - file_permissions
    *       - os_info
*/

import { Client as SSHClient } from 'ssh2';
import { readFileSync } from 'fs';
import env from "dotenv";
import { getConfigOrEnvVar } from "../manageVarEnvironnement.service";
import { getContext, getNewLogger } from "../logger.service";
import type { SshResources } from "../../models/ssh/resource.models";
import type { SshConfig } from "../../models/ssh/config.models";

env.config();
const logger = getNewLogger("SshLogger");

let currentConfig: SshConfig;

function execCommand(conn: SSHClient, cmd: string): Promise<string> {
    return new Promise((resolve, reject) => {
        conn.exec(cmd, (err, stream) => {
            if (err) return reject(err);
            let stdout = '';
            let stderr = '';
            stream.on('data', (data: Buffer) => { stdout += data.toString(); });
            stream.stderr.on('data', (data: Buffer) => { stderr += data.toString(); });
            stream.on('close', () => {
                resolve(stdout);
            });
        });
    });
}

async function createSshConnection(config: SshConfig): Promise<SSHClient> {
    const host = await getConfigOrEnvVar(config, "SSH_HOST", config.prefix);
    const user = await getConfigOrEnvVar(config, "SSH_USER", config.prefix);
    const password = await getConfigOrEnvVar(config, "SSH_PASSWORD", config.prefix);
    const port = Number(await getConfigOrEnvVar(config, "SSH_PORT", config.prefix)) || 22;
    const privateKeyPath = await getConfigOrEnvVar(config, "SSH_PRIVATE_KEY", config.prefix);

    if (!host || !user) {
        throw new Error("SSH connection information (host, user) is required. Please check your configuration.");
    }

    if (!password && !privateKeyPath) {
        throw new Error("SSH authentication requires either SSH_PASSWORD or SSH_PRIVATE_KEY. Please check your configuration.");
    }

    return new Promise((resolve, reject) => {
        const conn = new SSHClient();
        const connConfig: any = {
            host,
            port,
            username: user,
        };

        if (privateKeyPath) {
            try {
                connConfig.privateKey = readFileSync(privateKeyPath);
            } catch (e: any) {
                return reject(new Error(`Cannot read SSH private key at ${privateKeyPath}: ${e.message}`));
            }
        } else {
            connConfig.password = password;
        }

        conn.on('ready', () => {
            logger.debug("Connected to SSH host: " + host);
            resolve(conn);
        });
        conn.on('error', (err) => {
            reject(new Error(`SSH connection failed to ${host}:${port}: ${err.message}`));
        });
        conn.connect(connConfig);
    });
}

export async function collectData(sshConfigs: SshConfig[]): Promise<SshResources[] | null> {
    const context = getContext();
    const allResources = new Array<SshResources>();

    for (const config of sshConfigs ?? []) {
        currentConfig = config;
        let conn: SSHClient | null = null;

        try {
            context?.log("Starting SSH collection with prefix: " + config.prefix);
            logger.debug("Starting SSH collection with prefix: " + config.prefix);

            conn = await createSshConnection(config);

            const [sshdConfig, sysctl, users, services, filePerms, osInfo] = await Promise.all([
                collectSshdConfig(conn),
                collectSysctl(conn),
                collectUsers(conn),
                collectServices(conn),
                collectFilePermissions(conn),
                collectOsInfo(conn),
            ]);

            allResources.push({
                sshd_config: sshdConfig,
                sysctl,
                users,
                services,
                file_permissions: filePerms,
                os_info: osInfo,
            });

        } catch (e: any) {
            logger.error("Error during SSH data collection: " + e.message);
            context?.log("Error during SSH data collection: " + e.message);
        } finally {
            if (conn) {
                logger.debug("Closing SSH connection.");
                conn.end();
            }
        }
    }
    return allResources.length > 0 ? allResources : null;
}

async function collectSshdConfig(conn: SSHClient): Promise<Record<string, string>[] | null> {
    if (!currentConfig?.ObjectNameNeed?.includes("sshd_config")) return [];
    logger.debug("Collecting sshd_config...");
    try {
        const output = await execCommand(conn, 'sshd -T 2>/dev/null || cat /etc/ssh/sshd_config 2>/dev/null');
        if (!output.trim()) return [];
        const config: Record<string, string> = {};
        for (const line of output.split('\n')) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) continue;
            const spaceIdx = trimmed.indexOf(' ');
            if (spaceIdx === -1) continue;
            const key = trimmed.substring(0, spaceIdx).toLowerCase();
            const value = trimmed.substring(spaceIdx + 1).trim();
            config[key] = value;
        }
        return [config];
    } catch (e: any) {
        logger.error("Error collecting sshd_config: " + e.message);
        return [];
    }
}

async function collectSysctl(conn: SSHClient): Promise<Array<{ key: string; value: string }> | null> {
    if (!currentConfig?.ObjectNameNeed?.includes("sysctl")) return [];
    logger.debug("Collecting sysctl...");
    try {
        const output = await execCommand(conn, 'sysctl -a 2>/dev/null');
        if (!output.trim()) return [];
        const results: Array<{ key: string; value: string }> = [];
        for (const line of output.split('\n')) {
            const trimmed = line.trim();
            if (!trimmed) continue;
            const eqIdx = trimmed.indexOf('=');
            if (eqIdx === -1) continue;
            const key = trimmed.substring(0, eqIdx).trim();
            const value = trimmed.substring(eqIdx + 1).trim();
            results.push({ key, value });
        }
        return results;
    } catch (e: any) {
        logger.error("Error collecting sysctl: " + e.message);
        return [];
    }
}

async function collectUsers(conn: SSHClient): Promise<Array<{ username: string; uid: number; gid: number; home: string; shell: string }> | null> {
    if (!currentConfig?.ObjectNameNeed?.includes("users")) return [];
    logger.debug("Collecting users...");
    try {
        const output = await execCommand(conn, 'cat /etc/passwd');
        if (!output.trim()) return [];
        const results: Array<{ username: string; uid: number; gid: number; home: string; shell: string }> = [];
        for (const line of output.split('\n')) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) continue;
            const parts = trimmed.split(':');
            if (parts.length < 7) continue;
            results.push({
                username: parts[0],
                uid: parseInt(parts[2], 10),
                gid: parseInt(parts[3], 10),
                home: parts[5],
                shell: parts[6],
            });
        }
        return results;
    } catch (e: any) {
        logger.error("Error collecting users: " + e.message);
        return [];
    }
}

async function collectServices(conn: SSHClient): Promise<Array<{ name: string; state: string }> | null> {
    if (!currentConfig?.ObjectNameNeed?.includes("services")) return [];
    logger.debug("Collecting services...");
    try {
        const output = await execCommand(conn, 'systemctl list-unit-files --type=service --no-legend --no-pager 2>/dev/null');
        if (!output.trim()) return [];
        const results: Array<{ name: string; state: string }> = [];
        for (const line of output.split('\n')) {
            const trimmed = line.trim();
            if (!trimmed) continue;
            const parts = trimmed.split(/\s+/);
            if (parts.length < 2) continue;
            const name = parts[0].replace('.service', '');
            const state = parts[1];
            results.push({ name, state });
        }
        return results;
    } catch (e: any) {
        logger.error("Error collecting services: " + e.message);
        return [];
    }
}

async function collectFilePermissions(conn: SSHClient): Promise<Array<{ path: string; mode: string; owner: string; group: string }> | null> {
    if (!currentConfig?.ObjectNameNeed?.includes("file_permissions")) return [];
    logger.debug("Collecting file_permissions...");
    try {
        const criticalFiles = [
            '/etc/passwd', '/etc/shadow', '/etc/group', '/etc/gshadow',
            '/etc/ssh/sshd_config', '/etc/crontab'
        ];
        const output = await execCommand(conn, `stat -c '%n %a %U %G' ${criticalFiles.join(' ')} 2>/dev/null`);
        if (!output.trim()) return [];
        const results: Array<{ path: string; mode: string; owner: string; group: string }> = [];
        for (const line of output.split('\n')) {
            const trimmed = line.trim();
            if (!trimmed) continue;
            const parts = trimmed.split(' ');
            if (parts.length < 4) continue;
            results.push({
                path: parts[0],
                mode: parts[1],
                owner: parts[2],
                group: parts[3],
            });
        }
        return results;
    } catch (e: any) {
        logger.error("Error collecting file_permissions: " + e.message);
        return [];
    }
}

async function collectOsInfo(conn: SSHClient): Promise<Record<string, string>[] | null> {
    if (!currentConfig?.ObjectNameNeed?.includes("os_info")) return [];
    logger.debug("Collecting os_info...");
    try {
        const [kernel, osRelease, hostname, uptimeSince] = await Promise.all([
            execCommand(conn, 'uname -r 2>/dev/null'),
            execCommand(conn, 'cat /etc/os-release 2>/dev/null'),
            execCommand(conn, 'hostname 2>/dev/null'),
            execCommand(conn, 'uptime -s 2>/dev/null'),
        ]);

        const info: Record<string, string> = {
            kernel: kernel.trim(),
            hostname: hostname.trim(),
            uptime_since: uptimeSince.trim(),
        };

        for (const line of osRelease.split('\n')) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) continue;
            const eqIdx = trimmed.indexOf('=');
            if (eqIdx === -1) continue;
            const key = trimmed.substring(0, eqIdx).toLowerCase();
            const value = trimmed.substring(eqIdx + 1).replace(/^"|"$/g, '');
            info[key] = value;
        }

        return [info];
    } catch (e: any) {
        logger.error("Error collecting os_info: " + e.message);
        return [];
    }
}
