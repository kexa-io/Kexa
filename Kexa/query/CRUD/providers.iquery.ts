export const CRUDProvidersIQuery = {
    Create: {
        One: `
            INSERT IGNORE INTO Providers (name) VALUES (?)
        `
    },
    Read: {
        One: `
            SELECT * FROM Providers WHERE ID = ?
        `,
        OneByName: `
            SELECT * FROM Providers WHERE name = ?
        `,
        All: `
            SELECT * FROM Providers
        `
    },
    Delete: {
        One: `
            DELETE FROM Providers WHERE ID = ?
        `,
        OneByName: `
            DELETE FROM Providers WHERE name = ?
        `
    }
}