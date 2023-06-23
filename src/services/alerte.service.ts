import { AlertEnum } from "../enum/alert.enum";
import { LevelEnum } from "../enum/level.enum";
import { ResultScan, SubResultScan } from "../models/resultScan.models";
import { Alert } from "../models/settingFile/alert.models";
import { Rules } from "../models/settingFile/rules.model";
import { Logger } from "tslog";
import { Emails } from "./emails/emails";
import { GlobalConfigAlert } from "../models/settingFile/globalAlert.models";
import { ConfigAlert } from "../models/settingFile/configAlert.models";
import { Readable } from "stream";

let debug_mode = 2;
const nodemailer = require("nodemailer");
const logger = new Logger({ minLevel: debug_mode, type: "pretty", name: "functionLogger" });
const levelAlert = ["info", "warning", "error", "critical"];
const colors = ["#4f5660", "#ffcc00", "#cc3300", "#cc3300"];

export function alertGlobal(allScan: ResultScan[][], alert: GlobalConfigAlert) {
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
    switch(alert.type){
        case AlertEnum.LOG:
            alertLogGlobal(alert, compteError, allScan);
            break;
        case AlertEnum.EMAIL:
            alertEmailGlobal(alert, compteError, allScan);
            break;
        case AlertEnum.SMS:
            throw new Error("not implemented");
            break;
        case AlertEnum.SLACK:
            throw new Error("not implemented");
            break;
        case AlertEnum.TEAMS:
            throw new Error("not implemented");
            break;
        case AlertEnum.WEBHOOK:
            throw new Error("not implemented");
            break;
        default:
            alertLogGlobal(alert, compteError, allScan);
            break;
    }
}

export function alertLogGlobal(alert: GlobalConfigAlert, compteError: number[], allScan: ResultScan[][]) {
    compteError.forEach((value, index) => {
        logger.info("number of "+levelAlert[index]+" :"+value);
    });
    logger.info("detail:");
    allScan.forEach((rule) => {
        rule.forEach((scan) => {
            if(scan.error.length > 0){
                logger.info("rule:"+scan.rule?.name);
                logger.info("resource:");
                logger.info(scan.objectContent);
                logger.info("error:");
                logger.info(scan.error);
            }
        });
    });
}

export function alertEmailGlobal(alert: GlobalConfigAlert, compteError: number[], allScan: ResultScan[][]) {
    logger.debug("alert email");
    alert.to.forEach((email_to) => {
        logger.debug("send email to:"+email_to);
        let mail = Emails.GlobalAlert(email_to, compteError, allScan, alert);
        SendMailWithAttachment(mail, email_to, "CheckInfra - Global Alert - "+alert.name??"Uname", compteRender(allScan));
    });
}

export function compteRender(allScan: ResultScan[][]): any {
    let result = {content : new Array<any>()};
    logger.debug("allScan:");
    logger.debug(allScan);
    allScan.forEach((rule) => {
        logger.debug("rule:");
        logger.debug(rule);
        logger.debug({
            rule: rule[0].rule,
            result: rule.map((scan) => {
                return {
                    objectContent: scan.objectContent,
                    error: scan.error
                };
            })
        })
        return result.content.push(
            {
                rule: rule[0].rule,
                result: rule.map((scan) => {
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
    switch(detailAlert.type){
        case AlertEnum.LOG:
            alertLog(rule, conditions, objectResource);
            break;
        case AlertEnum.EMAIL:
            alertEmail(detailAlert, rule, conditions, objectResource);
            break;
        case AlertEnum.SMS:
            throw new Error("not implemented");
            break;
        case AlertEnum.SLACK:
            throw new Error("not implemented");
            break;
        case AlertEnum.TEAMS:
            throw new Error("not implemented");
            break;
        case AlertEnum.WEBHOOK:
            throw new Error("not implemented");
            break;
        default:
            logger.error("error:"+rule.name);
            logger.error("resource:");
            logger.error(conditions);
            break;
    }
}

const sentenceConditionLog = (resource : string) => {
    return "condition not respect for " + resource + " :";
}

export function alertLog(rule: Rules, conditions: SubResultScan[], objectResource: any) {
    switch(rule.level){
        case LevelEnum.INFO:
            logger.info("information:"+rule.name);
            logger.info(sentenceConditionLog(objectResource.id));
            logger.info(conditions);
            break;
        case LevelEnum.WARNING:
            warnLog(rule, conditions, objectResource);
            break;
        case LevelEnum.ERROR:
            logger.error("error:"+rule.name);
            logger.error(sentenceConditionLog(objectResource.id));
            logger.error(conditions);
            break;
        case LevelEnum.FATAL:
            logger.fatal("critical:"+rule.name);
            logger.fatal(sentenceConditionLog(objectResource.id));
            logger.fatal(conditions);
            break;
        default:
            warnLog(rule, conditions, objectResource);
            break;
    }
}

export function warnLog(rule: Rules, conditions:SubResultScan[], objectResource:any){
    logger.warn("warning:"+rule.name);
    logger.warn(sentenceConditionLog(objectResource.id));
    logger.warn(conditions);
}

export function alertEmail(detailAlert: ConfigAlert|GlobalConfigAlert ,rule: Rules, conditions:SubResultScan[], objectResource:any){
    logger.debug("alert email");
    detailAlert.to.forEach((email_to) => {
        logger.debug("send email to:"+email_to);
        let mail = Emails.OneAlert(email_to, objectResource, rule, conditions, colors[rule.level]);
        SendMail(mail, email_to, "CheckInfra - "+levelAlert[rule.level]+" - "+rule.name);
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
        logger.debug(content);
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