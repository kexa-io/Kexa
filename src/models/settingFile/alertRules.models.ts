import { LevelEnum } from "../../enum/level.enum";
import { OperatorEnum } from "../../enum/operator.enum";

export interface AlertRules {
    level: LevelEnum;
    min: number;
}