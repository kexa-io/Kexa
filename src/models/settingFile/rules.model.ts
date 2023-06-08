import { RulesConditions } from './conditions.model';

export interface  Rules {
    name?:string;
    description?:string;
    urlDescription?:string;             // the url to explain why we should do this or documentation
    applied?:boolean;                   // should we analyse this rule ?
    level:number;                       // the level of the rule: 0 information , 1 warning, 2 error, 3 critical
    conditions?: RulesConditions[];     // the conditions to create the rule
}