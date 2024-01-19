export const CRUDProviderItemsIQuery = {
    Create: {
        One: `
            INSERT IGNORE INTO ProviderItems (name, providerId) VALUES (?, ?)
        `
    },
    Read: {
        One: `
            SELECT * FROM ProviderItems WHERE ID = ?
        `,
        ByName: `
            SELECT * FROM ProviderItems WHERE name = ?
        `,
        OneByNameAndProvider: `
            SELECT * FROM ProviderItems WHERE name = ? AND providerId = ?
        `,
        ByProvider: `
            SELECT * FROM ProviderItems WHERE providerId = ?
        `,
        All: `
            SELECT * FROM ProviderItems
        `
    },
    Delete: {
        One: `
            DELETE FROM ProviderItems WHERE ID = ?
        `,
        OneByName: `
            DELETE FROM ProviderItems WHERE name = ?
        `
    }
}