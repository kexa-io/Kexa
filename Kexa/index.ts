import { AzureFunction, Context } from "@azure/functions"
import { main } from "./main";

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
    const timeStamp = new Date().toISOString();
    
    if (myTimer.isPastDue)
    {
        context.log('Timer function is running late!');
    }
    await main();
    context.log('Timer trigger function ran!', timeStamp);
};

export default timerTrigger;
