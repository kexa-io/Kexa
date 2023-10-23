//change the path of this file to "~/Kexa/services/addOns/display/XXXDisplay.service.ts"
//change XXX by the name of your addOn
//change the path of this import to match the path of your addOn
import { Rules } from "../../Kexa/models/settingFile/rules.models";

export function propertyToSend(rule: Rules, objectContent: any, isSms: boolean=false): string{
    //you can also use a switch on rule.objectName to perform a specific return for each type of objectName you create with your addOn
    //it is advisable to make a default return to cover all possible cases.
    // https://provider.com/ is an example of a link to the provider's website
    //all code in this function is an example, you can modify it as you wish
    if (isSms)
        return `Id : `+ objectContent?.id + `https://provider.com/` + objectContent?.id
    else
        return `Id : <a href="https://provider.com/` + objectContent?.id + '">' + objectContent?.id + `</a>`
}

//can add other function here