export async function createSettingsFileFromApiData(oneConfig: any){
    let settingsObj = {
        version: oneConfig.version,
        date: oneConfig.date,
        name: oneConfig.name,
        alert: {
          fatal: { enabled: oneConfig.fatal_enabled, type: oneConfig.fatal_type, to: oneConfig.fatal_to },
          error: { enabled: oneConfig.error_enabled, type: oneConfig.error_type, to: oneConfig.error_to },
          warning: { enabled: oneConfig.warning_enabled, type: oneConfig.warning_type, to: oneConfig.warning_to },
          info: { enabled: oneConfig.info_enabled, type: oneConfig.info_type, to: oneConfig.info_to },
          global: {
            enabled: oneConfig.global_enabled,
            type: oneConfig.global_type,
            to: oneConfig.global_to,
            conditions: oneConfig.global_conditions,
            name: oneConfig.name
          }
        },
        rules: oneConfig.rules
      };

      return settingsObj;
}

export async function formatProviderNeededData(providerData: any) {
    let formattedProviderData = [];
    for (let i = 0; i < providerData.length; i++) {
        let provider = providerData[i];
        formattedProviderData.push(provider.name);
    }
    return formattedProviderData;
}


export async function formatRuleCondition(rulesData: any) {

    let formattedRulesData = [];
    for (let i = 0; i < rulesData.length; i++) {
        let rule = rulesData[i];
        let formattedConditions = [];
        for (let j = 0; j < rule.conditions.length; j++) {
            let condition = rule.conditions[j];
            let formattedCondition = {property: condition.property, condition: condition.condition, value: condition.value};
            formattedConditions.push(formattedCondition);
        }
        rule.conditions = formattedConditions;
        formattedRulesData.push(rule);
    }

}

export function formatAlertCondition(alertCondition: any) {
    let formattedAlertCondition = [];
    for (const key of Object.keys(alertCondition)) {
        formattedAlertCondition.push({level: parseInt(key), min: alertCondition[key]});
    }
    return formattedAlertCondition;
}

export function escapedYamlToJson(yamlString: any): any {
    let yamlStringEscaped = yamlString.replace(/\\/g, '');
    const noMoreBraces = yamlStringEscaped.slice(2, -2);

    const parsedObject = JSON.parse(noMoreBraces);
    return [parsedObject];
}
