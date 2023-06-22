import { ConditionEnum } from "../../enum/condition.enum";
import { OperatorEnum } from "../../enum/operator.enum";

export interface  RulesConditions {
    property:string;                   // name of the attribute in the object
    condition:ConditionEnum;
    value:number|string;               // 0 or other decimal and NULL , NOT NULL OR other string
}

export interface ParentRules {
    name?:string;
    description?:string;
    operator:OperatorEnum;                  // AND, OR, NOT, XOR, NAND, NOR, XNOR
    rules: RulesConditions[]|ParentRules[]; // the conditions to create the rule
}