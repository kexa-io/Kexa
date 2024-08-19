export const CRUDProviderItemsIQuery = {
    Create: {
        One: `
            INSERT INTO ProviderItems (name, providerId) 
            VALUES ($1, $2) 
            ON CONFLICT (name, providerId) DO NOTHING
        `
    },
    Read: {
        One: `
            SELECT * FROM ProviderItems WHERE ID = $1
        `,
        ByName: `
            SELECT * FROM ProviderItems WHERE name = $1
        `,
        OneByNameAndProvider: `
            SELECT * FROM ProviderItems WHERE name = $1 AND providerId = $2
        `,
        ByProvider: `
            SELECT * FROM ProviderItems WHERE providerId = $1
        `,
        All: `
            SELECT * FROM ProviderItems
        `
    },
    Delete: {
        One: `
            DELETE FROM ProviderItems WHERE ID = $1
        `,
        OneByName: `
            DELETE FROM ProviderItems WHERE name = $1
        `
    }
}