// Static imports for all gathering services
import * as awsGathering from './addOn/awsGathering.service';
import * as azureGathering from './addOn/azureGathering.service';
import * as fuzzGathering from './addOn/fuzzGathering.service';
import * as gcpGathering from './addOn/gcpGathering.service';
import * as githubGathering from './addOn/githubGathering.service';
import * as googleDriveGathering from './addOn/googleDriveGathering.service';
import * as googleWorkspaceGathering from './addOn/googleWorkspaceGathering.service';
import * as helmGathering from './addOn/helmGathering.service';
import * as httpGathering from './addOn/httpGathering.service';
import * as kubernetesGathering from './addOn/kubernetesGathering.service';
import * as o365Gathering from './addOn/o365Gathering.service';

// Static imports for all display services
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
import * as o365Display from './addOn/display/o365Display.service';

// Static imports for all save services
import * as amazonS3Save from './addOn/save/amazonS3Save.service';
import * as azureBlobStorageSave from './addOn/save/azureBlobStorageSave.service';
import * as kexaSave from './addOn/save/kexaSave.service';
import * as mongoDBSave from './addOn/save/mongoDBSave.service';
import * as mySQLSave from './addOn/save/mySQLSave.service';
import * as postgresSave from './addOn/save/postgresSave.service';
import * as prometheusSave from './addOn/save/prometheusSave.service';

// Static imports for all exportation services
import * as azureBlobStorageExportation from './addOn/exportation/azureBlobStorageExportation.service';
import * as kexaExportation from './addOn/exportation/kexaExportation.service';
import * as mongoDBExportation from './addOn/exportation/mongoDBExportation.service';
import * as mySQLExportation from './addOn/exportation/mySQLExportation.service';
import * as postgresExportation from './addOn/exportation/postgresExportation.service';

// Registry for gathering services
const gatheringRegistry: { [key: string]: any } = {
    'awsGathering.service.ts': awsGathering,
    'azureGathering.service.ts': azureGathering,
    'fuzzGathering.service.ts': fuzzGathering,
    'gcpGathering.service.ts': gcpGathering,
    'githubGathering.service.ts': githubGathering,
    'googleDriveGathering.service.ts': googleDriveGathering,
    'googleWorkspaceGathering.service.ts': googleWorkspaceGathering,
    'helmGathering.service.ts': helmGathering,
    'httpGathering.service.ts': httpGathering,
    'kubernetesGathering.service.ts': kubernetesGathering,
    'o365Gathering.service.ts': o365Gathering,
};

// Registry for display services
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
    'o365Display.service.ts': o365Display,
};

// Registry for save services
const saveRegistry: { [key: string]: any } = {
    'amazonS3Save.service.ts': amazonS3Save,
    'azureBlobStorageSave.service.ts': azureBlobStorageSave,
    'kexaSave.service.ts': kexaSave,
    'mongoDBSave.service.ts': mongoDBSave,
    'mySQLSave.service.ts': mySQLSave,
    'postgresSave.service.ts': postgresSave,
    'prometheusSave.service.ts': prometheusSave,
};

// Registry for exportation services
const exportationRegistry: { [key: string]: any } = {
    'azureBlobStorageExportation.service.ts': azureBlobStorageExportation,
    'kexaExportation.service.ts': kexaExportation,
    'mongoDBExportation.service.ts': mongoDBExportation,
    'mySQLExportation.service.ts': mySQLExportation,
    'postgresExportation.service.ts': postgresExportation,
};

export function getAddOnModule(type: string, filename: string): any {
    switch(type) {
        case 'gathering':
            return gatheringRegistry[filename];
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
    return getAddOnModule(type, filename) !== null && getAddOnModule(type, filename) !== undefined;
}

export function getAllAddOnFiles(type: string): string[] {
    switch(type) {
        case 'gathering':
            return Object.keys(gatheringRegistry);
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
