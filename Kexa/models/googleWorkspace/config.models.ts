import type { Config } from "../settingFile/config.models";

export interface googleWorkspaceConfig extends Config {
    WORKSPACECRED?: string;
    WORKSPACETOKEN?: string;
}