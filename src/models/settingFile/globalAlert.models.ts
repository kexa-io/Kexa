import { AlertRules, ParentAlertRules } from "./alertRules.models";
import { ConfigAlert } from "./configAlert.models";

export interface GlobalConfigAlert extends ConfigAlert {
    conditions: AlertRules[]|ParentAlertRules[];
}