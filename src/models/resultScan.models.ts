import { RulesConditions } from "./settingFile/conditions.models";
import { Rules } from "./settingFile/rules.models";

export interface ResultScan {
    objectContent?: any;
    rule?: Rules;
    error: SubResultScan[];
    message?: string;
}

export interface SubResultScan {
    value: any;
    result: boolean;
    condition: RulesConditions[];
    message?: string;
}