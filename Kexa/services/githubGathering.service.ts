import { Octokit, App } from "octokit";
import env from "dotenv";
import { GitResources } from "../models/git/resource.models";
import { getEnvVar } from "./manageVarEnvironnement.service";
import { Logger } from "tslog";
env.config();
let logger = new Logger({ minLevel: Number(process.env.DEBUG_MODE)??4, type: "pretty", name: "globalLogger" });

//TODO: add logger
export async function collectGithubData(): Promise<GitResources|null>{
    try {
        logger.info("Gathering github data");
        const allRepo = await collectRepo();
        let allBranches: any[] = [];
        let allIssues: any[] = [];
        await Promise.all(allRepo.map(async (repo) => {
            const [issues, branches] = await Promise.all([
                collectIssues(repo.name, repo.owner.login),
                collectBranch(repo.name, repo.owner.login)
            ]);
        
            allIssues.push(...addInfoRepo(repo, issues));
            allBranches.push(...addInfoRepo(repo, branches));
        }));
        return {
            "repositories": allRepo,
            "branches": allBranches,
            "issues": allIssues
        };
    }catch(e){
        logger.fatal(e);
        return null;
    }
}

function addInfoRepo(repo: any, datas:any): any[]{
    console.log(datas);
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
    logger.info("Collecting github branches");
    return (await (await getOctokit()).request('GET /repos/{owner}/{repo}/branches', {
        owner: owner,
        repo: repo,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })).data;
}

export async function collectIssues(repo: string, owner: string): Promise<any[]>{
    logger.info("Collecting github issues");
    return (await (await getOctokit()).request('GET /repos/{owner}/{repo}/issues', {
        owner: owner,
        repo: repo,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })).data;
}