import { AlertEnum } from "../../enum/alert.enum";

export interface ConfigAlert {
    enabled: boolean;
    type: AlertEnum[];
    to: string[];
}