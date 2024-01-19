export const CRUDRulesIQuery = {
    Create: {
        One: `
            INSERT INTO Rules (name, description, loud, level, providerId, providerItemId)
            VALUES (?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                description = VALUES(description),
                loud = VALUES(loud),
                level = VALUES(level),
                providerId = VALUES(providerId),
                providerItemId = VALUES(providerItemId)
        `,
        Many: `
            INSERT INTO Rules (name, description, applied, loud, level, providerId, providerItemId)
            VALUES ?
        `
    },
    Read: {
        One: `
            SELECT * FROM Rules
            WHERE ID = ?
        `,
        OneByName: `
            SELECT * FROM Rules
            WHERE name = ?
        `,
        All: `
            SELECT * FROM Rules
        `
    },
    Update: {
        One: `
            UPDATE Rules
            SET name = ?, description = ?, applied = ?, loud = ?, level = ?, providerId = ?, providerItemId = ?
            WHERE ID = ?
        `
    },
    Delete: {
        One: `
            DELETE FROM Rules
            WHERE ID = ?
        `
    }
};