import type { Config } from "../settingFile/config.models";

export interface SshConfig extends Config {
    SSH_HOST?: string;
    SSH_USER?: string;
    SSH_PASSWORD?: string;
    SSH_PORT?: number;
    SSH_PRIVATE_KEY?: string;
}
