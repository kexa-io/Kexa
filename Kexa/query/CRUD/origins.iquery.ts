export const CRUDOriginIQuery = {
    Create: {
        One: `
            INSERT IGNORE INTO Origins (name, description) VALUES (?, ?)
        `
    },
    Read: {
        One: `
            SELECT * FROM Origins WHERE ID = ?
        `,
        OneByName: `
            SELECT * FROM Origins WHERE name = ?
        `,
        OneByNameAndDescription: `
            SELECT * FROM Origins WHERE name = ? AND description = ?
        `,
        All: `
            SELECT * FROM Origins
        `
    },
    Delete: {
        One: `
            DELETE FROM Origins WHERE ID = ?
        `,
        OneByName: `
            DELETE FROM Origins WHERE name = ?
        `
    }
}