import { AlertEnum } from "../enum/alert.enum";
import { LevelEnum } from "../enum/level.enum";
import type { ResultScan, SubResultScan } from "../models/resultScan.models";
import type { Alert } from "../models/settingFile/alert.models";
import type { Rules } from "../models/settingFile/rules.models";
import { Emails } from "../emails/emails";
import type { GlobalConfigAlert } from "../models/settingFile/globalAlert.models";
import type { ConfigAlert } from "../models/settingFile/configAlert.models";
import { Readable } from "stream";
import { propertyToSend, renderTableAllScan, renderTableAllScanLoud } from "./display.service";
import { groupBy } from "../helpers/groupBy";
import { getConfigOrEnvVar } from "./manageVarEnvironnement.service";
import axios from 'axios';
import { extractURL } from "../helpers/extractURL";
import { Teams } from "../emails/teams";
import {getContext, getNewLogger} from "./logger.service";
import { getConfig } from "../helpers/loaderConfig";
import { jsonStringify, getColorStringHandler } from "../helpers/jsonStringify";
import {formatAlertCondition} from "./api/formatterApi.service";

const jsome = require('jsome');
jsome.level.show = true;
const request = require('request');
const nodemailer = require("nodemailer");
const levelAlert = ["info", "warning", "error", "fatal"];
const colors = ["#4f5660", "#ffcc00", "#cc3300", "#cc3300"];
let config: any;
async function init() {
    try {
        config = await getConfig();
    } catch (error) {
        logger.error("Failed to load config", error);
    }
}
init();

const logger = getNewLogger("functionLogger");
export function alertGlobal(allScan: ResultScan[][], alert: GlobalConfigAlert) {
    let isAlert = false;
    let compteError = [0,0,0,0];
    allScan.forEach((rule) => {
        rule.forEach((scan) => {
            if(scan.error.length > 0) compteError[scan.rule?.level??3]++;
            if(scan.rule?.loud) isAlert = true;
        });
    });
    logger.debug("compteError:");
    logger.debug(compteError);

    if (process.env.INTERFACE_CONFIGURATION_ENABLED == 'true') {
        alert.conditions = formatAlertCondition(alert.conditions);
    }


    alert.conditions.forEach((condition) => {
        if(isAlert) return;
        if(compteError?.[condition.level] >= condition.min){
            logger.debug("alert:"+levelAlert[condition.level]);
            isAlert = true;
        }
    });
    if(isAlert){
        alertFromGlobal(alert, compteError, allScan);
    }
}

export function alertFromGlobal(alert: GlobalConfigAlert, compteError: number[], allScan: ResultScan[][]) {
    allScan = allScan.map(scan => scan.filter(value => value.error.length>0 || value.loud))
    alert.type.forEach((type) => {
        switch(type){
            case AlertEnum.LOG:
                alertLogGlobal(alert, compteError, allScan);
                break;
            case AlertEnum.EMAIL:
                alertEmailGlobal(alert, compteError, allScan);
                break;
            case AlertEnum.SMS:
                alertSMSGlobal(alert, compteError);
                break;
            case AlertEnum.SLACK:
                throw new Error("not implemented");
                break;
            case AlertEnum.TEAMS:
                alertTeamsGlobal(alert, compteError, allScan);
                break;
            case AlertEnum.WEBHOOK:
                alertWebhookGlobal(alert, compteError, allScan);
                break;
            case AlertEnum.JIRA:
                sendJiraTicket(alert, "🌐 Global Alert:- Kexa - "+(alert.name??"Uname"), compteRender(allScan), null, allScan);
                break;
            default:
                alertLogGlobal(alert, compteError, allScan);
                break;
        }
    });
}

export function alertLogGlobal(alert: GlobalConfigAlert, compteError: number[], allScan: ResultScan[][]) {
    const context = getContext();
    const mainSeparator = "=".repeat(100);
    const ruleSeparator = "-".repeat(100);
    const resourceSeparator = "·".repeat(100);

    context?.log("\n" + mainSeparator);
    logger.info(mainSeparator);
    context?.log("Result global scan on ruleset: " + alert.name);
    logger.info("Result global scan on ruleset: " + alert.name);
    context?.log(mainSeparator);
    logger.info(mainSeparator);

    compteError.forEach((value, index) => {
        context?.log("  " + levelAlert[index] + ": " + value);
        logger.info("  " + levelAlert[index] + ": " + value);
    });

    context?.log(mainSeparator);
    logger.info(mainSeparator);
    context?.log("Details by rule:");
    logger.info("Details by rule:");
    context?.log(mainSeparator + "\n");
    logger.info(mainSeparator + "\n");

    let allScanOneDimension = [];
    for (let row of allScan) for (let e of row) allScanOneDimension.push(e);
    let subResult = groupBy(allScanOneDimension, (scan) => scan.rule?.name);

    const ruleEntries = Object.entries(subResult);
    ruleEntries.forEach(([key, value], ruleIndex) => {
        const ruleLevel = value[0].rule?.level ?? 0;
        const levelLabel = levelAlert[ruleLevel];

        context?.log(ruleSeparator);
        logger.info(ruleSeparator);
        context?.log("Rule " + (ruleIndex + 1) + " of " + ruleEntries.length + " : " + key);
        logger.info("Rule " + (ruleIndex + 1) + " of " + ruleEntries.length + " : " + key);
        context?.log("  Level: " + levelLabel);
        logger.info("  Level: " + levelLabel);
        context?.log("  Resource Type: " + (value[0].rule?.objectName));
        logger.info("  Resource Type: " + (value[0].rule?.objectName));
        context?.log("  Description: " + (value[0].rule?.description));
        logger.info("  Description: " + (value[0].rule?.description));
        const errorsResources = value.filter(v => v.error.length > 0);
        if (errorsResources.length > 0) {
            context?.log("  Non-compliant resources: " + errorsResources.length);
            logger.info("  Non-compliant resources: " + errorsResources.length);
        context?.log(ruleSeparator);
        logger.info(ruleSeparator);
            errorsResources.forEach((scan: ResultScan, index) => {
                console.log("\n");
                context?.log("== > Resource " + (index + 1) + "/" + errorsResources.length + ":");
                logger.info("==> Resource " + (index + 1) + "/" + errorsResources.length + ":");
                alertLog(scan.rule, scan.error, scan.objectContent, false);
            });
            context?.log("\n");
            logger.info("\n");
        }

        if(value[0].rule?.loud){
            const loudResources = value.filter(v => v.loud);
            if (loudResources.length > 0) {
                context?.log("  Compliant resources: " + loudResources.length);
                logger.info("  Compliant resources: " + loudResources.length);
                context?.log("  " + resourceSeparator);
                logger.info("  " + resourceSeparator);

                loudResources.forEach((scan: ResultScan, index) => {
                    context?.log("\n  Resource " + (index + 1) + "/" + loudResources.length + ":");
                    logger.info("\n  Resource " + (index + 1) + "/" + loudResources.length + ":");
                    alertLog(scan.rule, scan.error, scan.objectContent, false);
                });
                context?.log("\n");
                logger.info("\n");
            }
        }

        if (ruleIndex < ruleEntries.length - 1) {
            context?.log("");
            logger.info("");
        }
    });

    context?.log(mainSeparator);
    logger.info(mainSeparator);
    context?.log("End result global scan ");
    logger.info("End result global scan ");
    context?.log(mainSeparator + "\n");
    logger.info(mainSeparator + "\n");
}

export function alertEmailGlobal(alert: GlobalConfigAlert, compteError: number[], allScan: ResultScan[][]) {
    logger.debug("alert email");
    alert.to.forEach((email_to) => {
        if(!email_to.includes("@")) return;
        logger.debug("send email to:"+email_to);
        let render_table = renderTableAllScan(allScan.map(scan => scan.filter(value => value.error.length>0)));
        let render_table_loud = renderTableAllScanLoud(allScan.map(scan => scan.filter(value => value.loud)));
        let mail = Emails.GlobalAlert(email_to, compteError, render_table, render_table_loud, alert);
        SendMailWithAttachment(mail, email_to, "Kexa - Global Alert - "+(alert.name??"Uname"), compteRender(allScan));
    });
}

export function alertSMSGlobal(alert: GlobalConfigAlert, compteError: number[]) {
    logger.debug("alert sms");
    let content = ""
    compteError.forEach((value, index) => {
        content += "number of "+levelAlert[index]+" :"+value+"\n";
    });
    alert.to.forEach((sms_to) => {
        if(!sms_to.startsWith("+")) return;
        logger.debug("send sms to:"+sms_to);
        sendSMS(sms_to, "Kexa - Global Alert - "+ (alert.name??"Uname"), content);
    });
}

export function alertWebhookGlobal(alert: GlobalConfigAlert, compteError: number[], allScan: ResultScan[][]) {
    logger.debug("alert webhook");
    let content = compteRender(allScan);
    let nbrError: { [x: string]: number; }[] = [];
    compteError.forEach((value, index) => {
        nbrError.push({
            [levelAlert[index]] : value
        });
    });
    content["nbrError"] = nbrError;
    content["title"] = "Kexa - Global Alert - "+(alert.name??"Uname");
    alert.to.forEach((webhook_to) => {
        if(!webhook_to.includes("http")) return;
        logger.debug("send webhook to:"+webhook_to);
        request.post(webhook_to, { json: jsonStringify(content) }, (res:any) => {
            logger.debug(`webhook to: ${webhook_to} are send`)
        }).on('error', (error:any) => {
            logger.error(error)
        });
    });
}

export function alertTeamsGlobal(alert: GlobalConfigAlert, compteError: number[], allScan: ResultScan[][]) {
    logger.debug("alert Teams Global");
    let nbrError: { [x: string]: number; } = {};
    compteError.forEach((value, index) => {
        nbrError[levelAlert[index]] = value;
    });
    let content = ""
    let render_table = renderTableAllScan(allScan.map(scan => scan.filter(value => value.error.length>0)));
    let render_table_loud = renderTableAllScanLoud(allScan.map(scan => scan.filter(value => value.loud)));
    content += render_table;
    if(render_table_loud.length > 30){
        content += "\n\n\n<h3>Loud Section:</h3>\n"
        content += render_table_loud;
    }
    for (const teams_to of alert.to) {
        const regex = /^https:\/\/(?:[a-zA-Z0-9_-]+\.)?webhook\.office\.com\/[^\s"]+$/;
        if(!regex.test(teams_to)) return;
        logger.debug("send teams to:"+teams_to);
        const payload = Teams.GlobalTeams(colors[0], "Global Alert - "+(alert.name??"Uname"), content, nbrError);
        sendCardMessageToTeamsChannel(teams_to, payload);
    }
}

export function compteRender(allScan: ResultScan[][]): any {
    let result = {content : new Array<any>()};
    allScan.forEach((rule) => {
        if (rule.length == 0) return;
        return result.content.push(
            {
                rule: rule[0].rule,
                result: rule.map((scan) => {
                    return {
                        objectContent: scan.objectContent,
                        error: scan?.error,
                        loud: scan?.loud,
                        rule: scan?.rule,
                    };
                })
            }
        );
    });
    return result;
}

export function alertFromRule(rule:Rules, conditions:SubResultScan[], objectResource:any, alert: Alert, skipLog:boolean = false) {
    let detailAlert = alert[levelAlert[rule.level] as keyof typeof alert];
    if (!detailAlert.enabled) return
    if(rule.level > LevelEnum.FATAL) rule.level = LevelEnum.FATAL;
    detailAlert.type.forEach((type) => {
        switch(type){
            case AlertEnum.LOG:
                if (!skipLog) {
                    alertLog(rule, conditions, objectResource);
                }
                break;
            case AlertEnum.EMAIL:
                alertEmail(detailAlert, rule, conditions, objectResource);
                break;
            case AlertEnum.SMS:
                alertSMS(detailAlert, rule, objectResource);
                break;
            case AlertEnum.SLACK:
                throw new Error("not implemented");
            case AlertEnum.TEAMS:
                alertTeams(detailAlert, rule, objectResource);
                break;
            case AlertEnum.WEBHOOK:
                sendWebhook(detailAlert, "Kexa - " + levelAlert[rule.level] + " - " + rule.name, conditions)
                break;
            case AlertEnum.JIRA:
                sendJiraTicket(detailAlert, "Kexa - " + rule.name, conditions, rule, objectResource);
                break;
            default:
                logger.error("error:"+rule.name);
                logger.error("resource:");
                logger.error(conditions);
                break;
        }
    });
}

const sentenceConditionLog = (resource : string) => {
    return "condition not respect for " + resource + " :";
}

export function alertLog(rule: Rules, conditions: SubResultScan[], objectResource: any, fullDetail:boolean = true) {
    const context = getContext();
    switch(rule.level){
        case LevelEnum.INFO:
            if(fullDetail){
                context?.log("info name:"+rule.name);
                logger.info("info name:"+rule.name);
                context?.log("info description:"+rule?.description);
                logger.info("info description:"+rule?.description);
                context?.log(sentenceConditionLog(objectResource.id));
                logger.info(sentenceConditionLog(objectResource.id));
            }
            logger.debug(getColorStringHandler(conditions));
            context?.log(propertyToSend(rule, objectResource, true));
            logger.info(propertyToSend(rule, objectResource, true));
            break;
        case LevelEnum.WARNING:
            warnLog(rule, conditions, objectResource);
            break;
        case LevelEnum.ERROR:
            if(fullDetail){
                context?.log("error name:"+rule.name);
                logger.error("error name:"+rule.name);
                context?.log("error description:"+rule?.description);
                logger.error("error description:"+rule?.description);
                context?.log(sentenceConditionLog(objectResource.id));
                logger.error(sentenceConditionLog(objectResource.id));
            }
            logger.debug(getColorStringHandler(conditions));
            context?.log(propertyToSend(rule, objectResource, true));
            logger.error(propertyToSend(rule, objectResource, true));
            break;
        case LevelEnum.FATAL:
            if(fullDetail){
                context?.log("critical name:"+rule.name);
                logger.alert("critical name:"+rule.name);
                context?.log("critical description:"+rule?.description);
                logger.alert("critical description:"+rule?.description);
                context?.log(sentenceConditionLog(objectResource.id));
                logger.alert(sentenceConditionLog(objectResource.id));
            }
            logger.debug(getColorStringHandler(conditions));
            context?.log(propertyToSend(rule, objectResource, true));
            logger.alert(propertyToSend(rule, objectResource, true));
            break;
        default:
            warnLog(rule, conditions, objectResource);
            break;
    }
}

export function warnLog(rule: Rules, conditions:SubResultScan[], objectResource:any, fullDetail:boolean = true){
    const context = getContext();
    if(fullDetail){
        context?.log("warning:"+rule.name);
        logger.warn("warning:"+rule.name);
        context?.log(sentenceConditionLog(objectResource.id));
        logger.warn(sentenceConditionLog(objectResource.id));
    }
    logger.debug(getColorStringHandler(conditions));
    context?.log(propertyToSend(rule, objectResource, true));
    logger.warn(propertyToSend(rule, objectResource, true));
}

export function alertTeams(detailAlert: ConfigAlert|GlobalConfigAlert ,rule: Rules, objectResource:any) {
    logger.debug("alert Teams");
    for (const teams_to of detailAlert.to) {
        const regex = /^https:\/\/(?:[a-zA-Z0-9_-]+\.)?webhook\.office\.com\/[^\s"]+$/;
        if(!regex.test(teams_to)) return;
        let content = propertyToSend(rule, objectResource);
        const payload = Teams.OneTeams(colors[rule.level], "Kexa - "+levelAlert[rule.level]+" - "+rule.name, extractURL(content)??"", rule.description??"", content);
        sendCardMessageToTeamsChannel(teams_to, payload);
    }
}

export function alertEmail(detailAlert: ConfigAlert|GlobalConfigAlert ,rule: Rules, conditions:SubResultScan[], objectResource:any){
    logger.debug("alert email");
    detailAlert.to.forEach((email_to) => {
        if (!email_to.includes("@")) return;
        logger.debug("send email to:"+email_to);
        let mail = Emails.OneAlert(email_to, rule, propertyToSend(rule, objectResource, false), colors[rule.level]);
        SendMailWithAttachment(mail, email_to, "Kexa - "+levelAlert[rule.level]+" - "+rule.name, objectResource);
    });
}

export function alertSMS(detailAlert: ConfigAlert|GlobalConfigAlert ,rule: Rules, objectResource:any){
    logger.debug("alert sms");
    detailAlert.to.forEach((sms_to) => {
        if (!sms_to.startsWith("+")) return;
        logger.debug("send sms to:"+sms_to);
        let content = "error with : " + propertyToSend(rule, objectResource, true);
        sendSMS(sms_to, "Kexa - "+ levelAlert[rule.level]+ " - "+ rule.name, content);
    });
}

async function getTransporter() {
    return nodemailer.createTransport({
        host: await getConfigOrEnvVar(config, "EMAILHOST"),
        port: await getConfigOrEnvVar(config, "EMAILPORT"),
        secure: Number(await getConfigOrEnvVar(config, "EMAILPORT")) == 465, // true for 465, false for other ports
        auth: {
            user: await getConfigOrEnvVar(config, "EMAILUSER"),
            pass: await getConfigOrEnvVar(config, "EMAILPWD"),
        },
    });
}

async function SendMail(mail: string, to: string, subject: string): Promise<boolean> {
    try{
        let transporter = await getTransporter();
        await transporter.sendMail({
            from: await getConfigOrEnvVar(config, "EMAILFROM"), // sender address
            to,
            subject,
            html: mail,
        });
        return true;
    }catch (e) {
        logger.error("error:");
        logger.error(e);
        return false;
    }
}

async function SendMailWithAttachment(mail: string, to: string, subject: string, content: any): Promise<boolean> {
    let context = getContext();
    try{
        const jsonContent = jsonStringify(content);

        const jsonStream = new Readable();
        jsonStream.push(jsonContent);
        jsonStream.push(null);
        let transporter = await getTransporter();
        await transporter.sendMail({
            from: await getConfigOrEnvVar(config, "EMAILFROM"),
            to,
            subject,
            html: mail,
            attachments: [
                {
                    filename: subject +'.json',
                    content: jsonStream
                }
            ]
        });
        context?.log(`Email sent: ${subject} to ${to} with attachment`);
        logger.info(`Email sent: ${subject} to ${to} with attachment`);
        return true;
    }catch (e) {
        return false;
    }
}

async function sendSMS(to: string, subject: string, content: any) {
    const accountSid = await getConfigOrEnvVar(config, "SMSACCOUNTSID");
    const authToken = await getConfigOrEnvVar(config, "SMSAUTHTOKEN");
    const client = require('twilio')(accountSid, authToken);

    client.messages
        .create({
            body: `${subject}
${content}`,
            from: await getConfigOrEnvVar(config, "SMSFROM"),
            to
        })
        .then((message:any) => {
            logger.debug("send sms");
        })
}

async function sendWebhook(alert: ConfigAlert, subject: string, content: any) {
    const context = getContext();
    content["title"] = subject;
    logger.debug("send webhook");
    for (const webhook_to of alert.to) {
        if(!webhook_to.includes("http")) continue;
        const payload = {
            title: "Kexa scan : " + subject,
            text: content.content,
        };
        try {
            const response = await axios.post(webhook_to, payload);
            if (response.status === 200) {
                context?.log('Webhook sent successfully!');
                logger.info('Webhook sent successfully!');
            } else {
                logger.error('Failed to send Webhook.');
            }
        } catch (error) {
            logger.error('Webhook : An error occurred:', error);
        }
    }
}


import { Jira } from "../emails/jira";
import { searchExistingIssue, createJiraIssue, updateIssueDate } from "./alerting/jiraAlerting.service";

export async function sendJiraTicket(alert: ConfigAlert, subject: string, receivedContent: any, rule: Rules | null, objectResource: any | null): Promise<void> {
    const context = getContext();
    const jiraUrl = 'https://' + await getConfigOrEnvVar(config, 'JIRA_DOMAIN') + '/rest/api/3/issue/';
    const auth = Buffer.from(await getConfigOrEnvVar(config, 'JIRA_API_KEY')).toString('base64');

    let projectKey = process.env.JIRA_PROJECT_KEY ?? undefined;
    let content;
    let isGlobal = false;
    let issueType;
    let assigneeId;

    if (receivedContent.content == undefined) {
        content = { content: receivedContent };
    } else {
        content = receivedContent;
        isGlobal = true;
    }

    for (let i = 0; i < alert.to.length; i++) {
        if (alert.to[i].startsWith("jira_issue_type="))
            issueType = alert.to[i].split("=")[1];
    }
    for (let i = 0; i < alert.to.length; i++) {
        if (alert.to[i].startsWith("jira_assignee_id="))
            assigneeId = alert.to[i].split("=")[1];
    }
    if (issueType == undefined)
        issueType = "10005";

    let alertLevelEmoji = "";
    if (rule != null)
        alertLevelEmoji = (rule.level == 0) ? "ⓘ info: " : (rule.level == 1) ? "⚠️ warning: " : (rule.level == 2) ? "❗error: " : "❌ fatal: ";

    const jiraContent = {
        projectKey: projectKey,
        summary: subject,
        issueType: issueType,
        alertLevelEmoji: alertLevelEmoji,
        content: content,
        objectResource: objectResource,
        assigneeId: assigneeId,
        isGlobal: isGlobal,
        rule: rule
    };

    let finalContent;
    if (isGlobal) {
        finalContent = Jira.GlobalJira(jiraContent);
    } else {
        finalContent = Jira.OneJira(jiraContent);
    }

    const isIssueAlreadyExisting = await searchExistingIssue(auth, subject, JSON.stringify(content), JSON.parse(finalContent), issueType);
    if (isIssueAlreadyExisting) {
        context?.log('Jira issue not sent because it already exists and is neither done nor ignored!');
        logger.info('Jira issue not sent because it already exists and is neither done nor ignored!');
        return;
    }

    await createJiraIssue(jiraUrl, finalContent, auth);
}


export async function sendCardMessageToTeamsChannel(channelWebhook: string, payload:string): Promise<void> {
    const context = getContext();
    if (!channelWebhook) {
        logger.error("Cannot retrieve TEAMS_CHANNEL_WEBHOOK_URL from env");
        throw("Error on TEAMS_CHANNEL_WEBHOOK_URL retrieve");
    }
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: channelWebhook,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : payload
    };
    try {
        const response = await axios.request(config);
        if (response.status === 200) {
            context?.log('Card sent successfully!');
            logger.info('Card sent successfully!');
        } else {
            context?.log('Failed to send card.');
            logger.info('Failed to send card.');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}