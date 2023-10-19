import { AzureFunction, Context } from "@azure/functions"
import { main } from "./main";
import { setContext } from "./services/logger.service";

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
    const timeStamp = new Date().toISOString();
    
    if (myTimer.isPastDue)
    {
        context.log('Timer function is running late!');
    }
    context.log("The function is starting to scan");
    setContext(context);
    await main();
    context.log('Timer trigger function ran!', timeStamp);
};

export default timerTrigger;
