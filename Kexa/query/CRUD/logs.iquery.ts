export const CRUDLogsIQuery = {
    Create: {
        One: `
            INSERT INTO Logs (resourceId, timestamp, message, message_hash)
            VALUES (?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE ID = ID
        `
    },
    Read: {
        One: `
            SELECT 
                l.ID,
                l.timestamp,
                l.message,
                r.content as resource_metadata
            FROM Logs l
            JOIN Resources r ON l.resourceId = r.ID
            WHERE l.ID = ?
        `,
        OneByHash: `
            SELECT 
                l.ID,
                l.timestamp,
                l.message,
                r.content as resource_metadata
            FROM Logs l
            JOIN Resources r ON l.resourceId = r.ID
            WHERE l.message_hash = ?;
        `,
        OneByHashAndResource: `
            SELECT 
                l.ID,
                l.timestamp,
                l.message,
                r.content as resource_metadata
            FROM Logs l
            JOIN Resources r ON l.resourceId = r.ID
            WHERE l.message_hash = ?
            AND l.resourceId = ?;
        `,
        OneByMessage: `
            SELECT 
                l.ID,
                l.timestamp,
                l.message,
                r.content as resource_metadata
            FROM Logs l
            JOIN Resources r ON l.resourceId = r.ID
            WHERE l.message = ?;
        `,
        All: `
            SELECT 
                l.ID,
                l.timestamp,
                l.message,
                r.content as resource_metadata,
                JSON_ARRAYAGG(JSON_OBJECT('name', t.name, 'value', t.value)) as tags
            FROM Logs l
            JOIN Resources r ON l.resourceId = r.ID
            LEFT JOIN TagsInResources tr ON r.ID = tr.resourceId
            LEFT JOIN Tags t ON tr.tagId = t.ID
            WHERE (? IS NULL OR l.resourceId = ?)
            AND (? IS NULL OR l.timestamp >= ?)
            AND (? IS NULL OR l.timestamp <= ?)
            GROUP BY l.ID, l.timestamp, l.message, r.content
            ORDER BY l.timestamp DESC
            LIMIT ? OFFSET ?
        `
    },
    Delete: {
        One: `
            DELETE FROM Logs
            WHERE ID = ?
            RETURNING ID
        `
    }
};
