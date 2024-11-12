/*
 * @nevware21/ts-build-tools
 * https://github.com/nevware21/ts-build-tools
 *
 * Copyright (c) 2022 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { IMergeCoverageArgs } from "./interfaces/IMergeCoverageArgs";

export function parseArgs(cwd: string, cmdArgs: string[]): IMergeCoverageArgs {
    let mergeCoverageArgs: IMergeCoverageArgs = {
        cwd: cwd,
        coverageRoot: null
    };
    
    if (!cmdArgs) {
        console.error("!!! Invalid number of arguments -- " + cmdArgs.length);
        return null;
    }

    let idx = 0;
    while (idx < cmdArgs.length) {
        let theArg = cmdArgs[idx];
        if (theArg.startsWith("-")) {
            if(theArg === "-C" || theArg === "-c") {
                idx++;
                if (idx < cmdArgs.length) {
                    mergeCoverageArgs.coverageRoot = cmdArgs[idx];
                    console.log(` - CoverageRoot ${mergeCoverageArgs.coverageRoot}`);
                }
            } else {
                console.error("!!! Unknown switch [" + theArg + "] detected");
                return null;
            }
        } else {
            console.error("!!! Invalid Argument [" + theArg + "] detected");
            return null;
        }

        idx++;
    }

    return mergeCoverageArgs;
}

