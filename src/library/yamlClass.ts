////////////////////////////////////////////////////////////////////////////////////////////////////////
//// Class to cast object for yaml files
////////////////////////////////////////////////////////////////////////////////////////////////////////
export interface SettingFile {
    version: string;
    date: Date;
    listRules:Rules[];
}

export interface  Rules {
    name?:string;
    description?:string;
    urlDescription?:string;             // the url to explain why we should do this or documentation
    applied?:boolean;                   // should we analyse this rule ?
    level:number;                       // the level of the rule: 0 information , 1 warning, 2 error, 3 critical
    conditions?: RulesConditions[];     // the conditions to create the rule
}

export interface  RulesConditions {
    cloudProvider?:string;              // the cloud provider : azure, gcp, aws, ovh
    objectName?:string;                 // the name of the object in this cloud provider
    function?:string;                   // count , sum , is 
    condition?:string;                  // == , > , < , >= , <= , !=
    value?:number;                      // 0 or other decimal and NULL , NOT NULL
}