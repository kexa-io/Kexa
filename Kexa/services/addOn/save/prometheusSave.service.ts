import { ResultScan } from "../../../models/resultScan.models";
import { getEnvVar } from "../../manageVarEnvironnement.service";
import { getContext, getNewLogger } from "../../logger.service";
import { PrometheusSaveConfig } from "../../../models/export/prometheus/config.models";
import { EventMetric } from "../../../models/export/prometheus/eventMetric.models";
import { loadAddOnsCustomUtility } from "../../addOn.service";

const axios = require('axios');
const logger = getNewLogger("prometheusLogger");
const context = getContext();
const addOnPropertyToSend: { [key: string]: Function; } = loadAddOnsCustomUtility("display", "propertyToSend");

export async function save(save: PrometheusSaveConfig, result: ResultScan[][]): Promise<void>{
    throw new Error("Not finish implemented yet");
    if(!save.urlName) throw new Error("urlName is required");
    let url = (await getEnvVar(save.urlName))??save.urlName;
    logger.info(`Saving to Prometheus`);
    context?.log(`Saving to Prometheus`);
    const metrics = await Promise.all(result.flat().map(async (resultScan) => {
        return convertResultScanToEventMetric(resultScan);
    }));
    await sendMetrics(url, metrics);
}

async function sendMetrics (prometheusURL:string, metrics: EventMetric[]) {
    const formattedMetrics = metrics.map(metric => {
        return `kexa_event_total{level="${metric.level}"} 1 ${metric.ruleName} ${metric.identifier} ${metric.timestamp}`;
    }).join('\n');

    await axios.post(`${prometheusURL}/metrics/job/event_metrics`, formattedMetrics);
};

function convertResultScanToEventMetric(resultScan: ResultScan): EventMetric {
    return {
        level: resultScan.rule.level,
        timestamp: new Date().getTime(),
        identifier: addOnPropertyToSend[resultScan.rule.cloudProvider](resultScan),
        ruleName: resultScan.rule.name??"",
    };
}