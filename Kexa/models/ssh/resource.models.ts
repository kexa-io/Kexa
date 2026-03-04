export interface SshResources {
    sshd_config: Record<string, string>[] | null;
    sysctl: Array<{ key: string; value: string }> | null;
    users: Array<{ username: string; uid: number; gid: number; home: string; shell: string }> | null;
    services: Array<{ name: string; state: string }> | null;
    file_permissions: Array<{ path: string; mode: string; owner: string; group: string }> | null;
    os_info: Record<string, string>[] | null;
}
