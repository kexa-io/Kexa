export interface  RulesConditions {
    cloudProvider?:string;              // the cloud provider : azure, gcp, aws, ovh
    objectName?:string;                 // the name of the object in this cloud provider
    function?:string;                   // count , sum , is 
    condition?:string;                  // == , > , < , >= , <= , !=
    value?:number;                      // 0 or other decimal and NULL , NOT NULL
}