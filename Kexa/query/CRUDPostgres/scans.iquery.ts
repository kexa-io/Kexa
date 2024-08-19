export const CRUDScansIQuery = {
    Create: {
        One: `
            INSERT INTO Scans (error, resourceId, ruleId)
            VALUES ($1, $2, $3)
        `
    },
    Read: {
        One: `
            SELECT * FROM Scans
            WHERE ID = $1
        `,        
        All: `
            SELECT * FROM Scans
        `
    },
    Delete: {
        One: `
            DELETE FROM Scans
            WHERE ID = $1
        `
    }
};