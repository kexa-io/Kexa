import { ConfigAlert } from "./configAlert.models";
import { GlobalConfigAlert } from "./globalAlert.models";

export interface Alert {
    fatal: ConfigAlert;
    error: ConfigAlert;
    warning: ConfigAlert;
    info: ConfigAlert;
    global: GlobalConfigAlert;
}