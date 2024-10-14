import axios from 'axios';

export async function getConfigFromApi(){


    console.log("Get Configuration from API IN FUNCITON");
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
      
        // If this provider name doesn't exist in the accumulator, initialize it with an empty array
        if (!acc[providerName]) {
          acc[providerName] = [];
        }
      
        // Push the transformed project details into the respective provider group
        acc[providerName].push({
          description: project.description, // Use the description field from the project
          prefix: project.prefix.prefix + '_', // Append underscore to the prefix
          rules: project.rules // Rules associated with the project
        });
      
        return acc;
      }, {});
      console.log(groupedProjects);
    console.log("Get Configuration from API IN FUNCITON END");
    return projects;
   // await axios.get(process.env.API_CONFIGURATION_URL);
}

// if(!save.name) throw new Error("name is required");
// let name = (await getEnvVar(save.name))??save.name;
// let token = (await getEnvVar(save.token))??save.token;
// logger.info(`Saving to Kexa SaaS`);
// context?.log(`Saving to Kexa SaaS`);
// result.forEach(async (resultScan) => {
//     resultScan.forEach(async (subResultScan) => {
//         subResultScan.identifier = propertyToSend(subResultScan.rule, subResultScan.objectContent, true);
//     });
// });
// await axios.post((process.env.DOMAINEKEXA??`https://api.kexa.io`) + `/api/job/save`, {result: result, save}, {
//     headers: {
//         User: name,
//         Authorization: token
//     }
// });