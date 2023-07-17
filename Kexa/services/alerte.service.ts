import { AlertEnum } from "../enum/alert.enum";
import { LevelEnum } from "../enum/level.enum";
import { ResultScan, SubResultScan } from "../models/resultScan.models";
import { Alert } from "../models/settingFile/alert.models";
import { Rules } from "../models/settingFile/rules.models";
import { Logger } from "tslog";
import { Emails } from "./emails/emails";
import { GlobalConfigAlert } from "../models/settingFile/globalAlert.models";
import { ConfigAlert } from "../models/settingFile/configAlert.models";
import { Readable } from "stream";
import { App } from "@slack/bolt";
import { propertyToSend, renderTableAllScan } from "./display.service";
import { groupBy } from "../helpers/groupBy";

let debug_mode = 2;
const jsome = require('jsome');
jsome.level.show = true;
const request = require('request');
const nodemailer = require("nodemailer");
const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "functionLogger" });
const levelAlert = ["info", "warning", "error", "critical"];
const colors = ["#4f5660", "#ffcc00", "#cc3300", "#cc3300"];

export function alertGlobal(allScan: ResultScan[][], alert: GlobalConfigAlert) {
    //sendSlack("test", "test")
    let compteError = [0,0,0,0];
    allScan.forEach((rule) => {
        rule.forEach((scan) => {
            if(scan.error.length > 0) compteError[scan.rule?.level??4]++;
        });
    });
    logger.debug("compteError:");
    logger.debug(compteError);
    let isAlert = false;
    alert.conditions.forEach((condition) => {
        logger.debug("condition:");
        logger.debug(condition);
        if(compteError[condition.level] >= condition.min){
            logger.debug("alert:"+levelAlert[condition.level]);
            isAlert = true;
        }
    });
    if(isAlert){
        alertFromGlobal(alert, compteError, allScan);
    }
}

export function alertFromGlobal(alert: GlobalConfigAlert, compteError: number[], allScan: ResultScan[][]) {
    allScan = allScan.map(scan => scan.filter(value => value.error.length>0))
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
                throw new Error("not implemented");
                break;
            case AlertEnum.WEBHOOK:
                alertWebhookGlobal(alert, compteError, allScan);
                break;
            default:
                alertLogGlobal(alert, compteError, allScan);
                break;
        }
    });
}

export function alertLogGlobal(alert: GlobalConfigAlert, compteError: number[], allScan: ResultScan[][]) {
    logger.info("_______________________________________-= Result Global scan =-___________________________________");
    compteError.forEach((value, index) => {
        logger.info("number of "+levelAlert[index]+" :"+value);
    });
    logger.info("-= Detail for each Rules =-");
    let allScanOneDimension = [];
    for (let row of allScan) for (let e of row) allScanOneDimension.push(e);
    let subResult = groupBy(allScanOneDimension, (scan) => scan.rule?.name);
    Object.entries(subResult).forEach(([key, value]) => {
        logger.info("rule:"+key);
        logger.info("all resources who not respect the rules:");
        value.map(scan => scan.objectContent).forEach((resource, index) => {
            logger.info("resource " + (index+1) + ":");
            logger.info(jsome.getColoredString(resource));
        });
    });
    logger.info("_____________________________________-= End Result Global scan =-_________________________________");
}

export function alertEmailGlobal(alert: GlobalConfigAlert, compteError: number[], allScan: ResultScan[][]) {
    logger.debug("alert email");
    alert.to.forEach((email_to) => {
        if(!email_to.includes("@")) return;
        logger.debug("send email to:"+email_to);
        let render_table = renderTableAllScan(allScan.map(scan => scan.filter(value => value.error.length>0)));
        let mail = Emails.GlobalAlert(email_to, compteError, render_table, alert);
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
        request.post(webhook_to, { json: JSON.stringify(content) }, (res:any) => {
            logger.debug(`webhook to: ${webhook_to} are send`)
        }).on('error', (error:any) => {
            logger.error(error)
        });
    });
}

export function compteRender(allScan: ResultScan[][]): any {
    let result = {content : new Array<any>()};
    allScan.forEach((rule) => {
        if (rule.length == 0) return;
        return result.content.push(
            {
                rule: rule[0].rule,
                result: rule.filter(value => 
                    value.error.length > 0
                )
                .map((scan) => {
                    return {
                        objectContent: scan.objectContent,
                        error: scan.error
                    };
                })
            }
        );
    });
    return result;
}

export function alertFromRule(rule:Rules, conditions:SubResultScan[], objectResource:any, alert: Alert) {
    let detailAlert = alert[levelAlert[rule.level] as keyof typeof alert];
    if (!detailAlert.enabled) return
    detailAlert.type.forEach((type) => {
        switch(type){
            case AlertEnum.LOG:
                alertLog(rule, conditions, objectResource);
                break;
            case AlertEnum.EMAIL:
                alertEmail(detailAlert, rule, conditions, objectResource);
                break;
            case AlertEnum.SMS:
                alertSMS(detailAlert, rule, objectResource);
                break;
            case AlertEnum.SLACK:
                throw new Error("not implemented");
                break;
            case AlertEnum.TEAMS:
                throw new Error("not implemented");
                break;
            case AlertEnum.WEBHOOK:
                sendWebhook(detailAlert, "Kexa - "+levelAlert[rule.level]+" - "+rule.name, conditions)
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

export function alertLog(rule: Rules, conditions: SubResultScan[], objectResource: any) {
    switch(rule.level){
        case LevelEnum.INFO:
            logger.info("information:"+rule.name);
            logger.info(sentenceConditionLog(objectResource.id));
            logger.info(jsome.getColoredString(conditions));
            break;
        case LevelEnum.WARNING:
            warnLog(rule, conditions, objectResource);
            break;
        case LevelEnum.ERROR:
            logger.error("error:"+rule.name);
            logger.error(sentenceConditionLog(objectResource.id));
            logger.info(jsome.getColoredString(conditions));
            break;
        case LevelEnum.FATAL:
            logger.fatal("critical:"+rule.name);
            logger.fatal(sentenceConditionLog(objectResource.id));
            logger.info(jsome.getColoredString(conditions));
            break;
        default:
            warnLog(rule, conditions, objectResource);
            break;
    }
}

export function warnLog(rule: Rules, conditions:SubResultScan[], objectResource:any){
    logger.warn("warning:"+rule.name);
    logger.warn(sentenceConditionLog(objectResource.id));
    logger.info(jsome.getColoredString(conditions));
}

export function alertEmail(detailAlert: ConfigAlert|GlobalConfigAlert ,rule: Rules, conditions:SubResultScan[], objectResource:any){
    logger.debug("alert email");
    detailAlert.to.forEach((email_to) => {
        if(!email_to.includes("@")) return;
        logger.debug("send email to:"+email_to);
        let mail = Emails.OneAlert(email_to, rule, propertyToSend(rule, objectResource), colors[rule.level]);
        SendMailWithAttachment(mail, email_to, "Kexa - "+levelAlert[rule.level]+" - "+rule.name, objectResource);
        //SendMail(mail, email_to, "CheckInfra - "+levelAlert[rule.level]+" - "+rule.name);
    });
}

export function alertSMS(detailAlert: ConfigAlert|GlobalConfigAlert ,rule: Rules, objectResource:any){
    logger.debug("alert sms");
    detailAlert.to.forEach((sms_to) => {
        if(!sms_to.startsWith("+")) return;
        logger.debug("send sms to:"+sms_to);
        let content = "error with : https://portal.azure.com/#@/resource/" + objectResource.id;
        sendSMS(sms_to, "Kexa - "+levelAlert[rule.level]+" - "+rule.name, content);
    });
}


function getTransporter() {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: Number(process.env.EMAIL_PORT) == 465, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PWD,
        },
    });
}

async function SendMail(mail: string, to: string, subject: string): Promise<boolean> {
    try{
        let transporter = getTransporter();
        await transporter.sendMail({
            from: process.env.EMAIL_FROM, // sender address
            to, // list of receivers
            subject, // Subject line
            html: mail, // html body
        });
        return true;
    }catch (e) {
        logger.error("error:");
        logger.error(e);
        return false;
    }
}

async function SendMailWithAttachment(mail: string, to: string, subject: string, content: any): Promise<boolean> {
    try{
        const jsonContent = JSON.stringify(content);

        const jsonStream = new Readable();
        jsonStream.push(jsonContent);
        jsonStream.push(null);
        let transporter = getTransporter();
        await transporter.sendMail({
            from: process.env.EMAIL_FROM, // sender address
            to, // list of receivers
            subject, // Subject line
            html: mail, // html body
            attachments: [
                {
                    filename: subject +'.json',
                    content: jsonStream
                }
            ]
        });
        logger.info(`Email sent: ${subject} to ${to} with attachment`);
        return true;
    }catch (e) {
        return false;
    }
}

async function sendSMS(to: string, subject: string, content: any) {
    const accountSid = process.env.SMS_ACCOUNTSID;
    const authToken = process.env.SMS_AUTHTOKEN;
    const client = require('twilio')(accountSid, authToken);

    client.messages
        .create({
            body: `${subject}
${content}`,
            from: process.env.SMS_FROM,
            to
        })
        .then((message:any) => {
            logger.debug("send sms");
        })
        //.done();
}

async function sendWebhook(alert: ConfigAlert, subject: string, content: any) {
    content["title"] = subject;
    logger.debug("send webhook");
    alert.to.forEach((webhook_to) => {
        if(!webhook_to.includes("http")) return;
        logger.debug("send webhook to:"+webhook_to);
        request.post(webhook_to, { json: JSON.stringify(content) }, (res:any) => {
            logger.debug(`webhook to: ${webhook_to} are send`)
        }).on('error', (error:any) => {
            logger.error(error)
        });
    });
}

async function sendSlack(subject: string, content:any){
    logger.warn("send slack");
    const app = new App({
        signingSecret: process.env.SLACK_SIGNING_SECRET??"",
        token: process.env.SLACK_BOT_TOKEN?? "",
    });

    await app.client.chat.postMessage({
        token: process.env.SLACK_BOT_TOKEN??"",
        channel: process.env.SLACK_CHANNEL??"",
        text: subject,
    });
}