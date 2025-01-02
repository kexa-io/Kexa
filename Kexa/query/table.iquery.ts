export const TableIQuery = {
    Tags: `
        CREATE TABLE IF NOT EXISTS Tags (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            value TEXT
        )
    `,
    Providers: `
        CREATE TABLE IF NOT EXISTS Providers (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL
        )
    `,
    ProviderItems: `
        CREATE TABLE IF NOT EXISTS ProviderItems (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            providerId INT,
            FOREIGN KEY (providerId) REFERENCES Providers(ID)
        )
    `,
    Origins: `
        CREATE TABLE IF NOT EXISTS Origins (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            description TEXT
        )
    `,
    Resources: `
        CREATE TABLE IF NOT EXISTS Resources (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            originId INT,
            providerItemId INT,
            FOREIGN KEY (originId) REFERENCES Origins(ID),
            FOREIGN KEY (providerItemId) REFERENCES ProviderItems(ID)
        );
    `,
    Rules: `
        CREATE TABLE IF NOT EXISTS Rules (
            ID INT AUTO_INCREMENT PRIMARY KEY,
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
            ID INT AUTO_INCREMENT PRIMARY KEY,
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
            ID INT AUTO_INCREMENT PRIMARY KEY,
            tagId INT,
            scanId INT,
            FOREIGN KEY (tagId) REFERENCES Tags(ID),
            FOREIGN KEY (scanId) REFERENCES Scans(ID)
        )
    `,
    TagsInResources: `
        CREATE TABLE IF NOT EXISTS TagsInResources (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            tagId INT,
            resourceId INT,
            FOREIGN KEY (tagId) REFERENCES Tags(ID),
            FOREIGN KEY (resourceId) REFERENCES Resources(ID)
        )
    `,
    Logs: `
        CREATE TABLE IF NOT EXISTS Logs (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            resourceId INT,
            timestamp DATETIME NOT NULL,
            message TEXT NOT NULL,
            message_hash VARCHAR(64) UNIQUE NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (resourceId) REFERENCES Resources(ID)
        );

        CREATE INDEX idx_logs_timestamp ON Logs(timestamp);
        CREATE INDEX idx_logs_resource_id ON Logs(resourceId);
    `
}