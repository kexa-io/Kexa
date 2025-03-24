export const TableIQuery = {
    Tags: `
        CREATE TABLE IF NOT EXISTS Tags (
            ID SERIAL PRIMARY KEY,
            name VARCHAR(255),
            value TEXT
        )
    `,
    Providers: `
        CREATE TABLE IF NOT EXISTS Providers (
            ID SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL
        )
    `,
    ProviderItems: `
        CREATE TABLE IF NOT EXISTS ProviderItems (
            ID SERIAL PRIMARY KEY,
            name VARCHAR(255),
            providerId INT,
            FOREIGN KEY (providerId) REFERENCES Providers(ID),
            UNIQUE (name, providerId)
        )
    `,
    Origins: `
        CREATE TABLE IF NOT EXISTS Origins (
            ID SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            description TEXT
        )
    `,
    Resources: `
        CREATE TABLE IF NOT EXISTS Resources (
            ID SERIAL PRIMARY KEY,
            content JSONB NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            originId INT,
            providerItemId INT,
            FOREIGN KEY (originId) REFERENCES Origins(ID),
            FOREIGN KEY (providerItemId) REFERENCES ProviderItems(ID)
        );
    `,
    Rules: `
        CREATE TABLE IF NOT EXISTS Rules (
            ID SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            description TEXT,
            loud BOOLEAN,
            level INT,
            providerId INT,
            providerItemId INT,
            FOREIGN KEY (providerId) REFERENCES Providers(ID),
            FOREIGN KEY (providerItemId) REFERENCES ProviderItems(ID)
        )
    `,
    Scans: `
        CREATE TABLE IF NOT EXISTS Scans (
            ID SERIAL PRIMARY KEY,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            error boolean,
            resourceId INT,
            ruleId INT,
            batchId VARCHAR(255),
            FOREIGN KEY (resourceId) REFERENCES Resources(ID),
            FOREIGN KEY (ruleId) REFERENCES Rules(ID)
        )
    `,
    TagsInScans: `
        CREATE TABLE IF NOT EXISTS TagsInScans (
            ID SERIAL PRIMARY KEY,
            tagId INT,
            scanId INT,
            FOREIGN KEY (tagId) REFERENCES Tags(ID),
            FOREIGN KEY (scanId) REFERENCES Scans(ID)
        )
    `,
    TagsInResources: `
        CREATE TABLE IF NOT EXISTS TagsInResources (
            ID SERIAL PRIMARY KEY,
            tagId INT,
            resourceId INT,
            FOREIGN KEY (tagId) REFERENCES Tags(ID),
            FOREIGN KEY (resourceId) REFERENCES Resources(ID)
        )
    `,
}