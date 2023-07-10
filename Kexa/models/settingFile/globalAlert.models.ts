import { AlertRules } from "./alertRules.models";
import { ConfigAlert } from "./configAlert.models";

export interface GlobalConfigAlert extends ConfigAlert {
    conditions: AlertRules[];
    name?: string;
}