# Kexa ROADMAP

## Engine

- [X] AddOn logical
- [X] Feedback on used rules
- [X] Use only required addOn present in rules
- [X] Cross-platform logger
- [X] External key manager
    - [X] Azure key vault
    - [X] AWS secret manager
    - [X] Hashicorp vault
    - [ ] Google secret manager
    - [ ] Bitwarden
- [X] External rules importation
- [X] Github action with docker 

## Providers

- [X] Azure
    - [X] Custom display for specific resources
    - [X] Auto gathering all item in
- [X] AWS
    - [X] Custom display for specific resources
    - [X] Auto gathering all item in
- [X] GCP
    - [X] Custom display for specific resources
    - [X] Collect all main used item
    - [ ] Auto gathering all item in
- [X] Github
    - [X] Custom display for specific resources
    - [X] Collect all main used item
- [X] Kubernetes
    - [X] Custom display for specific resources
    - [X] Collect all main used item
    - [ ] Auto gathering all item in
- [X] Helm
    - [X] Custom display for specific resources
    - [X] Collect all main used item
- [X] All endPoint http(s)
    - [X] Custom display for specific resources
    - [X] Collect all main used item
- [X] Google workspace
    - [X] Custom display for specific resources
    - [X] Collect all main used item
- [X] O365
    - [X] Custom display for specific resources
    - [X] Collect all meaning item
- [ ] Gitlab
    - [ ] Collect all meaning item
- [ ] OVH
    - [ ] Collect all meaning item
- [X] Database
	- [X] PostgreSQL
        - [X] Collect all meaning item
        - [X] CIS security rules
	- [X] MySQL/MariaDB
        - [X] Collect all meaning item
        - [X] CIS security rules
	- [X] Oracle
        - [X] Collect all meaning item
        - [X] CIS security rules
	- [X] MongoDB
        - [X] Collect all meaning item
        - [X] CIS security rules
- [X] SSH
    - [X] Collect system configuration
    - [X] CIS security rules

## Output

- Notification
    - [X] For each non-compliant resource
        - [X] Email
        - [X] SMS
        - [X] Teams
        - [X] webhook
        - [X] Jira
        - [X] Slack
    - [X] For each set of rules
        - [X] Email
        - [X] SMS
        - [X] Teams
        - [X] webhook
        - [X] Jira
        - [X] Slack
- Export data scanned
    - [X] Azure blob storage
    - [X] Mongo DB
    - [X] MySQL
    - [X] Amazon Simple Storage Service (S3)
    - [X] Cloud Storage (GCP)
-  Save result of scan
    - [X] Azure blob storage
    - [X] Mongo DB
    - [X] MySQL
    - [X] Postgres
    - [X] Amazon Simple Storage Service (S3)
    - [X] Cloud Storage (GCP)

## Maintenance

- [X] Auto Update
    - [X] Linux
    - [X] Windows

## Rules

- [X] Set of rules for each of our provider: daily use
- [ ] CIS Benchmarks
    - [X] Azure
    - [X] AWS
    - [X] O365
    - [X] Google workspace
    - [X] HTTP
    - [ ] Github
    - [ ] GCP
    - [ ] Kubernetes

## Tiers

- [ ] SaaS
    - [X] rules catalog
        - [X] API
        - [X] Web site
    - [X] history and graphics
    - [ ] graphic rule editor
- [ ] AddOn Grafana
- [ ] Kubernetes Operator

See the [open issues](https://github.com/kexa-io/Kexa) for a full list of proposed features (and known issues).
