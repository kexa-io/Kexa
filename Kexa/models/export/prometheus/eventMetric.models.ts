import { LevelEnum } from "../../../enum/level.enum";

export interface EventMetric {
    level: LevelEnum;
    ruleName: string;
    identifier: string;
    timestamp: number;
}