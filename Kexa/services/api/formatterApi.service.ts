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

export function formatAlertCondition(alertCondition: any) {
    let formattedAlertCondition = [];
    for (const key of Object.keys(alertCondition)) {
        formattedAlertCondition.push({level: parseInt(key), min: alertCondition[key]});
    }
    return formattedAlertCondition;
}
