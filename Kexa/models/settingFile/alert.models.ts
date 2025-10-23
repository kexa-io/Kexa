import type { ConfigAlert } from "./configAlert.models";
import type { GlobalConfigAlert } from "./globalAlert.models";

export interface Alert {
    fatal: ConfigAlert;
    error: ConfigAlert;
    warning: ConfigAlert;
    info: ConfigAlert;
    global: GlobalConfigAlert;
}