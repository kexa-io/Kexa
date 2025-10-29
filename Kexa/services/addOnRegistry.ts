const gatheringFiles = [
    'awsGathering.service.ts',
    'azureGathering.service.ts',
    'fuzzGathering.service.ts',
    'gcpGathering.service.ts',
    'githubGathering.service.ts',
    'googleDriveGathering.service.ts',
    'googleWorkspaceGathering.service.ts',
    'helmGathering.service.ts',
    'httpGathering.service.ts',
    'kubernetesGathering.service.ts',
    'mongodbGathering.service.ts',
    'mysqlGathering.service.ts',
    'o365Gathering.service.ts',
    'oracleGathering.service.ts',
    'postgresqlGathering.service.ts',
];

const displayFiles = [
    'awsDisplay.service.ts',
    'azureDisplay.service.ts',
    'fuzzDisplay.service.ts',
    'gcpDisplay.service.ts',
    'githubDisplay.service.ts',
    'googleDriveDisplay.service.ts',
    'googleWorkspaceDisplay.service.ts',
    'helmDisplay.service.ts',
    'httpDisplay.service.ts',
    'kubernetesDisplay.service.ts',
    'mongodbDisplay.service.ts',
    'mysqlDisplay.service.ts',
    'o365Display.service.ts',
    'oracleDisplay.service.ts',
    'postgresqlDisplay.service.ts',
];

const saveFiles = [
    'amazonS3Save.service.ts',
    'azureBlobStorageSave.service.ts',
    'kexaSave.service.ts',
    'mongoDBSave.service.ts',
    'mySQLSave.service.ts',
    'postgresSave.service.ts',
];

const exportationFiles = [
    'azureBlobStorageExportation.service.ts',
    'kexaExportation.service.ts',
    'mongoDBExportation.service.ts',
    'mySQLExportation.service.ts',
    'postgresExportation.service.ts',
];

export async function getAddOnModule(type: string, filename: string): Promise<any> {
    const nameAddOn = filename.split(/Gathering|Display|Save|Exportation/)[0];

    switch(type) {
        case 'gathering':
            return await import(`./addOn/${nameAddOn}Gathering.service`);
        case 'display':
            return await import(`./addOn/display/${nameAddOn}Display.service`);
        case 'save':
            return await import(`./addOn/save/${nameAddOn}Save.service`);
        case 'exportation':
            return await import(`./addOn/exportation/${nameAddOn}Exportation.service`);
        default:
            return null;
    }
}

export function hasAddOnModule(type: string, filename: string): boolean {
    return getAllAddOnFiles(type).includes(filename);
}

export function getAllAddOnFiles(type: string): string[] {
    switch(type) {
        case 'gathering':
            return gatheringFiles;
        case 'display':
            return displayFiles;
        case 'save':
            return saveFiles;
        case 'exportation':
            return exportationFiles;
        default:
            return [];
    }
}
