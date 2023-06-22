import { LevelEnum } from '../../enum/level.enum';
import { ObjectNameEnum } from '../../enum/objectName.enum';
import { ProviderEnum } from '../../enum/provider.enum';
import { ParentRules, RulesConditions } from './conditions.model';

export interface  Rules {
    name?:string;
    description?:string;
    urlDescription?:string;                         // the url to explain why we should do this or documentation
    applied?:boolean;                               // should we analyse this rule ?
    level:LevelEnum;                                // the level of the rule: 0 information , 1 warning, 2 error, 3 critical
    cloudProvider:ProviderEnum;                     // the cloud provider : azure, gcp, aws, ovh
    objectName:ObjectNameEnum;                      // the name of the object in this cloud provider
    conditions: RulesConditions[]|ParentRules[];    // the conditions to create the rule
}