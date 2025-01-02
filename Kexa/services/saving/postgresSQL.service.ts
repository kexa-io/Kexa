import { Pool, PoolConfig, PoolClient, QueryResult } from 'pg';
import { TableIQuery } from '../../query/tablePg.iquery';
import { CRUDProvidersIQuery } from '../../query/CRUDPostgres/providers.iquery';
import { CRUDOriginIQuery } from '../../query/CRUDPostgres/origins.iquery';
import { CRUDProviderItemsIQuery } from '../../query/CRUDPostgres/providerItems.iquery';
import { CRUDResourcesIQuery } from '../../query/CRUDPostgres/resources.iquery';
import { CRUDLogsIQuery } from '../../query/CRUDPostgres/logs.iquery';
import { getContext, getNewLogger } from "../logger.service";
import { Rules } from '../../models/settingFile/rules.models';
import { Log } from '../../models/settingFile/logs.models';
import { CRUDRulesIQuery } from '../../query/CRUDPostgres/rules.iquery';
import { ResultScan } from '../../models/resultScan.models';
import { CRUDScansIQuery } from '../../query/CRUDPostgres/scans.iquery';
import { jsonStringify } from '../../helpers/jsonStringify';
import { createHash } from 'crypto';

const logger = getNewLogger("pgSQLLogger");

export class PostgreSQLClass {
    private pool!: Pool;
    private nbrConnection: number = 0;

    public constructor() {}

    public initPool(host: string, port:number, user: string, password: string, database: string): void {
        if (!this.pool) {
            const dbConfig: PoolConfig = {
                host,
                user,
                password,
                database,
                port
            };
            this.pool = new Pool(dbConfig);
        }
    }

    public async getConnection(config?: PoolConfig): Promise<PoolClient> {
        if(config){
            this.pool = new Pool(config);
        }
        this.nbrConnection++;
        return this.pool.connect();
    }

    public async createTables(config?: PoolConfig): Promise<boolean> {
        let conn = await this.getConnection(config);
        console.log("CREATE TABLE loop");
        try{
            await Promise.all(Object.values(TableIQuery).map(async (query) => {
                try {
                    return await conn.query(query);
                } catch (error) {
                    console.log(error);
                    return false;
                }
            }))
            this.closeConnection(conn);
            return true;
        }catch(error){
            this.closeConnection(conn);
            return false;
        }
    }

    public async disconnect(force:Boolean=false, timeout: number = 10000): Promise<void> {
        if ((this.pool && this.nbrConnection === 0) || force) {
            const timeoutPromise = new Promise<void>((_, reject) =>
                setTimeout(() => reject(new Error("Disconnect timeout")), timeout)
            );
            try {
                if (this.pool) {
                    await Promise.race([
                        this.pool.end(),
                        timeoutPromise
                    ]);                    
                    logger.info("Successfully disconnected from PostgreSQL");
                } else {
                    logger.debug("Connection pool is already null or does not exist.");
                }
            } catch (e) {
                logger.error("Error in disconnecting from PostgreSQL: ", e);
            }
        } else {
            logger.debug("No need to disconnect: pool not available or connections are active.");
        }
    }

    public async closeConnection(conn: PoolClient): Promise<void> {
        if (conn) {
            this.nbrConnection--;
            await conn.release();
        }
    }

    public async createAndGetProviders(providers: string[]): Promise<{[key:string]: number}> {
        const providerDict: {[key:string]: number} = {};
        await Promise.all(providers.map(async (provider) => {
            let conn = await this.getConnection();
            await conn.query(CRUDProvidersIQuery.Create.One, [provider]);
            this.closeConnection(conn);
        }));
        let conn = await this.getConnection();
        let result: QueryResult = await conn.query(CRUDProvidersIQuery.Read.All);
        this.closeConnection(conn);
        result.rows.forEach((row: any) => {
            providerDict[row.name] = row.id;
        });
        return providerDict;
    }

    public async createAndGetProvider(provider: string): Promise<number> {
        let conn = await this.getConnection();
        await conn.query(CRUDProvidersIQuery.Create.One, [provider]);
        let result: QueryResult = await conn.query(CRUDProvidersIQuery.Read.OneByName, [provider]);
        this.closeConnection(conn);
        return result.rows[0].id;
    }
    
    public async getOneProviderByName(name: string): Promise<any> {
        let conn = await this.getConnection();
        let result: QueryResult = await conn.query(CRUDProvidersIQuery.Read.OneByName, [name]);
        this.closeConnection(conn);
        return result.rows[0];
    }
    
    public async createAndGetOrigin(dataEnvConfig: any): Promise<number> {
        let conn = await this.getConnection();
        await conn.query(CRUDOriginIQuery.Create.One, [dataEnvConfig?.name ?? "Unknown", dataEnvConfig?.description ?? "No description"]);
        let result: QueryResult = await conn.query(CRUDOriginIQuery.Read.OneByName, [dataEnvConfig?.name ?? "Unknown"]);
        this.closeConnection(conn);
        return result.rows[0].id;
    }
    
    public async createAndGetProviderItems(providerId:number, providerItems: string[]): Promise<{[key:string]: number}> {
        const providerItemsDict: {[key:string]: number} = {};
        await Promise.all(providerItems.map(async (item) => {
            let firstItem = await this.getProviderItemsByNameAndProvider(providerId, item);
            providerItemsDict[firstItem.name] = firstItem.id;
        }));
        return providerItemsDict;
    }
    
    public async getProviderItemsByNameAndProvider(providerId: number, name: string): Promise<any> {
        let conn = await this.getConnection();
        let result: QueryResult = await conn.query(CRUDProviderItemsIQuery.Read.OneByNameAndProvider, [name, providerId]);
        if(result.rows.length === 0){
            await conn.query(CRUDProviderItemsIQuery.Create.One, [name, providerId]);
            result = await conn.query(CRUDProviderItemsIQuery.Read.OneByNameAndProvider, [name, providerId]);
        }
        this.closeConnection(conn);
        return result.rows[0];
    }
    
    public async createAndGetResources(resources: any, originId: number, providerItemsId: number): Promise<number[]> {
        let ids = await Promise.all(resources.map(async (resource: any) => {
            return await this.createAndGetResource(resource, originId, providerItemsId);
        }));
        return ids;
    }
    
    public async createAndGetResource(resource: any, originId: number, providerItemsId: number): Promise<number | undefined> {
        try {
            let conn = await this.getConnection();
            let resultExist: QueryResult = await conn.query(CRUDResourcesIQuery.Read.OneByContent, [jsonStringify(resource)]);
            if (resultExist.rows.length > 0) {
                logger.debug("Saving: Resource already exists.");
                this.closeConnection(conn);
                return resultExist.rows[0].id;
            }
            await conn.query(CRUDResourcesIQuery.Create.One, [jsonStringify(resource), originId, providerItemsId]);
            let result: QueryResult = await conn.query(CRUDResourcesIQuery.Read.OneByContent, [jsonStringify(resource)]);
            this.closeConnection(conn);
            return result.rows[0].id;
        } catch (e) {
            logger.debug(e);
        }
    }
    
    public async createAndGetRule(rule: Rules, providerId:number, providerItemId:number): Promise<number> {
        let conn = await this.getConnection();
        await conn.query(CRUDRulesIQuery.Create.One, [rule.name ?? "Unknown", rule.description ?? "No description", rule?.loud ?? 0, rule.level, providerId, providerItemId]);
        let result: QueryResult = await conn.query(CRUDRulesIQuery.Read.OneByName, [rule.name]);
        this.closeConnection(conn);
        return result.rows[0].id;
    }
    
    public async createScan(resultScan: ResultScan, resourceId: number, ruleId: number, batchId: string): Promise<void> {
        let conn = await this.getConnection();
        await conn.query(CRUDScansIQuery.Create.One, [(resultScan.error.length > 0), resourceId, ruleId, batchId]);
        this.closeConnection(conn);
    }

 
    public async createLog(message: string, resourceId: number): Promise<void> {
        const conn = await this.getConnection();
        const messageHash = createHash('sha256').update(message).digest('hex');
        const existingLog = await conn.query(CRUDLogsIQuery.Read.OneByHash, [messageHash]);
        if (existingLog.rows.length > 0) {
            this.closeConnection(conn);
            return;
        }
        const existingLogWithMessage = await conn.query(CRUDLogsIQuery.Read.OneByMessage, [message]);
        if (existingLogWithMessage.rows.length > 0) {
            this.closeConnection(conn);
            return;
        }
        await conn.query(CRUDLogsIQuery.Create.One, [
            resourceId,
            new Date(),
            message,
            messageHash
        ]);
        this.closeConnection(conn);
    }

    public async getLog(id: number): Promise<void> {
        const conn = await this.getConnection();
        const result = await conn.query(CRUDLogsIQuery.Read.One, [id]);
        this.closeConnection(conn);
        return result.rows[0];
    }

    public async getLogs(params: {
        resourceId?: number,
        startDate?: Date,
        endDate?: Date,
        limit?: number,
        offset?: number
    }): Promise<Log[]> {
        const conn = await this.getConnection();
        const result = await conn.query(CRUDLogsIQuery.Read.All, [
            params.resourceId || null,
            params.startDate || null,
            params.endDate || null,
            params.limit || 100,
            params.offset || 0
        ]);
        this.closeConnection(conn);
        return result.rows;
    }

    public async deleteLog(id: number): Promise<void> {
        const conn = await this.getConnection();
        await conn.query(CRUDLogsIQuery.Delete.One, [id]);
        this.closeConnection(conn);
    }
    
}
