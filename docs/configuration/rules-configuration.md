# Rules Configuration

Rules are defined in YAML files and specify what Kexa should check in your infrastructure. This document explains how to create and configure rules.

## Basic Rule Structure

Here's a basic example of a rule:

```yaml
- name: "azure-disk-orphan"
  description: "Check for orphaned disks"
  applied: true
  level: 1  # warn
  cloudProvider: azure
  objectName: disk
  conditions:
    - property: diskState
      condition: DIFFERENT
      value: Unattached
```

## Rule Fields

### Required Fields

- `name`: Unique identifier for the rule
- `description`: Description of what the rule checks
- `applied`: Whether the rule is active
- `level`: Severity level (0: info, 1: warn, 2: error, 3: fatal)
- `cloudProvider`: Provider to check (azure, aws, gcp, etc.)
- `objectName`: Type of resource to check
- `conditions`: List of conditions to check

### Conditions

Conditions are the core comparison operators used to evaluate resources in your infrastructure. Each condition consists of three main components:

- `property`: The field or attribute of the resource to check
- `condition`: The comparison operator to use
- `value`: The value to compare against

#### Available Conditions

1. **Basic Comparisons**:
   - `EQUAL`: Checks if the property exactly matches the value
   - `DIFFERENT`: Checks if the property is not equal to the value
   - `CONTAINS`: Checks if the property contains the specified value
   - `NOT_CONTAINS`: Checks if the property does not contain the value

2. **Numeric Comparisons**:
   - `SUP`: Greater than
   - `INF`: Less than
   - `SUP_OR_EQUAL`: Greater than or equal to
   - `INF_OR_EQUAL`: Less than or equal to

3. **Date & Time Comparisons**:
   - `DATE_EQUAL`: Exact date match
   - `DATE_SUP`: Date is after
   - `DATE_INF`: Date is before
   - `DATE_SUP_OR_EQUAL`: Date is on or after
   - `DATE_INF_OR_EQUAL`: Date is on or before
   - `INTERVAL`: Checks if within a time interval
   - `DATE_INTERVAL`: Checks if within a date range

#### Example Usage

```yaml
conditions:
  # Basic comparison
  - property: diskState
    condition: DIFFERENT
    value: Unattached

  # Numeric comparison
  - property: size
    condition: SUP
    value: 100

  # Date comparison
  - property: lastModified
    condition: DATE_SUP
    value: "2024-01-01T00:00:00.000Z"
```

#### Logical Operators

Conditions can be combined using logical operators:

- `AND`: All conditions must be true
- `OR`: At least one condition must be true
- `NOT`: Inverts the result of a condition

Example with logical operators:

```yaml
conditions:
  - operator: OR
    criteria:
      - property: networkAccessPolicy
        condition: DIFFERENT
        value: AllowAll
      - property: encryption.type
        condition: EQUAL
        value: EncryptionAtRestWithPlatformKey
```

## Date & Time Criteria

You can set up date and time comparisons:

```yaml
property: string
condition: (
  DATE_EQUAL |
  DATE_SUP |
  DATE_INF |
  DATE_SUP_OR_EQUAL |
  DATE_INF_OR_EQUAL |
  INTERVAL |
  DATE_INTERVAL
)
value: 0 0 0 0 0 0 # datetime comparison
date: "YYYY-MM-DDThh:mm:ss.SSSZ" # the datetime format used in the property
```

## Notifications

Configure notifications at the top of your rules file:

```yaml
alert:
  info:
    enabled: true
    type:
      - email
      - teams
    to:
      - admin@example.com
      - https://webhook.example.com
  warn:
    enabled: true
    type:
      - email
    to:
      - admin@example.com
  error:
    enabled: true
    type:
      - email
      - sms
    to:
      - admin@example.com
      - +1234567890
  fatal:
    enabled: true
    type:
      - email
      - sms
      - teams
    to:
      - admin@example.com
      - +1234567890
      - https://webhook.example.com
  global:
    enabled: true
    type:
      - email
    to:
      - admin@example.com
    conditions:
      - level: 0
        min: 1
      - level: 1
        min: 1
      - level: 2
        min: 1
      - level: 3
        min: 1
```

To know more about notifications possibilities, refer to [Notifications Addons Documentation](../notifications/README.md)

## Variabilization

To simplify maintenance, it is possible to variabilize rules either for values or for complete blocks of the YAML file.

The main advantage of setting up a remote repo for your instances is that you can manage and administer general rules for all your productions.

### Initialization

Initializing a value or block variable is done in the same way.

At the same indentation level as version or date, insert the name of your variable, a colon then an ampersand, followed by the name of your variable again.

We follow the yaml syntax as much as possible. In our example "name" :

```yaml
name: &name
```

### Use

The use of a variable can vary, depending on whether you want to use it as a value or as a block.

- Use as a value:
  You can insert the name of your variable preceded by an asterisk, anywhere you'd put a conventional value. It's can be usefull to check element like name or quantity

  ```yaml
  - version: 1.0.0
    date: 12-12-2024
    name: &name
    ...
    rules:
      - name: "Generalize-test" 
        description : generic test for a project test if X exist 
        applied: true 
        level: 1 
        cloudProvider: XXXX 
        objectName : YYYY
        conditions:
          - property : name
            condition : EQUAL
            value : *name
  ```

- Use as a block:
  You can insert the name of your variable preceded by "<<: *", anywhere you'd put a key.
  In this example, we variabilize the `applied` and `level` sections to define groups and their level of importance.
  Another possible example is the notifications section, to variabilize the recipients.

  ```yaml
  - version: 1.0.0
    date: 12-12-2024
    applied_and_level: &applied_and_level
    ...
    rules:
      - name: "Generalize-test" 
        description : generic test for a project test if A exist
        <<: *applied_and_level
        cloudProvider: XXXX 
        objectName : YYYY
        conditions:
          - property : A
            condition : EQUAL
            value : A
      - name: "Generalize-test-2" 
        description : generic test for a project test if B exist
        <<: *applied_and_level
        cloudProvider: XXXX 
        objectName : YYYY
        conditions:
          - property : B
            condition : EQUAL
            value : B
  ```

## Best Practices

1. Use descriptive names and descriptions
2. Set appropriate severity levels
3. Use logical operators for complex conditions
4. Configure notifications appropriately
5. Use variabilization for reusable components
6. Keep rules focused and specific
7. Document complex rules
8. Test rules before deployment
