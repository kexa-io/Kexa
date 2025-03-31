export const CRUDLogsIQuery = {
    Create: {
        One: `
            INSERT INTO Logs (resourceId, timestamp, message, message_hash)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (message_hash) DO NOTHING
            RETURNING ID
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
            WHERE l.ID = $1
        `,
        OneByHash: `
            SELECT 
                l.ID,
                l.timestamp,
                l.message,
                r.content as resource_metadata
            FROM Logs l
            JOIN Resources r ON l.resourceId = r.ID
            WHERE l.message_hash = $1
        `,
        OneByHashAndResource: `
            SELECT 
                l.ID,
                l.timestamp,
                l.message,
                r.content as resource_metadata
            FROM Logs l
            JOIN Resources r ON l.resourceId = r.ID
            WHERE l.message_hash = $1
            AND l.resourceId = $2
        `,
        OneByMessage: `
            SELECT 
                l.ID,
                l.timestamp,
                l.message,
                r.content as resource_metadata
            FROM Logs l
            JOIN Resources r ON l.resourceId = r.ID
            WHERE l.message = $1
        `,
        All: `
            SELECT
                l.ID,
                l.timestamp,
                l.message,
                r.content as resource_metadata,
                array_agg(json_build_object('name', t.name, 'value', t.value)) as tags
            FROM Logs l
            JOIN Resources r ON l.resourceId = r.ID
            LEFT JOIN TagsInResources tr ON r.ID = tr.resourceId
            LEFT JOIN Tags t ON tr.tagId = t.ID
            WHERE ($1::int IS NULL OR l.resourceId = $1)
            AND ($2::timestamp IS NULL OR l.timestamp >= $2)
            AND ($3::timestamp IS NULL OR l.timestamp <= $3)
            GROUP BY l.ID, l.timestamp, l.message, r.content
            ORDER BY l.timestamp DESC
            LIMIT $4 OFFSET $5
        `
    },
    Delete: {
        One: `
            DELETE FROM Logs
            WHERE ID = $1
            RETURNING ID
        `
    }
};