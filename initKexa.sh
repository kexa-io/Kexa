#!/bin/bash

function press_enter_to_continue () {
    echo "Appuyez sur Entrée pour continuer..."
    read -r
    clear
}


function show_help () {
    echo "initKexa.sh [-help] [-d | -download] [-c | -config]"
    echo " "
    echo "-help : Afficher l'aide"
    echo "-d | -download : Télécharger la dernière version de Kexa"
    echo "-c | -config : Configurer Kexa"
    echo "-p | -path : Chemin auquel il se référera"
    echo "-b | -branch : Branche de Kexa à laquelle il se référera"
    press_enter_to_continue
    exit 0
}


function get_arguments(){
    position=0
    params=$1
    for args in params[*]; do
        case $args in
            -h | -help )           shift
                show_help
                ;;
            -d | -download )       shift
                download=true
                ;;
            -p | -path )           shift
                path="${1[$position + 1]}"
                ;;
            -b | -branch )         shift
                branch="${1[$position + 1]}"
                ;;
            -c | -config )         shift
                config=true
                ;;
        esac
        shift
        position=$((position+1))
    done
    result=("$download" "$path" "$branch" "$config")
    # faire un return avec les variables
    return "${result[*]}"
}

### Init Variables ###
help=false
download=false
path="."
branch="main"
config=false
params=("$@")

echo "help: $help"
echo "download: $download"
echo "path: $path"
echo "branch: $branch"
echo "config: $config"
echo "params: ${params[*]}"


args=get_arguments "${params[*]}"


if($help); then
    show_help
fi