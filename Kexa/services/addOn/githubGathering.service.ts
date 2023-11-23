/*
    * Provider : github
    * Thumbnail : https://1000logos.net/wp-content/uploads/2021/05/GitHub-logo-768x432.png
    * Documentation : https://docs.github.com/en/rest?apiVersion=2022-11-28
    * Creation date : 2023-08-14
    * Note : 
    * Resources :
    *     - repositories
    *     - branches
    *     - issues
    *     - organizations
    *     - members
    *     - teams
    *     - teamProjects
    *     - teamMembers
    *     - teamRepositories
    *     - outsideCollaborators
*/

import { Octokit } from "octokit";
import env from "dotenv";
import { GitResources } from "../../models/git/resource.models";
import { getConfigOrEnvVar, setEnvVar } from "../manageVarEnvironnement.service";
import { GitConfig } from "../../models/git/config.models";
env.config();

import {getContext, getNewLogger} from "../logger.service";
const logger = getNewLogger("GithubLogger");
let githubToken = "";

export async function collectData(gitConfig:GitConfig[]): Promise<GitResources[]|null>{
    let context = getContext();
    let resources = new Array<GitResources>();
    for(let config of gitConfig??[]){
        let prefix = config.prefix??(gitConfig.indexOf(config).toString());
        githubToken = await getConfigOrEnvVar(config, "GITHUBTOKEN", prefix);
        if(!githubToken){
            throw new Error("- Please pass GITHUBTOKEN in your config file");
        }
        await setEnvVar("GITHUBTOKEN", githubToken)
        try {
            context?.log("Gathering github data");
            logger.info("Gathering github data");
            const promisesPrimaryData:any[] = [collectRepo(), collectOrganizations()]
            let [allRepo, allOrganizations] = await Promise.all(promisesPrimaryData);

            const promisesSecondaryData:any[] = [
                collectRepoRelaidInfo(allRepo),
                collectOrganizationRelaidInfo(allOrganizations),
            ]
            let [secondaryDataRepo, secondaryDataOrganization] = await Promise.all(promisesSecondaryData);
            
            resources.push({
                "repositories": allRepo,
                "branches": secondaryDataRepo.allBranches,
                "issues": secondaryDataRepo.allIssues,
                "organizations": allOrganizations,
                "members": secondaryDataOrganization.allMembers,
                "outsideCollaborators": secondaryDataOrganization.allOutsideCollaborators,
                "teams": secondaryDataOrganization.allTeams,
                "teamMembers": secondaryDataOrganization.allTeamMembers,
                "teamRepositories": secondaryDataOrganization.allTeamRepos,
                "teamProjects": secondaryDataOrganization.allTeamProjects
            });
        }catch(e){
            logger.error(e);
        }
    }
    return resources??null;
}

async function collectRepoRelaidInfo(allRepo: any): Promise<any>{
    let allBranches: any[] = [];
    let allIssues: any[] = [];
    logger.info("Collecting github branches");
    logger.info("Collecting github issues");
    await Promise.all(allRepo.map(async (repo: any) => {
        const [issues, branches] = await Promise.all([
            collectIssues(repo.name, repo.owner.login),
            collectBranch(repo.name, repo.owner.login)
        ]);
    
        allIssues.push(...addInfoRepo(repo, issues));
        allBranches.push(...addInfoRepo(repo, branches));
    }));
    return {
        allIssues,
        allBranches
    }
}

async function collectOrganizationRelaidInfo(allOrganizations: any): Promise<any>{
    let allMembers: any[] = [];
    let allOutsideCollaborators: any[] = [];
    let allTeams: any[] = [];
    let allTeamMembers: any[] = [];
    let allTeamRepos: any[] = [];
    let allTeamProjects: any[] = [];
    logger.info("Collecting github members");
    logger.info("Collecting github outside collaborators");
    await Promise.all(allOrganizations.map(async (org: any) => {
        const [members, outsideCollaborators, teamsData] = await Promise.all([
            collectMembers(org.login),
            collectOutsideCollaborators(org.login),
            collectTeamsRelaidInfo(org.login)
        ]);
        allMembers.push(...addInfoOrg(org, members));
        allOutsideCollaborators.push(...addInfoOrg(org, outsideCollaborators));
        allTeams.push(...addInfoOrg(org, teamsData.allTeams));
        allTeamMembers.push(...teamsData.allTeamMembers);
        allTeamRepos.push(...teamsData.allTeamRepos);
        allTeamProjects.push(...teamsData.allTeamProjects);
    }));

    return {
        allMembers,
        allOutsideCollaborators,
        allTeams,
        allTeamMembers,
        allTeamRepos,
        allTeamProjects
    }
}

async function collectTeamsRelaidInfo(org: string): Promise<any>{
    let allTeams: any[] = [];
    let allTeamMembers: any[] = [];
    let allTeamRepos: any[] = [];
    let allTeamProjects: any[] = [];
    logger.info("Collecting github teams");
    logger.info("Collecting github team members");
    logger.info("Collecting github team repos");
    logger.info("Collecting github team projects");
    const teams = await collectTeams(org);
    await Promise.all(teams.map(async (team: any) => {
        const [members, repos, projects] = await Promise.all([
            collectTeamMembers(org, team.slug),
            collectTeamRepos(org, team.slug),
            collectTeamProjects(org, team.slug)
        ]);
        allTeamMembers.push(...addInfoOrg(org, addInfoTeam(team, members)));
        allTeamRepos.push(...addInfoOrg(org, addInfoTeam(team, repos)));
        allTeamProjects.push(...addInfoOrg(org, addInfoTeam(team, projects)));
    }));
    allTeams.push(...teams);
    return {
        allTeams,
        allTeamMembers,
        allTeamRepos,
        allTeamProjects
    }
}

function addInfoTeam(team: any, datas:any): any[]{
    try{
        datas.forEach((data:any) => {
            data["team"] = team.name;
            data["teamUrl"] = team.url;
        });
    }catch(e){
        logger.debug(e);
    }
    return datas;
}

function addInfoOrg(org: any, datas:any): any[]{
    try{
        datas.forEach((data:any) => {
            data["organization"] = org.login;
            data["organizationUrl"] = org.url;
        });
    }catch(e){
        logger.debug(e);
    }
    return datas;
}

function addInfoRepo(repo: any, datas:any): any[]{
    try{
        datas.forEach((data:any) => {
            data["repo"] = repo.name;
            data["repoUrl"] = repo.html_url;
        });
    }catch(e){
        logger.debug(e);
    }
    return datas;
}

async function getOctokit(): Promise<Octokit>{
    return new Octokit({ auth: githubToken });
}

export async function collectRepo(){
    let page = 1;
    try{
        let octokit = await getOctokit();
        let repos = [];

        while(true){
            let repo = (await (octokit).request('GET /user/repos?page=' + page)).data;
            if(repo.length == 0){
                break;
            }
            page++;
            repos.push(...repo);
        }
        
        return repos;
    }catch(e){
        logger.debug(e);
        return [];
    }
}

export async function collectBranch(repo: string, owner: string): Promise<any[]>{
    let page = 1;
    try{
        let octokit = await getOctokit();
        let members = [];

        while(true){
            let member = (await (octokit).request('GET /repos/{owner}/{repo}/branches?page=' + page, {
                owner: owner,
                repo: repo,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })).data;
            if(member.length == 0){
                break;
            }
            page++;
            members.push(...member);
        }
        
        return members;
    }catch(e){
        logger.debug(e);
        return [];
    }
}

export async function collectIssues(repo: string, owner: string): Promise<any[]>{
    let page = 1;
    try{
        let octokit = await getOctokit();
        let issues = [];

        while(true){
            let issue = (await (octokit).request('GET /repos/{owner}/{repo}/issues?page=' + page, {
                owner: owner,
                repo: repo,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })).data;
            if(issue.length == 0){
                break;
            }
            page++;
            issues.push(...issue);
        }
        
        return issues;
    }catch(e){
        logger.debug(e);
        return [];
    }
}

export async function collectOrganizations(): Promise<any>{
    try{
        return (await (await getOctokit()).request('GET /user/orgs')).data;
    }catch(e){
        logger.debug(e);
        return [];
    }
}

export async function collectMembers(org: string): Promise<any>{
    let page = 1;
    try{
        let octokit = await getOctokit();
        let members = [];

        while(true){
            let member = (await (octokit).request('GET /orgs/{org}/members?page=' + page, {
                org: org,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })).data;
            if(member.length == 0){
                break;
            }
            let memberWithoutMFA = (await (octokit).request('GET /orgs/{org}/members?filter=2fa_disabled&page=' + page + '&filter=2fa_disabled', {
                org: org,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })).data;
            member.forEach((_member: any) => {
                _member["mfa"] = ((memberWithoutMFA.filter((memberWithoutMFA: any) => memberWithoutMFA.login == _member.login).length == 0) ? true : false);
            });
            page++;
            members.push(...member);
        }
        
        return members;
    }catch(e){
        logger.debug(e);
        return [];
    }
}

export async function collectOutsideCollaborators(org: string): Promise<any>{
    let page = 1;
    try{
        let octokit = await getOctokit();
        let collaborators = [];

        while(true){
            let collaborator = (await (octokit).request('GET /orgs/{org}/outside_collaborators?page=' + page, {
                org: org,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })).data;
            if(collaborator.length == 0){
                break;
            }
            page++;
            collaborators.push(...collaborator);
        }
        
        return collaborators;
    }catch(e){
        logger.debug(e);
        return [];
    }
}

export async function collectTeams(org: string): Promise<any>{
    let page = 1;
    try{
        let octokit = await getOctokit();
        let teams = [];

        while(true){
            let team = (await (octokit).request('GET /orgs/{org}/teams?page=' + page, {
                org: org,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })).data;
            if(team.length == 0){
                break;
            }
            page++;
            teams.push(...team);
        }
        
        return teams;
    }catch(e){
        logger.debug(e);
        return [];
    }
}

export async function collectTeamMembers(org:string, team: string): Promise<any>{
    let page = 1;
    try{
        let octokit = await getOctokit();
        let membersTeam = [];

        while(true){
            let memberTeam = (await (octokit).request('GET /orgs/{org}/teams/{team_slug}/members?page=' + page, {
                team_slug: team,
                org: org,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })).data;
            if(memberTeam.length == 0){
                break;
            }
            page++;
            membersTeam.push(...memberTeam);
        }
        
        return membersTeam;
    }catch(e){
        logger.debug(e);
        return [];
    }
}

export async function collectTeamRepos(org:string, team: string): Promise<any>{
    let page = 1;
    try{
        let octokit = await getOctokit();
        let reposTeam = [];

        while(true){
            let repoTeam = (await (octokit).request('GET /orgs/{org}/teams/{team_slug}/repos?page=' + page, {
                team_slug: team,
                org: org,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })).data;
            if(repoTeam.length == 0){
                break;
            }
            page++;
            reposTeam.push(...repoTeam);
        }
        
        return reposTeam;
    }catch(e){
        logger.debug(e);
        return [];
    }
}

export async function collectTeamProjects(org:string, team: string): Promise<any>{
    let page = 1;
    try{
        let octokit = await getOctokit();
        let projectsTeam = [];

        while(true){
            let projectTeam = (await (octokit).request('GET /orgs/{org}/teams/{team_slug}/projects?page=' + page, {
                team_slug: team,
                org: org,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })).data;
            if(projectTeam.length == 0){
                break;
            }
            page++;
            projectsTeam.push(...projectTeam);
        }
        
        return projectsTeam;
    }catch(e){
        logger.debug(e);
        return [];
    }
}

