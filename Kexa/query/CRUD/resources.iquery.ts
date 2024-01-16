export const CRUDResourcesIQuery = {
    Create: {
        One: `
            INSERT IGNORE INTO Resources (content, originId, providerItemId) VALUES (?, ?, ?)
        `
    },
    Read: {
        One: `
            SELECT * FROM Resources WHERE ID = ?
        `,
        OneByContent: `
            SELECT * FROM Resources WHERE content = ?
        `,
        ByOrigin: `
            SELECT * FROM Resources WHERE originId = ?
        `,
        All: `
            SELECT * FROM Resources
        `
    },
    Delete: {
        One: `
            DELETE FROM Resources WHERE ID = ?
        `,
        OneByContent: `
            DELETE FROM Resources WHERE content = ?
        `
    }
};