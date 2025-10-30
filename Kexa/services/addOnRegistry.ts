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

const gatheringModuleCache: { [key: string]: any } = {};
const displayModuleCache: { [key: string]: any } = {};
const saveModuleCache: { [key: string]: any } = {};
const exportationModuleCache: { [key: string]: any } = {};

async function loadGatheringModule(filename: string): Promise<any> {
    if (gatheringModuleCache[filename]) {
        return gatheringModuleCache[filename];
    }

    let module;
    switch(filename) {
        case 'awsGathering.service.ts':
            module = await import('./addOn/awsGathering.service');
            break;
        case 'azureGathering.service.ts':
            module = await import('./addOn/azureGathering.service');
            break;
        case 'fuzzGathering.service.ts':
            module = await import('./addOn/fuzzGathering.service');
            break;
        case 'gcpGathering.service.ts':
            module = await import('./addOn/gcpGathering.service');
            break;
        case 'githubGathering.service.ts':
            module = await import('./addOn/githubGathering.service');
            break;
        case 'googleDriveGathering.service.ts':
            module = await import('./addOn/googleDriveGathering.service');
            break;
        case 'googleWorkspaceGathering.service.ts':
            module = await import('./addOn/googleWorkspaceGathering.service');
            break;
        case 'helmGathering.service.ts':
            module = await import('./addOn/helmGathering.service');
            break;
        case 'httpGathering.service.ts':
            module = await import('./addOn/httpGathering.service');
            break;
        case 'kubernetesGathering.service.ts':
            module = await import('./addOn/kubernetesGathering.service');
            break;
        case 'mongodbGathering.service.ts':
            module = await import('./addOn/mongodbGathering.service');
            break;
        case 'mysqlGathering.service.ts':
            module = await import('./addOn/mysqlGathering.service');
            break;
        case 'o365Gathering.service.ts':
            module = await import('./addOn/o365Gathering.service');
            break;
        case 'oracleGathering.service.ts':
            module = await import('./addOn/oracleGathering.service');
            break;
        case 'postgresqlGathering.service.ts':
            module = await import('./addOn/postgresqlGathering.service');
            break;
        default:
            return null;
    }

    gatheringModuleCache[filename] = module;
    return module;
}

async function loadDisplayModule(filename: string): Promise<any> {
    if (displayModuleCache[filename]) {
        return displayModuleCache[filename];
    }

    let module;
    switch(filename) {
        case 'awsDisplay.service.ts':
            module = await import('./addOn/display/awsDisplay.service');
            break;
        case 'azureDisplay.service.ts':
            module = await import('./addOn/display/azureDisplay.service');
            break;
        case 'fuzzDisplay.service.ts':
            module = await import('./addOn/display/fuzzDisplay.service');
            break;
        case 'gcpDisplay.service.ts':
            module = await import('./addOn/display/gcpDisplay.service');
            break;
        case 'githubDisplay.service.ts':
            module = await import('./addOn/display/githubDisplay.service');
            break;
        case 'googleDriveDisplay.service.ts':
            module = await import('./addOn/display/googleDriveDisplay.service');
            break;
        case 'googleWorkspaceDisplay.service.ts':
            module = await import('./addOn/display/googleWorkspaceDisplay.service');
            break;
        case 'helmDisplay.service.ts':
            module = await import('./addOn/display/helmDisplay.service');
            break;
        case 'httpDisplay.service.ts':
            module = await import('./addOn/display/httpDisplay.service');
            break;
        case 'kubernetesDisplay.service.ts':
            module = await import('./addOn/display/kubernetesDisplay.service');
            break;
        case 'mongodbDisplay.service.ts':
            module = await import('./addOn/display/mongodbDisplay.service');
            break;
        case 'mysqlDisplay.service.ts':
            module = await import('./addOn/display/mysqlDisplay.service');
            break;
        case 'o365Display.service.ts':
            module = await import('./addOn/display/o365Display.service');
            break;
        case 'oracleDisplay.service.ts':
            module = await import('./addOn/display/oracleDisplay.service');
            break;
        case 'postgresqlDisplay.service.ts':
            module = await import('./addOn/display/postgresqlDisplay.service');
            break;
        default:
            return null;
    }

    displayModuleCache[filename] = module;
    return module;
}

async function loadSaveModule(filename: string): Promise<any> {
    if (saveModuleCache[filename]) {
        return saveModuleCache[filename];
    }

    let module;
    switch(filename) {
        case 'amazonS3Save.service.ts':
            module = await import('./addOn/save/amazonS3Save.service');
            break;
        case 'azureBlobStorageSave.service.ts':
            module = await import('./addOn/save/azureBlobStorageSave.service');
            break;
        case 'kexaSave.service.ts':
            module = await import('./addOn/save/kexaSave.service');
            break;
        case 'mongoDBSave.service.ts':
            module = await import('./addOn/save/mongoDBSave.service');
            break;
        case 'mySQLSave.service.ts':
            module = await import('./addOn/save/mySQLSave.service');
            break;
        case 'postgresSave.service.ts':
            module = await import('./addOn/save/postgresSave.service');
            break;
        default:
            return null;
    }

    saveModuleCache[filename] = module;
    return module;
}

async function loadExportationModule(filename: string): Promise<any> {
    if (exportationModuleCache[filename]) {
        return exportationModuleCache[filename];
    }

    let module;
    switch(filename) {
        case 'azureBlobStorageExportation.service.ts':
            module = await import('./addOn/exportation/azureBlobStorageExportation.service');
            break;
        case 'kexaExportation.service.ts':
            module = await import('./addOn/exportation/kexaExportation.service');
            break;
        case 'mongoDBExportation.service.ts':
            module = await import('./addOn/exportation/mongoDBExportation.service');
            break;
        case 'mySQLExportation.service.ts':
            module = await import('./addOn/exportation/mySQLExportation.service');
            break;
        case 'postgresExportation.service.ts':
            module = await import('./addOn/exportation/postgresExportation.service');
            break;
        default:
            return null;
    }

    exportationModuleCache[filename] = module;
    return module;
}

export async function getAddOnModule(type: string, filename: string): Promise<any> {
    switch(type) {
        case 'gathering':
            return await loadGatheringModule(filename);
        case 'display':
            return await loadDisplayModule(filename);
        case 'save':
            return await loadSaveModule(filename);
        case 'exportation':
            return await loadExportationModule(filename);
        default:
            return null;
    }
}

export function hasAddOnModule(type: string, filename: string): boolean {
    switch(type) {
        case 'gathering':
            return gatheringFiles.includes(filename);
        case 'display':
            return displayFiles.includes(filename);
        case 'save':
            return saveFiles.includes(filename);
        case 'exportation':
            return exportationFiles.includes(filename);
        default:
            return false;
    }
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
