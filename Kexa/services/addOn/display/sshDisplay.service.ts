import type { Rules } from "../../../models/settingFile/rules.models";

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean = false): string {
    switch (rule?.objectName) {
        case "sshd_config":
            return `SSH Config`;
        case "sysctl":
            return `Sysctl: ${objectContent?.key} = ${objectContent?.value}`;
        case "users":
            return `User: ${objectContent?.username} | uid: ${objectContent?.uid} | shell: ${objectContent?.shell}`;
        case "services":
            return `Service: ${objectContent?.name} | state: ${objectContent?.state}`;
        case "file_permissions":
            return `File: ${objectContent?.path} | mode: ${objectContent?.mode} | owner: ${objectContent?.owner}:${objectContent?.group}`;
        case "os_info":
            return `OS: ${objectContent?.id ?? 'unknown'} | kernel: ${objectContent?.kernel}`;
        default:
            return JSON.stringify(objectContent);
    }
}
