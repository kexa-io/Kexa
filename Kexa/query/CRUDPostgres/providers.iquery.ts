export const CRUDProvidersIQuery = {
    Create: {
        One: `
            INSERT INTO Providers (name) VALUES ($1) ON CONFLICT (name) DO NOTHING;
        `
    },
    Read: {
        One: `
            SELECT * FROM Providers WHERE ID = $1
        `,
        OneByName: `
            SELECT * FROM Providers WHERE name = $1
        `,
        All: `
            SELECT * FROM Providers
        `
    },
    Delete: {
        One: `
            DELETE FROM Providers WHERE ID = $1
        `,
        OneByName: `
            DELETE FROM Providers WHERE name = $1
        `
    }
}