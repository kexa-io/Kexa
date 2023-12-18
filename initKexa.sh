#!/bin/bash

# Définition des variables
help_bool=false
download_bool=false
path_bool=false
path_value="."
branch_bool=false
branch_value="main"
config_bool=false
rules_bool=false

msg() {
    local message="$*"
    [ -z "$message" ] && return
    printf "%b\n" "$message"
}

debug() {
    local message="$*"
    [[ -z $DEBUG || $DEBUG -ne 1 ]] && return 
    [ -n "$message" ] && >&2 msg "\e[34mDEBUG: $message\e[0m"
}

info() {
    local message="$*"
    [ -n "$message" ] && >&2 msg "$message"
}

warning() {
    local message="$*"
    [ -n "$message" ] && >&2 msg "\e[33mWARNING: $message\e[0m"
}

error() {
    local message="$*"
    [ -n message ] && >&2 msg "\e[31mERROR: $message\e[0m"
}

function press_enter_to_continue () {
    msg "Press Enter to continue..."
    read -r
    clear
}

function get_valid_input() {
    local prompt="$1"
    local regex="${2:-^[A-Z_][A-Z0-9_]*$}"
    local userInput

    while true; do
        read -p "$prompt: " userInput

        if [[ $userInput =~ $regex ]]; then
            break
        else
            error "Invalid entry. Please enter a value according to the regex: $regex"
        fi
    done

    echo $userInput
}

function show_help () {
    msg "initKexa.sh [-h | --help] [-d | --download] [-c | --config] [-p | --path] [VALUE] [-b | --branch] [VALUE]"
    msg " "
    msg "-h | --help : Display help"
    msg "-d | --download : download the latest version of Kexa"
    msg "-c | --config : configure Kexa"
    msg "-p | --path : path it will be refer"
    msg "-b | --branch : branch of Kexa it will be refer"
    press_enter_to_continue
    return
}

function ask_user() {
    # Makes a pretty table with the options and asks the user to choose an option
    # Exemple :
    # 1. Option 1
    # 2. Option 2
    # 3. Option 3
    # q. Quitter
    # param (
    #     [string]$prompt,
    #     [string[]]$options
    # )

    local prompt="$1"
    shift
    local options=("$@")

    while true; do
        info "$prompt"
        IFS=$'\n' sorted_options=($(echo "${options[*]}" | sort))
        for ((i=0; i<${#sorted_options[@]}; i++)); do
            info "$((i+1)). ${sorted_options[i]}"
        done
        info "q. Quitter"
        
        read -p "Choisissez une option (1 à ${#sorted_options[@]}) : " choice
        info "Vous avez choisi : $choice"
        if [ "$choice" = "q" ]; then
            echo $choice
            return
        fi

        if ((choice >= 1 && choice <= ${#sorted_options[@]})); then
            selected_option="${sorted_options[choice - 1]}"
            echo $selected_option
            return
        else
            error "Choix invalide. Veuillez entrer un nombre entre 1 et ${#sorted_options[@]} ou 'q' pour quitter."
        fi
    done
}

#prompt="Choisissez une option :"
#options=("Option 1" "Option 2" "Option 3")
#
#ask=$(ask_user "$prompt" "${options[@]}")
#echo "ask $ask"

function get_user_input_for_all_cred() {
    # Get user input for credentials based on provider, prefixes, and credentials
    # param (
    #     [string]$provider,
    #     [string[]]$prefixs,
    #     [string[]]$credForTheProvider
    # )

    local provider="$1"
    local prefixs=("${@:2}")
    local credForTheProvider=("${@:2}")

    local -A credentials=()
    local -A already_asked=()
    info "For the provider $provider, enter your credentials for each prefix"

    for prefix in "${prefixes[@]}"; do
        if [[ ! ${already_asked[$prefix]+_} ]]; then
            info "For the prefix '$prefix' environment"
            for cred in "${credForTheProvider[@]}"; do
                read -p "$cred: " value
                if [ -z "$value" ]; then
                    warning "You must enter a value for $cred. If you don't, don't forget to fill it in the .env file"
                fi
                credentials["$prefix$cred"]=$value
            done
            already_asked["$prefix"]=true
        fi
    done

    echo '('
        for key in  "${!credentials[@]}" ; do
            echo "[$key]=${credentials[$key]}"
        done
    echo ')'
    info "End of credentials for $provider"
}

#provider="exampleProvider"
#prefixes=("prefix1" "prefix2" "prefix3")
#credForTheProvider=("username" "password" "token")
#
#declare -A result=$(get_user_input_for_all_cred "$provider" "${prefixs[@]}" "${credForTheProvider[@]}")
#for key in  "${!result[@]}" ; do
#    echo key: $key, value: ${result[$key]}
#done

function save_config_json() {
    #TODO
}

function save_text_file() {
    local file_path="$1"
    local text="$2"
    echo "$text" > $file_path
}

function configure_provider {
    # Configure a provider
    # param (
    #     [string]$provider,
    #     [string[]]$prefixs,
    #     [string[]]$credForTheProvider
    # )

    local provider=( ["aws"]="AWS" ["azure"]="Azure" ["gcp"]="Google Cloud" ["github"]="Github" ["googleDrive"]="Google Drive" ["googleWorkspace"]="Google Workspace" ["http"]="HTTP" ["kubernetes"]="Kubernetes" ["o365"]="Office 365" )
    local credByProvider= ( ["aws"]=("AWS_ACCESS_KEY_ID" "AWS_SECRET_ACCESS_KEY") ["azure"]=("SUBSCRIPTIONID", "AZURECLIENTID", "AZURETENANTID", "AZURECLIENTSECRET") ["gcp"]=("GOOGLE_PROJECT_ID", "GOOGLE_APPLICATION_CREDENTIALS") ["github"]=("GITHUBTOKEN") ["googleDrive"]=("DRIVECRED") ["googleWorkspace"]=("WORKSPACECRED") ["http"]=("AUTHORIZATION") ["kubernetes"]=("KUBECONFIG") ["o365"]=("SUBSCRIPTIONID", "AZURECLIENTID", "AZURETENANTID", "AZURECLIENTSECRET") )
    local additionnalConfigurationOptionnal= ( ["aws"]=("regions") ["gcp"]=("regions") ["http"]=("header", "body")) 
    local additionnalConfigurationNotOptionnal= (["http"]=("header", "body"))
    local configJson=()
    local askingProvider=()

    # Create/Overwrite the .env file
    save_text_file "$path_value/.env" "RULESDIRECTORY=./rules"

    # Ask the user which providers he wants to configure
    while(true); do
        local ask=$(ask_user "Which provider do you want to configure ?" "${provider[@]}")
        if [ "$ask" = "q" ]; then
            break
        fi

        # Get the display value of the provider
        for key in "${!providers[@]}"; do
            if [ "${providers[$key]}" = "$ask" ]; then
                $askingProvider="$key"
                break
            fi
        done

        clear
        local prefixs=()
        local credForTheProvider=()
        local numberOfEnvironments=0

        info "For the provider $ask, enter the environments"
        info "For each environment, enter the name, the description, the prefix and additionnal configuration if needed"
        info " "
        #loop to ask the user to enter all the environments
        while(true){
            local environmentName= $(ask_user "Enter the name of the environment (number: $numberOfEnvironments) (q to finish) " )
            if [ "$environmentName" = "q" ]; then
                break
            fi
            read -p "Enter the description (default: $environmentName): " environmentDescription
            if [ -z "$environmentDescription" ]; then
                environmentDescription="$environmentName"
            fi

            read -p "Enter the prefix (default: $numberOfEnvironments): " environmentPrefix
            if [ -z "$environmentPrefix" ]; then
                environmentPrefix="$numberOfEnvironments"
            fi
            $prefixs += $environmentPrefix
            local environment = ( ["name"]="$environmentName" ["description"]="$environmentDescription" ["prefix"]="$environmentPrefix" ["rules"]= "$askingProvider"+"SetRules" )

            # add additionnal configuration not optional if needed depending on the provider
            if [[ ! ${additionnalConfigurationOptionnal[$askingProvider]+_} ]]; then
                for additionnalConfiguration in "${additionnalConfigurationOptionnal[$askingProvider]}"; do
                    read -p "Enter the $additionnalConfiguration (default: $additionnalConfiguration): " environmentAdditionnalConfiguration
                    if [[ ! -z "$environmentAdditionnalConfiguration" ]]; then
                        environment["$additionnalConfiguration"]="$environmentAdditionnalConfiguration"
                    fi
                done
            fi

            # add additionnal configuration optional if needed depending on the provider
            if [[ ! ${additionnalConfigurationNotOptionnal[$askingProvider]+_} ]]; then
                for additionnalConfiguration in "${additionnalConfigurationNotOptionnal[$askingProvider]}"; do
                    read -p "Enter the $additionnalConfiguration (default: $additionnalConfiguration): " environmentAdditionnalConfiguration
                    if [[ ! -z "$environmentAdditionnalConfiguration" ]]; then
                        environment["$additionnalConfiguration"]="$environmentAdditionnalConfiguration"
                    fi
                done
            fi

            $environments += $environment
            $numberOfEnvironments++
        }

        # if the user enter at least one environment
        if [ "$numberOfEnvironments" -gt 0 ]; then
            info " "
            # ask the user to enter the credentials for each prefix
            declare -A result=$(get_user_input_for_all_cred "$ask" "${prefixs[@]}" "${credForTheProvider['$askingProvider']}")

            # write the credentials in the .env file
            for key in  "${!result[@]}" ; do
                echo "$key=${result[$key]}" >> "$path_value/.env"
            done
            # download the rules for the provider from github and save it in the rules folder
            $url = "https://raw.githubusercontent.com/4urcloud/Kexa/$branch/Kexa/rules/rulesByProvider/$askProvider" + "SetRules.yaml"
            curl -o "$path_value/rules/$askProvider" + "SetRules.yaml" $url
        fi
        # add the provider to the config
        $configJson["$ask"]="$environments"
        $askingProvider+= $askProvider
        # remove the provider from the list of providers to ask
        unset provider["$askProvider"]
        clear
    done
    # save the config in the config folder at default.json
    save_config_json "$path_value/config/default.json" "$configJson"
}

function download_kexa() {
    # Download the latest version of Kexa
    # param (
    #     [string]$path,
    #     [string]$branch
    # )

    info "Download the latest version of Kexa"
    local path="$1"
    local branch="$2"
    local url="https://github.com/4urcloud/Kexa/archive/refs/heads/$branch.zip"
    curl -o "$path/kexa.zip" $url
    info "Kexa downloaded"
    info "Unzip Kexa"
    unzip "$path/kexa.zip" -d "$path"
    rm "$path/kexa.zip" #2>/dev/null
    mv "$path/Kexa-$branch" "$path/kexa" #2>/dev/null
    rm -rf "$path/kexa/.git" #2>/dev/null
    rm -rf "$path/kexa/.github" #2>/dev/null
    rm -rf "$path/kexa/.gitignore" #2>/dev/null
    rm -rf "$path/kexa/.gitattributes" #2>/dev/null
    info "Kexa unzipped"
}

function protect_config(){
    # Protect the config folder
    # param (
    #     [string]$path
    # )
    local path="$1"

    info "Protect the config files and folder"
    mkdir "$path/savedFolder" #2>/dev/null
    mv "$path/config" "$path/savedFolder/config" #2>/dev/null
    mv "$path/rules" "$path/savedFolder/rules" #2>/dev/null
    mv "$path/Kexa/rules" "$path/savedFolder/Kexa/rules" #2>/dev/null
    mv "$path/.env" "$path/savedFolder/.env" #2>/dev/null
    info "Config protected"
}

function retreive-config {
    # Retreive the config folder
    # param (
    #     [string]$path
    # )
    local path="$1"

    info "Retreive the config files and folder"
    mv "$path/savedFolder/config" "$path/config" #2>/dev/null
    mv "$path/savedFolder/rules" "$path/rules" #2>/dev/null
    mv "$path/savedFolder/Kexa/rules" "$path/Kexa/rules" #2>/dev/null
    mv "$path/savedFolder/.env" "$path/.env" #2>/dev/null
    rm -rf "$path/savedFolder" #2>/dev/null
    info "Config retreived"

}

function test_and_install_nodejs {
    # Test if nodejs is installed and install it if not
    info "Test if nodejs is installed"
    if ! command -v node &> /dev/null; then
        info "Nodejs is not installed"
        info "Install nodejs"
        curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
        sudo apt-get install -y nodejs
        info "Nodejs installed"
    else
        info "Nodejs is installed"
    fi

}

while [[ "$#" -gt 0 ]]; do
    case $1 in
        -h|--help)
            help_bool=true
            ;;
        -d|--download)
            download_bool=true
            ;;
        -p|--path)
            path_bool=true
            path_value="$2"
            shift
            ;;
        -b|--branch)
            branch_bool=true
            branch_value="$2"
            shift
            ;;
        -c|--config)
            config_bool=true
            ;;
        -r|--rules)
            rules_bool=true
            ;;
        *)
            other="$1"
            ;;
    esac
    shift
done

#TO DEBUG
echo "help: $help_bool"
echo "download: $download_bool"
echo "p: $path_bool $path_value"
echo "branch: $branch_bool $branch_value"
echo "c: $config_bool"
echo "rules: $rules_bool"

command_trigger = 0

if($help_bool); then
    show_help
    command_trigger++
fi

if($download_bool); then
    echo "Download Kexa"
    protect_config "$path_value"
    download_kexa "$path_value" "$branch_value"
    retreive-config "$path_value"
    command_trigger++
    press_enter_to_continue
fi

if($config_bool); then
    echo "Configure Kexa"
    test_and_install_nodejs
    command_trigger++
    press_enter_to_continue
fi

if($rules_bool); then
    echo "download rules"
    command_trigger++
    press_enter_to_continue
fi

if($command_trigger -eq 0); then
    show_help
fi