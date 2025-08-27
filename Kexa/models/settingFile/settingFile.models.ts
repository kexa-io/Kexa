import type { Alert } from "./alert.models";
import type { Rules } from "./rules.models";

export interface SettingFile {
    version: string;
    date: string;
    alert: Alert;
    rules:Rules[];
}