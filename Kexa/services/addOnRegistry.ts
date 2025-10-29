import * as awsDisplay from './addOn/display/awsDisplay.service';
import * as azureDisplay from './addOn/display/azureDisplay.service';
import * as fuzzDisplay from './addOn/display/fuzzDisplay.service';
import * as gcpDisplay from './addOn/display/gcpDisplay.service';
import * as githubDisplay from './addOn/display/githubDisplay.service';
import * as googleDriveDisplay from './addOn/display/googleDriveDisplay.service';
import * as googleWorkspaceDisplay from './addOn/display/googleWorkspaceDisplay.service';
import * as helmDisplay from './addOn/display/helmDisplay.service';
import * as httpDisplay from './addOn/display/httpDisplay.service';
import * as kubernetesDisplay from './addOn/display/kubernetesDisplay.service';
import * as mongodbDisplay from './addOn/display/mongodbDisplay.service';
import * as mysqlDisplay from './addOn/display/mysqlDisplay.service';
import * as o365Display from './addOn/display/o365Display.service';
import * as oracleDisplay from './addOn/display/oracleDisplay.service';
import * as postgresqlDisplay from './addOn/display/postgresqlDisplay.service';

import * as amazonS3Save from './addOn/save/amazonS3Save.service';
import * as azureBlobStorageSave from './addOn/save/azureBlobStorageSave.service';
import * as kexaSave from './addOn/save/kexaSave.service';
import * as mongoDBSave from './addOn/save/mongoDBSave.service';
import * as mySQLSave from './addOn/save/mySQLSave.service';
import * as postgresSave from './addOn/save/postgresSave.service';

import * as azureBlobStorageExportation from './addOn/exportation/azureBlobStorageExportation.service';
import * as kexaExportation from './addOn/exportation/kexaExportation.service';
import * as mongoDBExportation from './addOn/exportation/mongoDBExportation.service';
import * as mySQLExportation from './addOn/exportation/mySQLExportation.service';
import * as postgresExportation from './addOn/exportation/postgresExportation.service';

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

const gatheringModuleCache: { [key: string]: any } = {};

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

const displayRegistry: { [key: string]: any } = {
    'awsDisplay.service.ts': awsDisplay,
    'azureDisplay.service.ts': azureDisplay,
    'fuzzDisplay.service.ts': fuzzDisplay,
    'gcpDisplay.service.ts': gcpDisplay,
    'githubDisplay.service.ts': githubDisplay,
    'googleDriveDisplay.service.ts': googleDriveDisplay,
    'googleWorkspaceDisplay.service.ts': googleWorkspaceDisplay,
    'helmDisplay.service.ts': helmDisplay,
    'httpDisplay.service.ts': httpDisplay,
    'kubernetesDisplay.service.ts': kubernetesDisplay,
    'mongodbDisplay.service.ts': mongodbDisplay,
    'mysqlDisplay.service.ts': mysqlDisplay,
    'o365Display.service.ts': o365Display,
    'oracleDisplay.service.ts': oracleDisplay,
    'postgresqlDisplay.service.ts': postgresqlDisplay,
};

const saveRegistry: { [key: string]: any } = {
    'amazonS3Save.service.ts': amazonS3Save,
    'azureBlobStorageSave.service.ts': azureBlobStorageSave,
    'kexaSave.service.ts': kexaSave,
    'mongoDBSave.service.ts': mongoDBSave,
    'mySQLSave.service.ts': mySQLSave,
    'postgresSave.service.ts': postgresSave,
};

const exportationRegistry: { [key: string]: any } = {
    'azureBlobStorageExportation.service.ts': azureBlobStorageExportation,
    'kexaExportation.service.ts': kexaExportation,
    'mongoDBExportation.service.ts': mongoDBExportation,
    'mySQLExportation.service.ts': mySQLExportation,
    'postgresExportation.service.ts': postgresExportation,
};

export async function getAddOnModule(type: string, filename: string): Promise<any> {
    switch(type) {
        case 'gathering':
            return await loadGatheringModule(filename);
        case 'display':
            return displayRegistry[filename];
        case 'save':
            return saveRegistry[filename];
        case 'exportation':
            return exportationRegistry[filename];
        default:
            return null;
    }
}

export function hasAddOnModule(type: string, filename: string): boolean {
    if (type === 'gathering') {
        return gatheringFiles.includes(filename);
    }
    return getAddOnModule(type, filename) !== null && getAddOnModule(type, filename) !== undefined;
}

export function getAllAddOnFiles(type: string): string[] {
    switch(type) {
        case 'gathering':
            return gatheringFiles;
        case 'display':
            return Object.keys(displayRegistry);
        case 'save':
            return Object.keys(saveRegistry);
        case 'exportation':
            return Object.keys(exportationRegistry);
        default:
            return [];
    }
}
