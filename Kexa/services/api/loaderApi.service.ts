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
        for (let i = 0; i < config[key].length; i++) {
            try {
                const response = await axios.get(process.env.KEXA_API_URL + `/kexa/projectNotificationGroups/${config[key][i].ID}`, 
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
                        notificationGroups[y].rules = notificationGroups[y].rules || [];
                        if (Array.isArray(response.data.message)) {
                            notificationGroups[y].rules = [...notificationGroups[y].rules, ...response.data.message];
                        } else {
                            notificationGroups[y].rules.push(response.data.message);
                        }
                } catch (error) {
                    logger.error(error);
                }
            }
    return rules;
}

export async function getConfigFromApi(){
    let name = process.env.KEXA_API_TOKEN_NAME;
    let token = process.env.KEXA_API_TOKEN;
    let projects = [];
    try {
        const response = await axios.get(process.env.KEXA_API_URL + '/kexa/activeProjects', 
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
        });
      
        return acc;
      }, {});

    projects = groupedProjects;
    return projects;
}