export const CRUDOriginIQuery = {
    Create: {
        One: `
                INSERT INTO Origins (name, description) 
                VALUES ($1, $2) 
                ON CONFLICT (name) DO NOTHING;
            `
    },
    Read: {
        One: `
            SELECT * FROM Origins WHERE ID = $1
        `,
        OneByName: `
            SELECT * FROM Origins WHERE name = $1
        `,
        OneByNameAndDescription: `
            SELECT * FROM Origins WHERE name = $1 AND description = $2
        `,
        All: `
            SELECT * FROM Origins
        `
    },
    Delete: {
        One: `
            DELETE FROM Origins WHERE ID = $1
        `,
        OneByName: `
            DELETE FROM Origins WHERE name = $1
        `
    }
}