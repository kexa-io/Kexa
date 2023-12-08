const levelAlert = ["info", "warning", "error", "fatal"];
export const Teams = {
    //https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/connectors-using?tabs=cURL
    OneTeams: (color:string, subject:string, url:string, description:string) => {
        return JSON.stringify({
            "@type": "MessageCard",
            "@context": "http://schema.org/extensions",
            "themeColor": color,
            "summary": subject,
            "sections": [
                {
                    "activityTitle": subject,
                    "activitySubtitle": description,
                    "activityImage": "https://kexa.io/kexa-no-background-color.png",
                    "markdown": true
                }
            ],
            "potentialAction": [
                {
                    "@type": "OpenUri",
                    "name": "Go to ressource",
                    "targets": [
                        {
                            "os": "default",
                            "uri": url
                        }
                    ]
                }
            ]
        });
    },
    GlobalTeams: (color:string, subject:string, text:string, errors:{ [x: string]: number; }) => {
        return JSON.stringify({
            "@type": "MessageCard",
            "@context": "http://schema.org/extensions",
            "themeColor": color,
            "summary": subject,
            "sections": [
                {
                    "activityTitle": subject,
                    "activitySubtitle": "Kexa by 4urcloud",
                    "activityImage": "https://kexa.io/kexa-no-background-color.png",
                    "text": text,
                    "facts": Object.entries(errors).map(([name, value]) => {
                        return {
                            "name": name,
                            "value": value.toString()
                        };
                    }),
                    "markdown": true
                }
            ]
        });
    },
};