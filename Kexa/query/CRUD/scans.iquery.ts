export const CRUDScansIQuery = {
    Create: {
        One: `
            INSERT INTO Scans (error, resourceId, ruleId, batchId)
            VALUES (?, ?, ?, ?)
        `
    },
    Read: {
        One: `
            SELECT * FROM Scans
            WHERE ID = ?
        `,        
        All: `
            SELECT * FROM Scans
        `
    },
    Delete: {
        One: `
            DELETE FROM Scans
            WHERE ID = ?
        `
    }
};