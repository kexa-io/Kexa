# Jira

<div align="center">
    <a href="https://www.kexa.io/modules">
        <img src="../../images/jira-logo.png" alt="Logo" width="200">
    </a>

  <p align="center">
    <br />
    <a href="https://github.com/kexa-io/Kexa/issues">Report Bug</a>
    ·
    <a href="https://github.com/kexa-io/Kexa/issues">Request Feature</a>
  </p>
</div>

By setting up 'Jira' notifications, you will receive alerts as issues in a desired Kanban, this will allow you to track and manage your optimization, security or compliance problems.

## Requirements

To add Jira notifications, you will need to follow the steps below to set up the notifications. Start by creating a new Kanban project in Jira, and get your Jira API key : [Manage API tokens for your Atlassian account | Atlassian Support](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/)

> [!WARNING]
> Jira API has a rate limit, so you need to space out the time between scans. See your Jira API rate limit to avoid errors when retrieving the Jira tickets.
>
> To avoid this, you can choose to only be notified of Errors & Fatals for example, and the rest in Global. That will reduce the number of generated issues.

You will also need the following elements (all are mandatory):

- Jira project ID
- Jira domain
- Jira issue type ID
- Jira done status ID

And optionally:

- Jira assignee id

To get those you'll first need your Kanban project.

Jira project ID is what you see in parentheses when looking at your project name in the project list.

![Screenshot of Jira Project ID](../../images/jira_projectid.png)

Jira domain is found in your URL when you’re in your Jira project. (ex : `yourname.atlassian.net`)

To find the Jira issue type, go to `parameter -> issues -> issue types`. Then, when modifying an issue type, you will see the issue type id in the URL:

![Jira Issue Type ID](../../images/issue_typeid.png)

Here it is `10000` for the issue type ID we want to use.

Now, to find your jira ‘done’ status. It is mandatory to avoid spamming the API.

Type your jira domain in the URL of a web browser followed by `rest/api/2/status`, and you will get the list of status in your project. (ex : `https://yourname.atlassian.net/rest/api/2/status`)

Find the one corresponding to the done status and save the id.

## Configuration

Now, set up the following variable in your environment :

```bash
JIRA_API_KEY='xxxxx@xxxx:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
JIRA_DONE_STATUS='XXXXX'
JIRA_PROJECT_KEY='XXX'
JIRA_DOMAIN='xxxxxxxxxxxx.atlassian.net'
```

Last thing to do is in your rule file, in the notification section, set Jira with the issue type, and if you want, an assignee id.

![Screenshot Rule Config Jira](../../images/ruleconfigjira.png)

You're ready !

## Expected results

Here is an example of a Kanban, additionally, by clicking on a alert, you will see all the resource informations for remediation.

![Screenshot Jira Results](../../images/jiraresults.png)

Here is what you got by clicking on a Global Alert:
![Screenshot Jira Results Global Alert](../../images/jiraresults_details_multiple.png)

And on a Single Alert:
![Screenshot Jira Results Single Alert](../../images/jiraresults_details_one.png)
