import { Octokit, App } from "octokit";
import env from "dotenv";
import { GitResources } from "../models/git/resource.models";
env.config();
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
console.log("octo", process.env.GITHUB_TOKEN);

export async function collectGithubData(): Promise<GitResources>{
    const allRepo = await collectRepo();
    let allBranches: any[] = [];
    let allIssues: any[] = [];
    for (const repo of allRepo) {
        (await collectIssues(repo.name, repo.owner.login)).forEach((issue) => {
            issue["repo"] = repo.name;
            issue["repoUrl"] = repo.html_url;
        });

        (await collectBranch(repo.name, repo.owner.login)).forEach((branch) => {
            branch["repo"] = repo.name;
            branch["repoUrl"] = repo.html_url;
            allBranches.push(branch);
        });
    }
    console.log("allIssues", allIssues);
    return {
        "repositories": allRepo,
        "branches": allBranches,
        "issues": allIssues
    };
}

export async function collectRepo(){
    return (await octokit.request('GET /user/repos')).data;
}

export async function collectBranch(repo: string, owner: string): Promise<any[]>{
    return (await octokit.request('GET /repos/{owner}/{repo}/branches', {
        owner: owner,
        repo: repo,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })).data;
}

export async function collectIssues(repo: string, owner: string): Promise<any[]>{
    return (await octokit.request('GET /repos/{owner}/{repo}/issues', {
        owner: owner,
        repo: repo,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })).data;
}