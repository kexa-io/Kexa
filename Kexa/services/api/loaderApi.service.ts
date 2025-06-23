import axios from 'axios';

import {createSettingsFileFromApiData} from './formatterApi.service';
import {decryptData} from './decryptApi.service';
import {getNewLogger} from '../logger.service';

const logger = getNewLogger("ApiLoaderLogger");

export async function getSettingsFileFromApi(config: any){
    let notificationGroups = await getNotificationGroupsFromApi(config);
    let rules = await getRulesFromApi(notificationGroups);
    let settings = [];

    for (let i = 0; i < notificationGroups.length; i++) {
        settings.push(await createSettingsFileFromApiData(notificationGroups[i]));
    }
    return settings;
};

export async function getEnvVarFromApi(name: string, prefix: string) {
    let tokenName = process.env.KEXA_API_TOKEN_NAME;
    let token = process.env.KEXA_API_TOKEN;
    
    let value = null;
    let decrypted = null;

    try {
        const response = await axios.post(
          process.env.KEXA_API_URL + `/kexa/envVar`,
          { prefix: prefix.slice(0, -1), name: name },
          {
            headers: {
              User: tokenName,
              Authorization: token
             }
          }
        );
        value = response.data.message;
        decrypted = decryptData(value.cred);
        return decrypted;
      } catch (error: any) {
        logger.error('API request failed:', error.message);
        if (error.response) {
          logger.debug('Server responded with:', error.response.data);
        } else if (error.request) {
            logger.debug('No response received:', error.request);
        }
      }
      
}   

export async function getNotificationGroupsFromApi(config: any){
    let name = process.env.KEXA_API_TOKEN_NAME;
    let token = process.env.KEXA_API_TOKEN;
    let notificationGroups: any = [];
    
    for (const key of Object.keys(config)) {
        if (key !== 'save') {
            await Promise.all(config[key].map(async (item: any) => {
                try {
                    const response = await axios.get(process.env.KEXA_API_URL + `/kexa/projectNotificationGroups/${item.ID}`, 
                        {
                            headers: {
                                User: name,
                                Authorization: token
                            }
                        });                
                    if (Array.isArray(response.data.message)) {
                        notificationGroups = [...notificationGroups, ...response.data.message];
                    } else {
                        notificationGroups.push(response.data.message);
                    }
                } catch (error) {
                    console.error(error);
                }
            }));
        }
    }
    return notificationGroups;
}

export async function getRulesFromApi(notificationGroups: any){
    let name = process.env.KEXA_API_TOKEN_NAME;
    let token = process.env.KEXA_API_TOKEN;
    let rules: any = [];

    for (let y = 0; y < notificationGroups.length; y++) {
                try {
                    const response = await axios.get(process.env.KEXA_API_URL + `/kexa/groupRules/${notificationGroups[y].ID}`, 
                        {
                            headers: {
                                User: name,
                                Authorization: token
                            }
                        });
                        notificationGroups[y].rules = response.data.message || [];
                } catch (error) {
                    logger.error(error);
                }
            }
    return rules;
}

function addSaveModuleToConfig(config: any, saveModules: any) {
    const saveArray = saveModules.map((module: any) => ({
        type: module?.type,
        name: module?.name ?? null,
        token: module?.token ?? null,
        description: module?.description,
        urlName: module?.urlName ?? null,
        isActive: module?.isActive
    }));
    config.save = saveArray;
    return config;
}

async function getSaveModuleFromApi(){
    let name = process.env.KEXA_API_TOKEN_NAME;
    let token = process.env.KEXA_API_TOKEN;
    let saveModules: any = [];

    try {
        const response = await axios.get(process.env.KEXA_API_URL + '/saveModule/active', 
            {
                headers: {
                    User: name,
                    Authorization: token
                }
            });
        saveModules = response.data.message;
    } catch (error) {
        console.error(error);
    }
    return saveModules;
}

export async function getConfigFromApi(saveOnly: boolean = false){
    let name = process.env.KEXA_API_TOKEN_NAME;
    let token = process.env.KEXA_API_TOKEN;
    let saveModules = await getSaveModuleFromApi();
    
    if (saveOnly) {
        const saveConfig = saveModules.map((module: any) => ({
            type: module?.type,
            name: module?.name ?? null,
            token: module?.token ?? null,
            description: module?.description,
            urlName: module?.urlName ?? null,
            isActive: module?.isActive
        }));
        return { save: saveConfig };
    }

    let projects = [];
    if (!process.env.CRONICLE_TRIGGER_ID_FROM) {
        throw new Error('CRONICLE_TRIGGER_ID_FROM has not been received in the environment variables (should be sent from frontend)');
    }
    try {

        const response = await axios.get(process.env.KEXA_API_URL + '/kexa/projectsByTrigger/' + process.env.CRONICLE_TRIGGER_ID_FROM, 
            {
                headers: {
                    User: name,
                    Authorization: token
                }
            });
        projects = response.data.message;
    } catch (error) {
        console.error(error);
    }

    const groupedProjects = projects.reduce((acc: any, project: any) => {
        const providerName = project.provider.name;
        if (!acc[providerName]) {
          acc[providerName] = [];
        }
        acc[providerName].push({
          description: project.description,
          prefix: project.prefix.prefix + '_',
          rules: project.rules,
          notificationGroups: project.notificationGroups,
          ID: project.ID,
          URL: project.url ?? null,
          METHOD: project.method ?? null,
          body: project.body ?? null,
          headers: project.headers ?? null 
        });
        return acc;
      }, {});
    projects = groupedProjects;
    addSaveModuleToConfig(projects, saveModules);
    return projects;
}