export const CRUDResourcesIQuery = {
    Create: {
        One: `
                INSERT INTO Resources (content, originId, providerItemId) 
                VALUES ($1, $2, $3) 
                ON CONFLICT DO NOTHING;
            `
    },
    Read: {
        One: `
            SELECT * FROM Resources WHERE ID = $1
        `,
        OneByContent: `
            SELECT * FROM Resources WHERE content = $1
        `,
        ByOrigin: `
            SELECT * FROM Resources WHERE originId = $1
        `,
        All: `
            SELECT * FROM Resources
        `
    },
    Delete: {
        One: `
            DELETE FROM Resources WHERE ID = $1
        `,
        OneByContent: `
            DELETE FROM Resources WHERE content = $1
        `
    }
};