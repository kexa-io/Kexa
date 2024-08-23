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
import { CRUDScansIQuery } from '../../query/CRUD/scans.iquery';
import { jsonStringify } from '../../helpers/jsonStringify';
const logger = getNewLogger("mySQLLogger");
export class MySQLClass {
    private poolConnection!: Pool;
    private nbrConnection: number = 0;

    public constructor() {}

    public initPool(host: string, port:number, user: string, password: string, database: string): void {
        if (!this.poolConnection) {
            const dbConfig: PoolOptions = {
                host,
                user,
                password,
                database,
                port
            };
            this.poolConnection = createPool(dbConfig);
        }
    }

    public async getConnection(config?: PoolOptions): Promise<PoolConnection> {
        if(config){
            this.poolConnection = createPool(config);
        }
        this.nbrConnection++;
        return this.poolConnection.getConnection();
    }

    public async createTables(config?: PoolOptions): Promise<boolean> {
        let conn = await this.getConnection(config);
        try{
            await Promise.all(Object.values(TableIQuery).map(async (query) => {
                return await conn.execute(query);
            }));
            this.closeConnection(conn);
            return true;
        }catch(error){
            this.closeConnection(conn);
            return false;
        }
    }

    public async disconnect(force:Boolean=false): Promise<void> {
        logger.debug("Number of connection: " + this.nbrConnection);
        if ((this.poolConnection && this.nbrConnection === 0) || force) {
            logger.debug("Disconnecting from MySQL");
            await this.poolConnection?.end();
        }
    }

    public async closeConnection(conn: PoolConnection): Promise<void> {
        if (conn) {
            this.nbrConnection--;
            await conn.release();
        }
    }

    public async createAndGetProviders(providers: string[]): Promise<{[key:string]: number}> {
        const providerDict: {[key:string]: number} = {};
        await Promise.all(providers.map(async (provider) => {
            let conn = await this.getConnection();
            await conn.execute(CRUDProvidersIQuery.Create.One, [provider]);
            this.closeConnection(conn);
        }));
        let conn = await this.getConnection();
        let [rows, _]: [RowDataPacket[], any[]] = await conn.execute(CRUDProvidersIQuery.Read.All);
        this.closeConnection(conn);
        rows.forEach(row => {
            providerDict[row.name] = row.ID;
        });
        return providerDict;
    }

    public async createAndGetProvider(provider: string): Promise<number> {
        let conn = await this.getConnection();
        await conn.execute(CRUDProvidersIQuery.Create.One, [provider]);
        let [rows, _]: [RowDataPacket[], any[]] = await conn.execute(CRUDProvidersIQuery.Read.OneByName, [provider]);
        this.closeConnection(conn);
        return rows[0].ID;
    }
    
    public async getOneProviderByName(name: string): Promise<any> {
        let conn = await this.getConnection();
        let [rows, _]: [RowDataPacket[], any[]] = await conn.execute(CRUDProvidersIQuery.Read.OneByName, [name]);
        this.closeConnection(conn);
        return rows[0];
    }
    
    public async createAndGetOrigin(dataEnvConfig: any): Promise<number> {
        let conn = await this.getConnection();
        await conn.execute(CRUDOriginIQuery.Create.One, [dataEnvConfig?.name??"Unknown", dataEnvConfig?.description??"No description"]);
        let [rows, _]: [RowDataPacket[], any[]] = await conn.execute(CRUDOriginIQuery.Read.OneByName, [dataEnvConfig?.name??"Unknown"]);
        this.closeConnection(conn);
        return rows[0].ID;
    }
    
    public async createAndGetProviderItems(providerId:number, providerItems: string[]): Promise<{[key:string]: number}> {
        const providerItemsDict: {[key:string]: number} = {};
        await Promise.all(providerItems.map(async (item) => {
            let firstItem = await this.getProviderItemsByNameAndProvider(providerId, item);
            providerItemsDict[firstItem.name] = firstItem.ID;
        }));
        return providerItemsDict;
    }
    
    public async getProviderItemsByNameAndProvider(providerId: number, name: string): Promise<any> {
        let conn = await this.getConnection();
        let [rows, _]: [RowDataPacket[], any[]] = await conn.execute(CRUDProviderItemsIQuery.Read.OneByNameAndProvider, [name, providerId]);
        if(rows.length === 0){
            await conn.execute(CRUDProviderItemsIQuery.Create.One, [name, providerId]);
            [rows, _] = await conn.execute(CRUDProviderItemsIQuery.Read.OneByNameAndProvider, [name, providerId]);
        }
        this.closeConnection(conn);
        return rows[0];
    }
    
    public async createAndGetResources(resources: any, originId: number, providerItemsId: number): Promise<number[]> {
        let [ids] = await Promise.all(resources.map(async (resource: any) => {
            return await this.createAndGetResource(resource, originId, providerItemsId);
        }));
        return ids;
    }
    
    public async createAndGetResource(resource: any, originId: number, providerItemsId: number): Promise<number> {
        let conn = await this.getConnection();
        await conn.execute(CRUDResourcesIQuery.Create.One, [jsonStringify(resource), originId, providerItemsId]);
        let [rows, _]: [RowDataPacket[], any[]] = await conn.execute(CRUDResourcesIQuery.Read.OneByContent, [jsonStringify(resource)]);
        this.closeConnection(conn);
        return rows[0].ID;
    }
    
    public async createAndGetRule(rule: Rules, providerId:number, providerItemId:number): Promise<number> {
        let conn = await this.getConnection();
        await conn.execute(CRUDRulesIQuery.Create.One, [rule.name??"Unknown", rule.description??"No description", rule?.loud??0, rule.level, providerId, providerItemId]);
        let [rows, _]: [RowDataPacket[], any[]] = await conn.execute(CRUDRulesIQuery.Read.OneByName, [rule.name]);
        this.closeConnection(conn);
        return rows[0].ID;
    }
    
    public async createScan(resultScan: ResultScan, resourceId: number, ruleId: number, batchId: string): Promise<void> {
        let conn = await this.getConnection();
        await conn.execute(CRUDScansIQuery.Create.One, [(resultScan.error.length > 0), resourceId, ruleId, batchId]);
        this.closeConnection(conn);
    }
}