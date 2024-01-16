import { createPool, PoolOptions, PoolConnection, Pool, RowDataPacket } from 'mysql2/promise';
import { TableIQuery } from '../../query/table.iquery';
import { CRUDProvidersIQuery } from '../../query/CRUD/providers.iquery';
import { CRUDOriginIQuery } from '../../query/CRUD/origins.iquery';
import { CRUDProviderItemsIQuery } from '../../query/CRUD/providerItems.iquery';
import { CRUDResourcesIQuery } from '../../query/CRUD/resources.iquery';

import { getContext, getNewLogger } from "../logger.service";
import { Rules } from '../../models/settingFile/rules.models';
import { CRUDRulesIQuery } from '../../query/CRUD/rules.iquery';
import { ResultScan } from '../../models/resultScan.models';
const logger = getNewLogger("mySQLLogger");
export class MySQLSingleton {
    private static poolConnection: Pool;

    private constructor() {}

    public static initPool(host: string, port:number, user: string, password: string, database: string): void {
        if (!MySQLSingleton.poolConnection) {
            const dbConfig: PoolOptions = {
                host,
                user,
                password,
                database,
                port
            };
            MySQLSingleton.poolConnection = createPool(dbConfig);
        }
    }

    public static async getConnection(config?: PoolOptions): Promise<PoolConnection> {
        if(config){
            MySQLSingleton.poolConnection = createPool(config);
        }
        return MySQLSingleton.poolConnection.getConnection();
    }

    public static async createTables(config?: PoolOptions): Promise<boolean> {
        let conn = await MySQLSingleton.getConnection(config);
        try{
            await Promise.all(Object.values(TableIQuery).map(async (query) => {
                return await conn.execute(query);
            }));
            conn.release();
            return true;
        }catch(error){
            conn.release();
            return false;
        }
    }

    public static async disconnect(): Promise<void> {
        if (MySQLSingleton.poolConnection) {
            await MySQLSingleton.poolConnection.end();
        }
    }
}

export async function createAndGetProviders(providers: string[]): Promise<{[key:string]: number}> {
    const providerDict: {[key:string]: number} = {};
    await Promise.all(providers.map(async (provider) => {
        let conn = await MySQLSingleton.getConnection();
        await conn.execute(CRUDProvidersIQuery.Create.One, [provider]);
        conn.release();
    }));
    let conn = await MySQLSingleton.getConnection();
    let [rows, _]: [RowDataPacket[], any[]] = await conn.execute(CRUDProvidersIQuery.Read.All);
    conn.release();
    rows.forEach(row => {
        providerDict[row.name] = row.ID;
    });
    return providerDict;
}

export async function getOneProviderByName(name: string): Promise<any> {
    let conn = await MySQLSingleton.getConnection();
    let [rows, _]: [RowDataPacket[], any[]] = await conn.execute(CRUDProvidersIQuery.Read.OneByName, [name]);
    conn.release();
    return rows[0];
}

export async function createAndGetOrigin(dataEnvConfig: any): Promise<number> {
    let conn = await MySQLSingleton.getConnection();
    await conn.execute(CRUDOriginIQuery.Create.One, [dataEnvConfig?.name??"Unknown", dataEnvConfig?.description??"No description"]);
    let [rows, _]: [RowDataPacket[], any[]] = await conn.execute(CRUDOriginIQuery.Read.OneByName, [dataEnvConfig?.name??"Unknown"]);
    conn.release();
    return rows[0].ID;
}

export async function createAndGetProviderItems(providerId:number, providerItems: string[]): Promise<{[key:string]: number}> {
    const providerItemsDict: {[key:string]: number} = {};
    await Promise.all(providerItems.map(async (item) => {
        let firstItem = await getProviderItemsByNameAndProvider(providerId, item);
        providerItemsDict[firstItem.name] = firstItem.ID;
    }));
    return providerItemsDict;
}

export async function getProviderItemsByNameAndProvider(providerId: number, name: string): Promise<any> {
    let conn = await MySQLSingleton.getConnection();
    let [rows, _]: [RowDataPacket[], any[]] = await conn.execute(CRUDProviderItemsIQuery.Read.OneByNameAndProvider, [name, providerId]);
    if(rows.length === 0){
        await conn.execute(CRUDProviderItemsIQuery.Create.One, [name, providerId]);
        [rows, _] = await conn.execute(CRUDProviderItemsIQuery.Read.OneByNameAndProvider, [name, providerId]);
    }
    conn.release();
    return rows[0];
}

export async function createAndGetResources(resources: any, originId: number, providerItemsId: number): Promise<number[]> {
    let [ids] = await Promise.all(resources.map(async (resource: any) => {
        return await createAndGetResource(resource, originId, providerItemsId);
    }));
    return ids;
}

export async function createAndGetResource(resource: any, originId: number, providerItemsId: number): Promise<number> {
    let conn = await MySQLSingleton.getConnection();
    await conn.execute(CRUDResourcesIQuery.Create.One, [JSON.stringify(resource), originId, providerItemsId]);
    let [rows, _]: [RowDataPacket[], any[]] = await conn.execute(CRUDResourcesIQuery.Read.OneByContent, [JSON.stringify(resource)]);
    conn.release();
    return rows[0].ID;
}

export async function createAndGetRule(rule: Rules, providerId:number, providerItemId:number): Promise<number> {
    let conn = await MySQLSingleton.getConnection();
    await conn.execute(CRUDRulesIQuery.Create.One, [rule.name??"Unknown", rule.description??"No description", rule?.loud??0, rule.level, providerId, providerItemId]);
    let [rows, _]: [RowDataPacket[], any[]] = await conn.execute(CRUDRulesIQuery.Read.OneByName, [rule.name]);
    conn.release();
    return rows[0].ID;
}

export async function createScan(resultScan: ResultScan, resourceId: number, ruleId: number): Promise<void> {
    let conn = await MySQLSingleton.getConnection();
    await conn.execute(CRUDRulesIQuery.Create.One, [(resultScan.error.length > 0), resourceId, ruleId]);
    conn.release();
}