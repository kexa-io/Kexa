import {DebugEnum} from "../enum/debug.enum";
import adze, { setup }  from 'adze';

const process = require('process');

let isSetupCalled = false;

export function getNewLogger(name: string) {
    if (!isSetupCalled) {
        let debug_mode;
        if (!process.env.DEBUG_MODE) {
            debug_mode = DebugEnum.INFO;
        } else {
            let debug_var = process.env.DEBUG_MODE;
            if (!isNaN(parseInt(debug_var)))
                debug_mode = Number(debug_var);
            else
                debug_mode = Number(DebugEnum[debug_var]);
        }
        setup({
            activeLevel: debug_mode,
        });
        isSetupCalled = true;
    }
    return adze.timestamp.namespace('kexa').seal();
}