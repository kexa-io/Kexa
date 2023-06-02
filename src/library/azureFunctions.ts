import { 
    NetworkManagementClient,
    VirtualNetwork,
    //Subnet,
    NetworkInterface,
    NetworkSecurityGroup,
    //SecurityRule
} from "@azure/arm-network";
import { ComputeManagementClient, Disk, VirtualMachine } from "@azure/arm-compute";
import { ResourceManagementClient , ResourceGroup } from "@azure/arm-resources";
import * as azureClass from "./azureClass";
//import * as yamlClass from "./yamlClass";
import { Logger } from "tslog";
import fs from "fs";
import yaml from "js-yaml";

////////////////////////////////////////////////////////////////////////////////////////////////////////
let debug_mode                = 2;
const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "functionLogger" });

////////////////////////////////////////////////////////////////////////////////////////////////////////
//// LISTING CLOUD RESOURCES
////////////////////////////////////////////////////////////////////////////////////////////////////////
//network security group list
export async function networkSecurityGroup_listing(client:NetworkManagementClient) {
    logger.info("starting networkSecurityGroup_listing");
    try {
        const result_list = new Array<NetworkSecurityGroup>;
        for await (const item of client.networkSecurityGroups.listAll()) {
            result_list.push(item);
        }
        logger.info("ended networkSecurityGroup_listing");
        return result_list;        
    } catch (err) {
        logger.error("error in networkSecurityGroup_listing:"+err);
        return null;
    }
}

//virtual network list
export async function virtualNetworks_listing(client:NetworkManagementClient) {
    logger.info("starting virtualNetworks_listing");
    try {
        const result_list = new Array<VirtualNetwork>;
        for await (const item of client.virtualNetworks.listAll()) {
            result_list.push(item);
        }

        return result_list;
    } catch (err) {
        logger.error("error in virtualNetworks_listing:"+err);
        return null;
    }
}

//network list
export async function networkInterfaces_listing(client:NetworkManagementClient) {
    logger.info("starting networkInterfaces_listing");
    try {
        const result_list = new Array<NetworkInterface>;
        for await (const item of client.networkInterfaces.listAll()) {
            result_list.push(item);
        }
        return result_list;
    } catch (err) {
        logger.error("error in networkInterfaces_listing:"+err);
        return null;
    }
}

//disks.list
export async function disks_listing(client:ComputeManagementClient) {
    logger.info("starting disks_listing");
    try {
        const result_list = new Array<Disk>;
        for await (const item of client.disks.list()) {
            result_list.push(item);
        }
        return result_list;
    } catch (err) {
        logger.error("error in disks_listing:"+err);
        return null;
    }    
}

//virtualMachines.listAll
export async function virtualMachines_listing(client:ComputeManagementClient) {
    logger.info("starting virtualMachines_listing");
    try {
        const result_list = new Array<VirtualMachine>;
        for await (let item of client.virtualMachines.listAll()){
            result_list.push(item);
        }
        return result_list;
    }catch (err) {
        logger.error("error in virtualMachines_listing:"+err);
        return null;
    } 
}

//resourceGroups.list
export async function resourceGroup_listing(client:ResourceManagementClient) {
    logger.info("starting resourceGroup_listing");
    try {
        const result_list = new Array<ResourceGroup>;
        for await (let item of client.resourceGroups.list()){
            result_list.push(item);
        }
        return result_list;
    }catch (err) {
        logger.error("error in resourceGroup_listing:"+err);
        return null;
    }     
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
//Analyse  list
// read the yaml file with rules
// exam each rules and raise alarm or not
export async function mainAnalyse(rulesDirectory:string) {
    // list directory
    const paths = await fs.promises.readdir(rulesDirectory, { withFileTypes: true});
    logger.debug("listing rules files.");
    for(const p of paths) {
        logger.debug("getting "+rulesDirectory+"/"+p.name+" rules.");
        //let fileContent = fs.readFileSync(rulesDirectory+"/"+p.name, 'utf8');
        await analyseRule(rulesDirectory+"/"+p.name);
    }
}

export async function analyseRule(ruleFilePath:string) {
    logger.debug("analyse:"+ruleFilePath);
    try {
        const doc = yaml.load(fs.readFileSync(ruleFilePath, 'utf8')) as any;

        //TODO : be more precise on the type of doc
        console.log(doc);
        for( let rule of doc[1].rules) {
            logger.debug("name:"+rule.name);
            logger.debug("description:"+rule.description);
            logger.debug("applied:"+rule.applied);
        }
    } catch (e) {
        logger.error("error"+e);
    }    
}

export async function networkSecurityGroup_analyse(nsgList: Array<NetworkSecurityGroup>) {
    try {
        const result_list = new Array<azureClass.CkiNetworkSecurityGroup>;
        for await (let item of nsgList){
            let nsgAnalysed = new azureClass.CkiNetworkSecurityGroupClass();
            nsgAnalysed.analysed= true;
            nsgAnalysed.scanningDate=new Date();
            //rising default security to low level . 0 is low security
            nsgAnalysed.securityLevel=0;
            //check default rules
            if(item.securityRules) {
                for(let secrules of item.securityRules) {
                    //check for blocking rules in and out
                }
            }
        }
        return result_list;
    }catch (e) {
        logger.error("error"+e);
        return null;
    }  
}