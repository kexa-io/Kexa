const fs = require('fs');

export function getConfig(){
    if (process.env.SPECIALCONFIG) {
        return JSON.parse(fs.readFileSync(process.env.SPECIALCONFIG));
    } else {
        return require('node-config-ts').config;
    }
}