import { ParentRules, RulesConditions } from "./settingFile/conditions.models";
import { Rules } from "./settingFile/rules.models";

export interface ResultScan {
    objectContent?: any;
    rule: Rules;
    error: SubResultScan[];
    message?: string;
    loud?: LoudScan;
    identifier?: string;
}

export interface SubResultScan {
    value: any;
    result: boolean;
    condition: RulesConditions[];
    message?: string;
}

export interface LoudScan {
    value: any;
    result: boolean;
    //condition: RulesConditions[];
    condition: RulesConditions[] | ParentRules[];
    message?: string;
}