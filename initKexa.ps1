param (
    [switch]$help,
    [switch]$d,
    [switch]$download,
    [string]$p,
    [string]$path,
    [string]$b,
    [string]$branch,
    [switch]$c,
    [switch]$config
    #[switch]$r,
    #[switch]$rules
)

function Get-ValidInput {
    # check if the input is valid with a regex pattern
    param (
        [string]$Prompt = "Entrez une valeur : ",
        [string]$RegexPattern = "^[0-9A-Z_-]*$"
    )

    do {
        $input = Read-Host -Prompt $Prompt
    } until ($input -match $RegexPattern)

    return $input
}

function Get-ValueFromMultipleChoice {
    # Basically, it lets you choose between two values, one of which is not zero, and if both are empty, you take the default value.
    param (
        [string]$firstOption,
        [string]$secondOption,
        [string]$defaultValue
    )

    if($firstOption -eq $null -or $firstOption -eq ""){
        if($secondOption -eq $null -or $secondOption -eq ""){
            $result = $defaultValue
        }else{
            $result = $secondOption
        }
    }
    else{
        $result = $firstOption
    }
    return $result
}

function Ask-User {
    # it makes a nice table with the options and asks the user to choose an option
    # exemple:
    # 1. Option 1
    # 2. Option 2
    # 3. Option 3
    # q. Quit
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
        if (-not $alreadyAsked.ContainsKey($prefix)) {
            Write-Host "For the prefix '$prefix' environment"
            foreach ($cred in $credForTheProvider) {
                $value = Read-Host "$cred"
                if (-not $value) {
                    Write-Host "You must enter a value for $cred. If you dont, dont forget to fill it in the .env file"
                }
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

    $configJson | ConvertTo-Json -Depth 4 | Out-File -FilePath $filePath -Force
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
    # configure the Kexa
    # Constants
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

    $additionnalConfigurationOptionnal = @{
        "aws"=@("regions")
        "gcp"=@("regions")
        "http"=@("header", "body")
    }

    $additionnalConfigurationNotOptionnal = @{
        "http"=@("METHOD", "URL")
    }

    $configJson = @{}
    $askingProvider = @()
    # Create/Overwrite the .env file
    "RULESDIRECTORY=./rules" | Out-File -FilePath "$path/.env" -Encoding utf8 -Force

    # Ask the user which providers he wants to configure
    while($true){
        $ask = Ask-User -prompt "Which providers do you want to configure? (q to finish)" -options $providers.Values
        # get the key of the provider selected
        $askProvider = $providers.Keys | where { $providers[$_] -eq $ask }
        # if the user choose to quit, break the loop
        if($ask -eq "q"){
            break
        }
        Clear-Host
        $prefixs = @()
        $environments = @()
        $numberOfEnvironments = 0
        Write-Host "For the provider $askProvider, enter the environments"
        Write-Host "For each environment, enter the name, the description, the prefix and additionnal configuration if needed"
        Write-Host " "
        # loop to ask the user to enter all the environments
        while($true){
            $environmentName = Get-ValidInput -Prompt "Enter the name of the new environment (number: $numberOfEnvironments) (q to finish) "
            if ($environmentName -eq "q") {
                break
            }
            $environmentDescription = Read-Host "Enter the description (default: $environmentName) "
            $environmentDescription = $environmentDescription.Trim(' ')
            # Set the description to the name if the user dont enter a description
            if (-not $environmentDescription) {
                $environmentDescription = $environmentName
            }
            $environmentPrefix = Get-ValidInput -Prompt "Enter prefix "
            $prefixs += $environmentPrefix.ToUpper()
            # Create an environment
            $environment = @{
                "name" = $environmentName
                "description" = $environmentDescription
                "prefix" = $environmentPrefix
                "rules" = @($askProvider+"SetRules")
            }

            # add additionnal configuration not optional if needed depending on the provider
            if($additionnalConfigurationNotOptionnal[$askProvider]){
                foreach($addCred in $additionnalConfigurationNotOptionnal[$askProvider]){
                    $value = Read-Host "$addCred"
                    if($value){
                        $environment[$addCred] = $value
                    }
                }
            }

            # add additionnal configuration optional if needed depending on the provider
            if($additionnalConfigurationOptionnal[$askProvider]){
                foreach($addCred in $additionnalConfigurationOptionnal[$askProvider]){
                    $value = Read-Host "$addCred (optionnal)"
                    if($value){
                        $environment[$addCred] = $value
                    }
                }
            }


            $environments += $environment
            $numberOfEnvironments++
        }
        # if the user enter at least one environment
        if($environments){
            Write-Host " "
            # ask the user to enter the credentials for each prefix
            $credentials = Get-UserInputForAllCred -provider $askProvider -prefixs $prefixs -credForTheProvider $credByProvider[$askProvider]
            # write the credentials in the .env file
            Write-DictionaryToFile -filePath "$path/.env" -dictionary $credentials
            # download the rules for the provider from github and save it in the rules folder
            $url = "https://raw.githubusercontent.com/4urcloud/Kexa/$branch/Kexa/rules/rulesByProvider/${askProvider}SetRules.yaml"
            $text = Invoke-WebRequest -Uri $url -UseBasicParsing
            Save-TextToFile -text $text -filePath "$path/rules/${askProvider}SetRules.yaml"
        }
        # add the provider to the config
        $configJson[$askProvider] = $environments
        $askingProvider += $askProvider
        # remove the provider from the list of providers to ask
        $providers.Remove($askProvider)
        Clear-Host
    }
    # save the config in the config folder at default.json
    Save-ConfigJson -configJson $configJson -filePath "$path/config/default.json"
}

function Press-EnterToContinue {
    # wait for the user to press enter
    Write-Host "Press enter to continue..."
    Read-Host > $null
    Clear-Host
}

function Help {
    # display help
    Write-Host "initKexa.ps1 [-help] [-d | -download] [-c | -config]"
    Write-Host " "
    Write-Host "-help : Display help"
    Write-Host "-d | -download : download the latest version of Kexa"
    Write-Host "-c | -config : configure Kexa"
    Write-Host "-p | -path : path it will be refer"
    Write-Host "-b | -branch : branch of Kexa it will be refer"
    Press-EnterToContinue
    exit
}

function Download-Kexa {
    # get zip from github and unzip it in the path folder and remove all files and folders of github
    Write-Host "Download the latest version of Kexa"
    Protect-config
    $url = "https://github.com/4urcloud/Kexa/archive/refs/heads/$branch.zip"
    $zipPath = $path + "/Kexa.zip"
    $unZipPath = $path + "/Kexa-$branch"
    Write-Host "Download Kexa from $url to $path"
    Invoke-WebRequest -Uri $url -OutFile $zipPath
    Expand-Archive -Path $zipPath -DestinationPath $path -Force
    $absolutePathUnZip = (Get-Item -Path $unZipPath).FullName
    $absolutePathPath = (Get-Item -Path $path).FullName
    Get-ChildItem -Path $unZipPath -Recurse | ForEach-Object {
        $destinationPath = $_.FullName.Replace($absolutePathUnZip, $absolutePathPath)
        if(Test-Path -Path $destinationPath){
            Remove-Item -Path $destinationPath -Recurse -Force -ErrorAction SilentlyContinue
        }
        Copy-Item -Path $_.FullName -Destination $destinationPath -Force
    }
    Remove-Item -Path $unZipPath -Recurse -Force
    Remove-Item -Path $zipPath -Force
    #Remove all files and folders of github
    Remove-Item -Path "$path/.github" -Recurse -ErrorAction SilentlyContinue -Force
    Remove-Item -Path "$path/.git" -Recurse -ErrorAction SilentlyContinue -Force
    Remove-Item -Path "$path/.gitignore" -ErrorAction SilentlyContinue -Force
    Write-Host "End of download"
}

function Protect-config {
    # create a folder savedFolder and copy the file (.env) and folders (./config, ./rules and ./Kexa/rules) in it
    # all the files and folders may not exist
    New-Item -ItemType Directory -Path "$path/savedFolder" -ErrorAction SilentlyContinue | Out-Null
    Remove-Item "$path/savedFolder" -Recurse -Force 

    New-Item -ItemType Directory -Path "$path/savedFolder/config" -ErrorAction SilentlyContinue | Out-Null
    Copy-Item -Path "$path/config" -Destination "$path/savedFolder" -Recurse -ErrorAction SilentlyContinue -Force

    New-Item -ItemType Directory -Path "$path/savedFolder/rules" -ErrorAction SilentlyContinue | Out-Null
    Copy-Item -Path "$path/rules" -Destination "$path/savedFolder" -Recurse -ErrorAction SilentlyContinue -Force

    New-Item -ItemType Directory -Path "$path/savedFolder/Kexa/rules" -ErrorAction SilentlyContinue | Out-Null
    Copy-Item -Path "$path/Kexa/rules" -Destination "$path/savedFolder/Kexa" -Recurse -ErrorAction SilentlyContinue -Force

    Copy-Item -Path "$path/.env" -Destination "$path/savedFolder" -ErrorAction SilentlyContinue -Force
}

function Retreive-config{
    # copy the file (.env) and folders (./config, ./rules and ./Kexa/rules) from savedFolder to their original location
    Copy-Item -Path "$path/savedFolder/config" -Destination "$path/" -Recurse -Force -ErrorAction SilentlyContinue
    Copy-Item -Path "$path/savedFolder/rules" -Destination "$path/" -Recurse -Force -ErrorAction SilentlyContinue
    Copy-Item -Path "$path/savedFolder/Kexa/rules" -Destination "$path/Kexa" -Recurse -Force -ErrorAction SilentlyContinue
    Copy-Item -Path "$path/savedFolder/.env" -Destination "$path/" -ErrorAction SilentlyContinue -Force
}

function Test-AndInstallNodeJS {
    # test if node is installed and install it if not
    $nodeInstalled = Get-Command node -ErrorAction SilentlyContinue

    if ($nodeInstalled -eq $null) {
        Write-Host "Node.js n'est pas installe. Tentative d'installation avec Chocolatey..."
        $chocolateyInstalled = Get-Command choco -ErrorAction SilentlyContinue

        if ($chocolateyInstalled -eq $null) {
            Write-Host "Chocolatey n'est pas installe. Veuillez installer Chocolatey avant d'installer Node.js."
        }
        else {
            choco install nodejs.install -y
            Write-Host "Node.js a ete installe avec succès."
        }
    }
    else {
        Write-Host "Node.js est deja installe."
    }
}

if($help){
    Help
    Press-EnterToContinue
    exit
}

$commandTrigger = 0
Write-Host "Kexa Script initailization"

$path = Get-ValueFromMultipleChoice -firstOption $path -secondOption $p -default "."
$path = $path.Replace("\", "/").TrimEnd('/')
$branch = Get-ValueFromMultipleChoice -firstOption $branch -secondOption $b -default "main"
if($d -or $download){
    Protect-config
    Download-Kexa
    Retreive-config
    #Test-AndInstallNodeJS
    $commandTrigger++
}

if($c -or $config){
    cd $path
    Configure-Providers
    $commandTrigger++
}

if($commandTrigger -eq 0){
    Help
    Press-EnterToContinue
    exit
}

Write-Host "End Script"
Press-EnterToContinue