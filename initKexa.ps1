
function Ask-User {
    param (
        [string]$prompt,
        [string[]]$options
    )

    do {
        Write-Host $prompt
        $options = $options | Sort-Object
        for ($i=0; $i -lt $options.Length; $i++) {
            Write-Host "$($i+1). $($options[$i])"
        }
        Write-Host "q. Quit"
        $choice = Read-Host "Choose an option (1 to $($options.Length))"
        if($choice -eq "q"){
            return $choice
        }
    } while (-not ([int]$choice -ge 1 -and [int]$choice -le $options.Length))
    Write-Host "You choose $($options[$choice - 1])"
    return $options[$choice - 1]
}

function Get-UserInputForAllCred {
    param (
        [string]$provider,
        [string[]]$prefixs,
        [string[]]$credForTheProvider
    )

    $credentials = @{}
    $alreadyAsked = @{}
    Write-Host "For the provider $provider, enter your credentials for each prefix"
    foreach ($prefix in $prefixs) {
        # Vérifier si l'élément a déjà été traité
        if (-not $alreadyAsked.ContainsKey($prefix)) {
            Write-Host "For the prefix '$prefix' s environment"
            foreach ($cred in $credForTheProvider) {
                $value = Read-Host "$cred"
                $credentials[$prefix+$cred] = $value
            }
            $alreadyAsked[$prefix] = $true
        }
    }
    Write-Host "End of credentials for $provider"
    return $credentials
}

function Write-DictionaryToFile {
    param (
        [string]$filePath,
        [hashtable]$dictionary
    )

    $lines = foreach ($key in $dictionary.Keys) {
        "$key=$($dictionary[$key])"
    }

    $lines | Out-File -FilePath $filePath -Encoding utf8 -Append
}

function Save-ConfigJson {
    param (
        [hashtable]$configJson,
        [string]$filePath
    )

    $folderPath = $filePath | Split-Path -Parent
    if (-not (Test-Path -Path $folderPath)) {
        New-Item -ItemType Directory -Path $folderPath | Out-Null
    }

    $configJson | ConvertTo-Json -Depth 1 | Out-File -FilePath $filePath -Force
}

function Save-TextToFile {
    param (
        [string]$text,
        [string]$filePath
    )

    $folderPath = $filePath | Split-Path -Parent
    if (-not (Test-Path -Path $folderPath)) {
        New-Item -ItemType Directory -Path $folderPath | Out-Null
    }

    $text | Out-File -FilePath $filePath -Force
}

function Configure-Providers {
    $providers = @{
        "aws"="AWS"
        "azure"="Azure"
        "gcp"="Google Cloud"
        "github"="GitHub"
        "googleDrive"="Google Drive"
        "googleWorkspace"="Google Workspace"
        "http"="HTTP"
        "kubernetes"="Kubernetes"
        "o365"="Office 365"
    }

    $credByProvider = @{
        "aws"=@("AWS_SECRET_NAME", "AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY")
        "azure"=@("SUBSCRIPTIONID", "AZURECLIENTID", "AZURETENANTID", "AZURECLIENTSECRET") 
        "gcp"=@("GOOGLE_PROJECT_ID", "GOOGLE_APPLICATION_CREDENTIALS")
        "github"=@("GITHUBTOKEN")
        "googleDrive"=@("DRIVECRED")
        "googleWorkspace"=@("WORKSPACECRED")
        "http"=@("AUTHORIZATION")
        "kubernetes"=@("KUBECONFIG")
        "o365"=@("SUBSCRIPTIONID", "AZURECLIENTID", "AZURETENANTID", "AZURECLIENTSECRET")
    }

    $additionnalConfiguration = @{
        "aws"=@("regions")
        "gcp"=@("regions")
        "http"=@("METHOD", "URL", "header", "body")
    }

    $configJson = @{}
    $askingProvider = @()
    "RULESDIRECTORY=./rules" | Out-File -FilePath "./.env" -Encoding utf8 -Force
    while($true){
        $ask = Ask-User -prompt "Which providers do you want to configure? (q to finish)" -options $providers.Values
        $askProvider = $providers.Keys | where { $providers[$_] -eq $ask }
        if($ask -eq "q"){
            break
        }
        $prefixs = @()
        while($true){
            $environmentName = Read-Host "Enter the name of the new environment (q to finish) "
            if ($environmentName -eq "q") {
                break
            }
            $environmentDescription = Read-Host "Enter the description (default: $environmentName) "
            if (-not $environmentDescription) {
                $environmentDescription = $environmentName
            }
            $environmentPrefix = Read-Host "Enter prefix "
            $prefixs += $environmentPrefix
            $environment = @{
                "name" = $environmentName
                "description" = $environmentDescription
                "prefix" = $environmentPrefix
                "rules" = @($askProvider+"SetRules")
            }

            if($additionnalConfiguration[$askProvider]){
                foreach($addCred in $additionnalConfiguration[$askProvider]){
                    $value = Read-Host "$addCred"
                    if($value){
                        $environment[$addCred] = $value
                    }
                }
            }


            $environments += $environment
        }
        if($environments){
            $credentials = Get-UserInputForAllCred -provider $askProvider -prefixs $prefixs -credForTheProvider $credByProvider[$askProvider]
            Write-DictionaryToFile -filePath "./.env" -dictionary $credentials
            # get raw text from url and save it to file
            $url = "https://raw.githubusercontent.com/4urcloud/Kexa/main/Kexa/rules/rulesByProvider/${askProvider}SetRules.yaml"
            $text = Invoke-WebRequest -Uri $url -UseBasicParsing
            Save-TextToFile -text $text -filePath "./rules/${askProvider}SetRules.yaml"
        }
        $configJson[$askProvider] = $environments
        $askingProvider += $askProvider
        $providers.Remove($askProvider)
    }

    Save-ConfigJson -configJson $configJson -filePath "./config/default.json"
    #return $configJson
}

function Press-EnterToContinue {
    Write-Host "Press enter to continue..."
    Read-Host > $null
}

Write-Host "Kexa Script initailization"

Configure-Providers

Write-Host "End Script"
Press-EnterToContinue