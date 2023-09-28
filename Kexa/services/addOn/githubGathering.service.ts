/*
    * Provider : github
    * Thumbnail : https://www.google.com/url?sa=i&url=https%3A%2F%2F1000logos.net%2Fgithub-logo%2F&psig=AOvVaw3BxGP9QmjIVtP2wSPtAl58&ust=1695803448120000&source=images&cd=vfe&opi=89978449&ved=0CA4QjRxqFwoTCLDy4KLux4EDFQAAAAAdAAAAABAE
    * Documentation : https://docs.github.com/en/rest?apiVersion=2022-11-28
    * Creation date : 2023-08-14
    * Note : 
    * Resources :
    *     - repositories
    *     - branches
    *     - issues
*/

import { Octokit } from "octokit";
import env from "dotenv";
import { GitResources } from "../../models/git/resource.models";
import { getConfigOrEnvVar, getEnvVar, setEnvVar } from "../manageVarEnvironnement.service";
import { Logger } from "tslog";
import { GitConfig } from "../../models/git/config.models";
env.config();

import {getNewLogger} from "../logger.service";
const logger = getNewLogger("GithubLogger");

export async function collectData(gitConfig:GitConfig[]): Promise<GitResources[]|null>{
    let resources = new Array<GitResources>();
    for(let config of gitConfig??[]){
        let prefix = config.prefix??(gitConfig.indexOf(config)+"-");
        let githubToken = await getConfigOrEnvVar(config, "GITHUBTOKEN", prefix);
        if(!githubToken){
            throw new Error("- Please pass GITHUBTOKEN in your config file");
        }
        setEnvVar("GITHUBTOKEN", githubToken)
        try {
            logger.info("Gathering github data");
            const allRepo = await collectRepo();
            let allBranches: any[] = [];
            let allIssues: any[] = [];
            logger.info("Collecting github branches");
            logger.info("Collecting github issues");
            await Promise.all(allRepo.map(async (repo) => {
                const [issues, branches] = await Promise.all([
                    collectIssues(repo.name, repo.owner.login),
                    collectBranch(repo.name, repo.owner.login)
                ]);
            
                allIssues.push(...addInfoRepo(repo, issues));
                allBranches.push(...addInfoRepo(repo, branches));
            }));
            resources.push({
                "repositories": allRepo,
                "branches": allBranches,
                "issues": allIssues
            });
        }catch(e){
            logger.error(e);
        }
    }
    return resources??null;
}

function addInfoRepo(repo: any, datas:any): any[]{
    datas.forEach((data:any) =>{
        data["repo"] = repo.name;
        data["repoUrl"] = repo.html_url;
    });
    return datas;
}

async function getOctokit(){
    return new Octokit({ auth: await getEnvVar("GITHUBTOKEN") });
}

export async function collectRepo(){
    logger.info("Collecting github repositories");
    return (await (await getOctokit()).request('GET /user/repos')).data;
}

export async function collectBranch(repo: string, owner: string): Promise<any[]>{
    return (await (await getOctokit()).request('GET /repos/{owner}/{repo}/branches', {
        owner: owner,
        repo: repo,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })).data;
}

export async function collectIssues(repo: string, owner: string): Promise<any[]>{
    return (await (await getOctokit()).request('GET /repos/{owner}/{repo}/issues', {
        owner: owner,
        repo: repo,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })).data;
}