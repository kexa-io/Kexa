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
    *     - runners
    *     - packages
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
let currentConfig:GitConfig

export async function collectData(gitConfig:GitConfig[]): Promise<GitResources[]|null>{
    let context = getContext();
    let resources = new Array<GitResources>();
    for(let config of gitConfig??[]){
        currentConfig = config;
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
                "teamProjects": secondaryDataOrganization.allTeamProjects,
                "runners": secondaryDataOrganization.allRunners,
                "packages": secondaryDataRepo.allPackages,
                "pullRequestPackageChanges": secondaryDataRepo.allPullRequestPackageChanges
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
    let allPackages: any[] = [];
    let allPullRequestPackageChanges: any[] = [];
    logger.info("Collecting github branches");
    logger.info("Collecting github issues");
    logger.info("Collecting github packages");
    logger.info("Collecting github pull request package changes");
    await Promise.all(allRepo.map(async (repo: any) => {
        const [issues, branches, packages, prPackageChanges] = await Promise.all([
            collectIssues(repo.name, repo.owner.login),
            collectBranch(repo.name, repo.owner.login),
            collectPackages(repo.name, repo.owner.login),
            collectPullRequestPackageChanges(repo.name, repo.owner.login)
        ]);

        allIssues.push(...addInfoRepo(repo, issues));
        allBranches.push(...addInfoRepo(repo, branches));
        allPackages.push(...addInfoRepo(repo, packages));
        allPullRequestPackageChanges.push(...addInfoRepo(repo, prPackageChanges));
    }));
    return {
        allIssues,
        allBranches,
        allPackages,
        allPullRequestPackageChanges
    }
}

async function collectOrganizationRelaidInfo(allOrganizations: any): Promise<any>{
    let allMembers: any[] = [];
    let allOutsideCollaborators: any[] = [];
    let allTeams: any[] = [];
    let allTeamMembers: any[] = [];
    let allTeamRepos: any[] = [];
    let allTeamProjects: any[] = [];
    let allRunners: any[] = [];
    logger.info("Collecting github members");
    logger.info("Collecting github outside collaborators");
    await Promise.all(allOrganizations.map(async (org: any) => {
        const [members, outsideCollaborators, teamsData, runners] = await Promise.all([
            collectMembers(org.login),
            collectOutsideCollaborators(org.login),
            collectTeamsRelaidInfo(org.login),
            collectRunnersInfo(org.login)
        ]);
        allMembers.push(...addInfoOrg(org, members));
        allOutsideCollaborators.push(...addInfoOrg(org, outsideCollaborators));
        allTeams.push(...addInfoOrg(org, teamsData.allTeams));
        allTeamMembers.push(...teamsData.allTeamMembers);
        allTeamRepos.push(...teamsData.allTeamRepos);
        allTeamProjects.push(...teamsData.allTeamProjects);
        allRunners.push(...runners);
    }));

    return {
        allMembers,
        allOutsideCollaborators,
        allTeams,
        allTeamMembers,
        allTeamRepos,
        allTeamProjects,
        allRunners
    }
}

async function collectRunnersInfo(org: string): Promise<any>{
    let allRunners = [];
    logger.info("Collecting github runners");
    try{
        let octokit = await getOctokit();
        let runners = (await (octokit).request('GET /orgs/{org}/actions/runners', {
            org: org,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })).data;
        allRunners.push(...runners.runners);
        allRunners.forEach((runner: any) => {
            runner["organization"] = org;
            runner["organizationUrl"] = "https://github.com/" + org;
        });
    }catch(e){
        logger.debug(e);
    }
    return {
        allRunners
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
    if(
        !currentConfig?.ObjectNameNeed?.includes("repositories")
        && !currentConfig?.ObjectNameNeed?.includes("branches")
        && !currentConfig?.ObjectNameNeed?.includes("issues")
        && !currentConfig?.ObjectNameNeed?.includes("packages")
        && !currentConfig?.ObjectNameNeed?.includes("pullRequestPackageChanges")
    ) return [];
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
    if(!currentConfig?.ObjectNameNeed?.includes("branches")) return [];
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
    if(!currentConfig?.ObjectNameNeed?.includes("issues")) return [];
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
    if(
        !currentConfig?.ObjectNameNeed?.includes("organizations")
        && !currentConfig?.ObjectNameNeed?.includes("members")
        && !currentConfig?.ObjectNameNeed?.includes("teams")
        && !currentConfig?.ObjectNameNeed?.includes("teamMembers")
        && !currentConfig?.ObjectNameNeed?.includes("teamRepositories")
        && !currentConfig?.ObjectNameNeed?.includes("teamProjects")
        && !currentConfig?.ObjectNameNeed?.includes("outsideCollaborators")
    ) return [];
    try{
        return (await (await getOctokit()).request('GET /user/orgs')).data;
    }catch(e){
        logger.debug(e);
        return [];
    }
}

export async function collectMembers(org: string): Promise<any>{
    if(!currentConfig?.ObjectNameNeed?.includes("members")) return [];
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
    if(!currentConfig?.ObjectNameNeed?.includes("outsideCollaborators")) return [];
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
    if(!currentConfig?.ObjectNameNeed?.includes("teams")) return [];
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
    if(!currentConfig?.ObjectNameNeed?.includes("teamMembers")) return [];
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
    if(!currentConfig?.ObjectNameNeed?.includes("teamRepositories")) return [];
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
    if(!currentConfig?.ObjectNameNeed?.includes("teamProjects")) return [];
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

export async function collectPackages(repo: string, owner: string): Promise<any[]>{
    if(!currentConfig?.ObjectNameNeed?.includes("packages")) return [];
    let octokit = await getOctokit();
    
    try{
        const res = await octokit.rest.repos.getContent({
            owner,
            repo,
            path: "package.json",
        });


        if (!("content" in res.data)) {
            return [];
        }
        const content = Buffer.from(res.data.content, "base64").toString("utf8");
        const pkg = JSON.parse(content);
        const parseDependencies = (deps: any) => {
            if (!deps || typeof deps !== 'object') return [];
            return Object.entries(deps).map(([name, version]) => ({
                name: name,
                version: version as string
            }));
        };
        const packageInfo = {
            id: `https://github.com/${owner}/${repo}`,
            name: pkg.name || repo,
            version: pkg.version || "unknown",
            description: pkg.description || null,
            dependencies: parseDependencies(pkg.dependencies),
            devDependencies: parseDependencies(pkg.devDependencies),
            scripts: pkg.scripts || {},
            author: pkg.author || null,
            license: pkg.license || null,
            repository: pkg.repository || null,
            keywords: pkg.keywords || [],
            main: pkg.main || null,
            engines: pkg.engines || {},
            packageJsonExists: true
        };   
        // display dependencies
        for (const dep of packageInfo.dependencies) {
            logger.info(`Dependency found in ${owner}/${repo}: ${dep.name} & version:${dep.version}`);
        }     
        return [packageInfo];
    }catch(e){
        logger.debug(`No package.json found for ${owner}/${repo}, trying bun.lock: ${e}`);
        
        try {
            const bunLockRes = await octokit.rest.repos.getContent({
                owner,
                repo,
                path: "bun.lock",
            });

            if (!("content" in bunLockRes.data)) {
                throw new Error("No content in bun.lock");
            }

            const bunLockContent = Buffer.from(bunLockRes.data.content, "base64").toString("utf8");
            const bunLock = JSON.parse(bunLockContent);
            
            const parseBunDependencies = (workspace: any) => {
                if (!workspace || !workspace.dependencies || typeof workspace.dependencies !== 'object') return [];
                return Object.entries(workspace.dependencies).map(([name, version]) => ({
                    name: name,
                    version: version as string
                }));
            };

            const mainWorkspace = bunLock.workspaces?.[""] || {};
            const packageInfo = {
                id: `https://github.com/${owner}/${repo}`,
                name: repo,
                version: "unknown",
                description: null,
                dependencies: parseBunDependencies(mainWorkspace),
                devDependencies: [],
                scripts: {},
                author: null,
                license: null,
                repository: null,
                keywords: [],
                main: null,
                engines: {},
                packageJsonExists: false,
                bunLockExists: true,
                lockfileVersion: bunLock.lockfileVersion || "unknown"
            };
            
            logger.debug(`Found bun.lock for ${owner}/${repo} with ${packageInfo.dependencies.length} dependencies`);
            return [packageInfo];
            
        } catch(bunError) {
            logger.debug(`No bun.lock found for ${owner}/${repo} or error reading it: ${bunError}`);
            return [{
                id: `https://github.com/${owner}/${repo}`,
                name: repo,
                version: "unknown",
                description: null,
                dependencies: [],
                devDependencies: [],
                scripts: {},
                author: null,
                license: null,
                repository: null,
                keywords: [],
                main: null,
                engines: {},
                packageJsonExists: false,
                bunLockExists: false,
                error: "No package.json or bun.lock found or unable to read"
            }];
        }
    }
}

export async function collectPullRequestPackageChanges(repo: string, owner: string): Promise<any[]>{
    if(!currentConfig?.ObjectNameNeed?.includes("pullRequestPackageChanges")) return [];
    let octokit = await getOctokit();
    let prChanges: any[] = [];

    try{
        const pulls = await octokit.rest.pulls.list({
            owner,
            repo,
            state: 'open',
            per_page: 100
        });

        for (const pr of pulls.data) {
            try {
                const files = await octokit.rest.pulls.listFiles({
                    owner,
                    repo,
                    pull_number: pr.number
                });

                const packageJsonFile = files.data.find(f => f.filename === "package.json");

                if (packageJsonFile) {
                    const filesChanged = files.data.map(f => f.filename);
                    const prData = analyzePullRequestForMalwareInjection(
                        pr,
                        packageJsonFile,
                        filesChanged,
                        owner,
                        repo
                    );

                    if (prData) {
                        prChanges.push(prData);
                    }
                }
            } catch (prError) {
                logger.debug(`Error analyzing PR #${pr.number} for ${owner}/${repo}: ${prError}`);
            }
        }

        return prChanges;
    }catch(e){
        logger.debug(`Error collecting PR package changes for ${owner}/${repo}: ${e}`);
        return [];
    }
}

function analyzePullRequestForMalwareInjection(
    pr: any,
    packageJsonFile: any,
    filesChanged: string[],
    owner: string,
    repo: string
): any {
    const patch = packageJsonFile.patch || "";

    const detectionReasons: string[] = [];
    let isInfected = false;

    const hasPreinstallScript = /[+].*"preinstall":\s*"/.test(patch);
    const hasPostinstallScript = /[+].*"postinstall":\s*"/.test(patch);

    const preinstallMatchesSetupBun = /[+].*"preinstall":\s*"node\s+setup_bun\.js"/.test(patch) ||
                                       /[+].*"preinstall":\s*"node\s+[^"]*setup[^"]*\.js"/.test(patch);

    const preinstallMatchesBunEnv = /[+].*"preinstall":\s*"[^"]*bun[^"]*environment[^"]*\.js"/.test(patch);

    const suspiciousFilesAdded = filesChanged.filter(f =>
        f.includes("setup_bun.js") ||
        f.includes("bun_environment.js") ||
        (f.includes("setup") && f.endsWith(".js") && f.includes("bun")) ||
        (f.includes("environment") && f.endsWith(".js") && f.includes("bun"))
    );

    if (preinstallMatchesSetupBun) {
        detectionReasons.push("preinstall_script_setup_bun");
        isInfected = true;
    }

    if (preinstallMatchesBunEnv) {
        detectionReasons.push("preinstall_script_bun_environment");
        isInfected = true;
    }

    if (suspiciousFilesAdded.length > 0) {
        detectionReasons.push("suspicious_bun_files_added");
        isInfected = true;
    }

    if ((hasPreinstallScript || hasPostinstallScript) && suspiciousFilesAdded.length > 0) {
        detectionReasons.push("install_script_with_suspicious_files");
        isInfected = true;
    }

    const scriptsAdded = extractScriptsAdded(patch);

    return {
        prNumber: pr.number,
        prUrl: pr.html_url,
        prTitle: pr.title,
        prState: pr.state,
        author: pr.user?.login || "unknown",
        createdAt: pr.created_at,
        updatedAt: pr.updated_at,
        baseBranch: pr.base?.ref || "unknown",
        headBranch: pr.head?.ref || "unknown",
        packageJsonModified: true,
        packageJsonDiff: patch,
        filesChanged: filesChanged,

        sha1huludIndicators: {
            isInfected: isInfected,
            detectionReasons: detectionReasons
        },

        maliciousPatterns: {
            hasPreinstallScript: hasPreinstallScript,
            hasPostinstallScript: hasPostinstallScript,
            preinstallMatchesSetupBun: preinstallMatchesSetupBun,
            preinstallMatchesBunEnv: preinstallMatchesBunEnv,
            suspiciousFilesAdded: suspiciousFilesAdded
        },

        scriptChanges: {
            added: scriptsAdded
        }
    };
}

function extractScriptsAdded(patch: string): any {
    const scriptsAdded: any = {};
    const lines = patch.split('\n');
    let inScriptsSection = false;

    for (const line of lines) {
        if (line.includes('"scripts"')) {
            inScriptsSection = true;
        }
        if (inScriptsSection && (line.trim() === '}' || line.trim() === '},')) {
            inScriptsSection = false;
        }

        if (inScriptsSection && line.trim().startsWith('+')) {
            const match = /[+]\s*"([^"]+)":\s*"([^"]+)"/.exec(line);
            if (match && match[1] !== 'scripts') {
                scriptsAdded[match[1]] = match[2];
            }
        }
    }

    return scriptsAdded;
}

