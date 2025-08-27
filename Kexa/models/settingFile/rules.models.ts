import { LevelEnum } from '../../enum/level.enum';
import { ObjectNameEnum } from '../../enum/objectName.enum';
import { ProviderEnum } from '../../enum/provider.enum';
import type { ParentRules, RulesConditions } from './conditions.models';

export interface Rules {
    name?:string;
    description?:string;
    urlDescription?:string;                         // the url to explain why we should do this or documentation
    notification?: string;                         // the notification to send if the rule is not respected
    applied:boolean;                               // should we analyse this rule ?
    level:LevelEnum;                                // the level of the rule: 0 information , 1 warning, 2 error, 3 critical
    cloudProvider:ProviderEnum|string;             // the cloud provider : azure, gcp, aws, ovh
    objectName:ObjectNameEnum|string;               // the name of the object in this cloud provider
    conditions: RulesConditions[]|ParentRules[];    // the conditions to create the rule
    loud?:boolean;                                  // should we display the result of the rule either it's true or false
    loudMessage?:string;                            // the message to display if the rule is true
}