import type { AlertRules } from "./alertRules.models";
import type { ConfigAlert } from "./configAlert.models";

export interface GlobalConfigAlert extends ConfigAlert {
    conditions: AlertRules[];
    name: string;
}