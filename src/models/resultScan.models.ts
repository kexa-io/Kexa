import { RulesConditions } from "./settingFile/conditions.model";
import { Rules } from "./settingFile/rules.model";

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