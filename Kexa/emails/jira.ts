const levelAlert = ["info", "warning", "error", "fatal"];

import { propertyToSend, renderTableAllScan, renderTableAllScanLoud } from "../services/display.service";
import { getConfigOrEnvVar } from "../services/manageVarEnvironnement.service";

export const Jira = {
    OneJira: ({ projectKey, summary, issueType, alertLevelEmoji, objectResource, content, assigneeId, rule }: any) => {
        const fields: any = {
            project: {
                key: projectKey,
            },
            summary: alertLevelEmoji ? `${alertLevelEmoji} ${summary}` : summary,
            description: {
                type: "doc",
                version: 1,
                content: [],
            },
            issuetype: {
                id: issueType,
            },
        };

        if (assigneeId) {
            fields.assignee = {
                id: assigneeId,
            };
        }

        const descriptionContent = fields.description.content;

        for (let i = 0; i < content.content.length; i++) {
            const ruleContent = {
                type: "heading",
                attrs: { level: 1 },
                content: [
                    {
                        text: propertyToSend(rule, objectResource, true),
                        type: "text",
                    },
                ],
            };

            descriptionContent.push(ruleContent);

            if (content.content[i].result.length > 0) {
                for (let j = 0; j < content.content[i].result.length; j++) {
                    const resultContent = {
                        type: "paragraph",
                        content: [
                            {
                                text: `${content.content[i].result[j].error.length}`,
                                type: "text",
                            },
                        ],
                    };

                    descriptionContent.push(resultContent);
                }
            }
        }

        const finalContent = {
            fields,
        };

        return JSON.stringify(finalContent);
    },

    GlobalJira: ({ projectKey, summary, issueType, alertLevelEmoji, content, assigneeId, rule }: any) => {
        const fields: any = {
            project: {
                key: projectKey,
            },
            summary: alertLevelEmoji ? `${alertLevelEmoji} ${summary}` : summary,
            description: {
                type: "doc",
                version: 1,
                content: [],
            },
            issuetype: {
                id: issueType,
            },
        };

        if (assigneeId) {
            fields.assignee = {
                id: assigneeId,
            };
        }

        const descriptionContent = fields.description.content;

        for (let i = 0; i < content.content.length; i++) {
            const alertLevelEmojiItem = (content.content[i].rule.level == 0) ? "ⓘ info: " : (content.content[i].rule.level == 1) ? "⚠️ warning: " : (content.content[i].rule.level == 2) ? "❗error: " : "❌ fatal: ";
            const ruleContent = {
                type: "heading",
                attrs: { level: 1 },
                content: [
                    {
                        text: `${alertLevelEmojiItem}${content.content[i].rule.name}`,
                        type: "text",
                    },
                ],
            };

            descriptionContent.push(ruleContent);

            for (let j = 0; j < content.content[i].result.length; j++) {
                const resultContent = {
                    type: "paragraph",
                    content: [
                        {
                            text: propertyToSend(content.content[i].rule, content.content[i].result[j].objectContent, false),
                            type: "text",
                        },
                    ],
                };

                descriptionContent.push(resultContent);
            }
        }

        const finalContent = {
            fields,
        };
        return JSON.stringify(finalContent);
    },
};
