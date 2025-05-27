import { getEnvVar } from "../services/manageVarEnvironnement.service";

export async function displayVersionAndLatest(logger: any): Promise<void>{
    const axios = require('axios');
    let currentVersion = require('../../package.json').version;
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.github.com/repos/kexa-io/Kexa/releases',
        headers: { }
    };
    let latestsVersionInGithub = await axios.request(config);
    let latestVersionInGithub: null|string = null;
    let betterUpgrade = -1;
    let next = false;
    if(currentVersion.includes("SNAPSHOT")) currentVersion = currentVersion.split('-')[0];
    let currentVersionArray = currentVersion.split('.');
    latestsVersionInGithub.data.forEach((element: any) => {
        if(!element.tag_name.includes("SNAPSHOT")){
            let githubVersionArrayTest = element.tag_name.split('.');
            for(let i = 0; i < currentVersionArray.length; i++){
                if(next) return;
                if(parseInt(currentVersionArray[i]) > parseInt(githubVersionArrayTest[i])){
                    next = true;
                    return;
                }
                if(parseInt(currentVersionArray[i]) < parseInt(githubVersionArrayTest[i])){
                    latestVersionInGithub = element.tag_name;
                    betterUpgrade = i;
                    next = true;
                    return;
                }
            }
            next = false;
        }
    });
    return Promise.resolve();
}