import { Pool, PoolConfig, PoolClient, QueryResult } from 'pg';
import { TableIQuery } from '../../query/tablePg.iquery';
import { CRUDProvidersIQuery } from '../../query/CRUDPostgres/providers.iquery';
import { CRUDOriginIQuery } from '../../query/CRUDPostgres/origins.iquery';
import { CRUDProviderItemsIQuery } from '../../query/CRUDPostgres/providerItems.iquery';
import { CRUDResourcesIQuery } from '../../query/CRUDPostgres/resources.iquery';
import { getContext, getNewLogger } from "../logger.service";
import { Rules } from '../../models/settingFile/rules.models';
import { CRUDRulesIQuery } from '../../query/CRUDPostgres/rules.iquery';
import { ResultScan } from '../../models/resultScan.models';
import { CRUDScansIQuery } from '../../query/CRUDPostgres/scans.iquery';
import { jsonStringify } from '../../helpers/jsonStringify';

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
        try{
            await Promise.all(Object.values(TableIQuery).map(async (query) => {
                try {
                    return await conn.query(query);
                } catch (error) {
                    console.error("Error in EEE: " + error);
                    return false;
                }
            }))
            return true;
        }catch(error){
            console.error("Error in creating table IN: " + error);
            this.closeConnection(conn);
            return false;
        }
        this.closeConnection(conn);
    }

    public async disconnect(force:Boolean=false): Promise<void> {
        logger.debug("Number of connection: " + this.nbrConnection);
        if ((this.pool && this.nbrConnection === 0) || force) {
            logger.debug("Disconnecting from PostgreSQL");
            await this.pool?.end();
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
        console.log("BEFOOOOOOOOOOORE");
        let result: QueryResult = await conn.query(CRUDProviderItemsIQuery.Read.OneByNameAndProvider, [name, providerId]);
        console.log("DOOOOOOOOOOOOOOOOOONE");
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
    
    public async createAndGetResource(resource: any, originId: number, providerItemsId: number): Promise<number> {
        let conn = await this.getConnection();
        await conn.query(CRUDResourcesIQuery.Create.One, [jsonStringify(resource), originId, providerItemsId]);
        let result: QueryResult = await conn.query(CRUDResourcesIQuery.Read.OneByContent, [jsonStringify(resource)]);
        this.closeConnection(conn);
        return result.rows[0].id;
    }
    
    public async createAndGetRule(rule: Rules, providerId:number, providerItemId:number): Promise<number> {
        let conn = await this.getConnection();
        await conn.query(CRUDRulesIQuery.Create.One, [rule.name ?? "Unknown", rule.description ?? "No description", rule?.loud ?? 0, rule.level, providerId, providerItemId]);
        let result: QueryResult = await conn.query(CRUDRulesIQuery.Read.OneByName, [rule.name]);
        this.closeConnection(conn);
        return result.rows[0].id;
    }
    
    public async createScan(resultScan: ResultScan, resourceId: number, ruleId: number): Promise<void> {
        let conn = await this.getConnection();
        await conn.query(CRUDScansIQuery.Create.One, [(resultScan.error.length > 0), resourceId, ruleId]);
        this.closeConnection(conn);
    }
}
