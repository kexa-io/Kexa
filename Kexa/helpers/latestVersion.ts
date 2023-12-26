export async function displayVersionAndLatest(logger: any): Promise<void>{
    const axios = require('axios');
    let version = require('../../package.json').version;
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.github.com/repos/4urcloud/Kexa_githubAction/releases',
        headers: { }
    };
    let latestsVersionInGithub = await axios.request(config);
    let latestVersionInGithub = null;
    let betterUpgrade = -1;
    latestsVersionInGithub.data.forEach((element: any) => {
        if(!element.tag_name.includes("SNAPSHOT")){
            latestVersionInGithub = element;
            if(!latestVersionInGithub){
                latestVersionInGithub = element.tag_name;
                return;
            }
            let versionArray = version.split('.');
            let latestVersionInGithubArray = latestVersionInGithub.tag_name.split('.');
            for(let i = 0; i < versionArray.length; i++){
                if(parseInt(versionArray[i]) < parseInt(latestVersionInGithubArray[i])){
                    latestVersionInGithub = element.tag_name;
                    betterUpgrade = i;
                    return;
                }
            }
        }
    });
    logger.info(`Current version: ${version}`);
    if(betterUpgrade != -1){
        logger.info(`Latest version in Github: ${latestVersionInGithub}`);
        logger.info(`You should upgrade to the latest version to get the best experience.`);
        if(betterUpgrade == 0) logger.info(`It's a major upgrade, be aware that some breaking changes may have been made.`);
    }
    return Promise.resolve();
}