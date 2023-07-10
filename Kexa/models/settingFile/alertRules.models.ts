import { LevelEnum } from "../../enum/level.enum";

export interface AlertRules {
    level: LevelEnum;
    min: number;
}