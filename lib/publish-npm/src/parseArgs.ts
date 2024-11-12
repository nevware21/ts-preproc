/*
 * @nevware21/ts-build-tools
 * https://github.com/nevware21/ts-build-tools
 *
 * Copyright (c) 2022 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { INpmPublishArgs } from "./interfaces/INpmPublishArgs";

const DEFAULT_PUBLISH_GROUPS_DEF = "../publish-npm.json";

export function parseArgs(): INpmPublishArgs {
    let theArgs: INpmPublishArgs = {
        publishGroupDef: DEFAULT_PUBLISH_GROUPS_DEF,
        repoRoot: "",
        publishGroup: null,
        dryRun: ""
    };

    if (process.argv.length < 2) {
        console.error("!!! Invalid number of arguments -- " + process.argv.length);
        return null;
    }

    let idx = 2;
    while (idx < process.argv.length) {
        let theArg = process.argv[idx];
        if (theArg.startsWith("-")) {
            if (theArg === "-test") {
                theArgs.dryRun = "--dry-run";
                console.info(" - Test Mode");
            } else if (theArg === "-C" || theArg === "-c") {
                theArgs.publishGroupDef = process.argv[idx + 1];
                console.info(" - Custom Publish Group Definition [" + theArgs.publishGroupDef + "]");
                idx++;
            } else {
                console.error("!!! Unknown switch [" + theArg + "] detected");
                return null;
            }
        } else if (!theArgs.publishGroup) {
            theArgs.publishGroup = theArg;
        } else {
            console.error("!!! Invalid Argument [" + theArg + "] detected");
            return null;
        }

        idx++;
    }

    return theArgs;
}