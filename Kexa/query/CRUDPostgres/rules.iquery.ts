export const CRUDRulesIQuery = {
    Create: {
        One: `
                INSERT INTO Rules (name, description, loud, level, providerId, providerItemId)
                VALUES ($1, $2, $3, $4, $5, $6)
                ON CONFLICT (name) DO UPDATE SET
                    description = EXCLUDED.description,
                    loud = EXCLUDED.loud,
                    level = EXCLUDED.level,
                    providerId = EXCLUDED.providerId,
                    providerItemId = EXCLUDED.providerItemId;
        `,
        Many: `
            INSERT INTO Rules (name, description, applied, loud, level, providerId, providerItemId)
            VALUES ?
        `
    },
    Read: {
        One: `
            SELECT * FROM Rules
            WHERE ID = $1
        `,
        OneByName: `
            SELECT * FROM Rules
            WHERE name = $1
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