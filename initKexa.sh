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
    echo "TODO save_config_json"
}

function save_text_file() {
    local file_path="$1"
    local text="$2"
    echo "$text" > $file_path
}

function configure_provider {
    if command -v pwsh &> /dev/null; then
        echo "PowerShell est déjà installé." >&2
    else
        ###################################
        # Install pre-requisites
        
        # Installer PowerShell
        echo "Installation de PowerShell..."
        # Update the list of packages
        sudo apt-get update

        # Install pre-requisite packages.
        sudo apt-get install -y wget apt-transport-https software-properties-common

        # Get the version of os
        source /etc/os-release

        # Download the Microsoft repository keys
        wget -q https://packages.microsoft.com/config/ubuntu/$VERSION_ID/packages-microsoft-prod.deb

        # Register the Microsoft repository keys
        sudo dpkg -i packages-microsoft-prod.deb

        # Delete the Microsoft repository keys file
        rm packages-microsoft-prod.deb

        # Update the list of packages after we added packages.microsoft.com
        sudo apt-get update

        ###################################
        # Install PowerShell
        sudo apt-get install -y powershell
    fi

    if pwsh -File ./initKexa.ps1 -p "$path_value" -b "$branch_value" -c; then
        info "Configuration done"
    else
        error "Configuration failed; Retry"
        powershell.exe -File ./initKexa.ps1 -p "$path_value" -b "$branch_value" -c
    fi
    
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
    warning "$branch"
    local url="https://codeload.github.com/4urcloud/Kexa/zip/refs/heads/$branch"
    warning "$url"
    curl $url -o "$path/Kexa-$branch.zip"
    info "Kexa downloaded"
    info "Unzip Kexa"
    test_and_install_unzip
    unzip "$path/Kexa-$branch.zip" -d "$path"
    rm "$path/Kexa-$branch.zip"
    rsync -a "$path/Kexa-$branch/" "$path/"
    rm -rf "$path/Kexa-$branch"
    rm -rf "$path/.git" 2>/dev/null
    rm -rf "$path/.github" 2>/dev/null
    rm -rf "$path/.gitignore" 2>/dev/null
    rm -rf "$path/.gitattributes" 2>/dev/null
    info "Kexa unzipped"
}

function protect_config(){
    # Protect the config folder
    # param (
    #     [string]$path
    # )
    local path="$1"

    info "Protect the config files and folder"
    mkdir -p "$path/savedFolder/Kexa" 2>/dev/null
    mv "$path/config" "$path/savedFolder/config" 2>/dev/null
    mv "$path/rules" "$path/savedFolder/rules" 2>/dev/null
    #mkdir "$path/savedFolder/Kexa" 2>/dev/null
    mv "$path/Kexa/rules" "$path/savedFolder/Kexa/rules" 2>/dev/null
    mv "$path/.env" "$path/savedFolder/.env" 2>/dev/null
    info "Config protected"
}

function retreive-config {
    # Retreive the config folder
    # param (
    #     [string]$path
    # )
    local path="$1"

    info "Retreive the config files and folder"
    rsync -a "$path/savedFolder/config" "$path/" 2>/dev/null
    rsync -a "$path/savedFolder/rules" "$path/" 2>/dev/null
    rsync -a "$path/savedFolder/Kexa/rules" "$path/Kexa/" 2>/dev/null
    mv -f "$path/savedFolder/.env" "$path/.env" 2>/dev/null
    rm -rf "$path/savedFolder" 2>/dev/null
    info "Config retreived"
}

function test_and_install_nodejs {
    # Test if nodejs is installed and install it if not
    info "Test if nodejs is installed"
    if ! command -v node &> /dev/null; then
        info "Nodejs is not installed"
        info "Install nodejs"
        sudo apt update
        sudo apt install nodejs
        info "Nodejs installed"
    else
        info "Nodejs is installed"
    fi

}

function test_and_install_unzip {
    # Test if unzip is installed and install it if not
    info "Test if unzip is installed"
    if ! command -v unzip &> /dev/null; then
        info "Unzip is not installed"
        info "Install unzip"
        sudo apt update
        sudo apt install unzip
        info "Unzip installed"
    else
        info "Unzip is installed"
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
#echo "help: $help_bool"
#echo "download: $download_bool"
#echo "p: $path_bool $path_value"
#echo "branch: $branch_bool $branch_value"
#echo "c: $config_bool"
#echo "rules: $rules_bool"
#press_enter_to_continue

command_trigger=0

if [ "$help_bool" = true ]; then
    show_help
    let "command_trigger+=1"
fi

if [ "$download_bool" = true ]; then
    echo "Download Kexa"
    protect_config "$path_value"
    download_kexa "$path_value" "$branch_value"
    retreive-config "$path_value"
    let "command_trigger+=1"
    press_enter_to_continue
fi

if [ "$config_bool" = true ]; then
    echo "Configure Kexa"
    test_and_install_nodejs
    configure_provider
    let "command_trigger+=1"
    press_enter_to_continue
fi

if [ "$rules_bool" = true ]; then
    echo "download rules"
    let "command_trigger+=1"
    press_enter_to_continue
fi

if [ "$command_trigger" -eq 0 ]; then
    retreive-config "$path_value"
    show_help
fi