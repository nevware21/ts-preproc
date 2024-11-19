/*
 * @nevware21/ts-build-tools
 * https://github.com/nevware21/ts-build-tools
 *
 * Copyright (c) 2022 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { arrSlice } from "@nevware21/ts-utils";
import { mergeCoverage } from "../merge-coverage";
import { parseArgs } from "../parseArgs";
import { IMergeCoverageArgs } from "../interfaces/IMergeCoverageArgs";
import { showHelp } from "../showHelp";

export { IMergeCoverageArgs };

(function() {
    try {
        console.log("cwd: " + process.cwd());
        let procArgs = process.argv;
        let theArgs: IMergeCoverageArgs = null;
        
        theArgs = parseArgs(process.cwd(), arrSlice(procArgs, 2));
        if (!theArgs) {
            showHelp(procArgs[1]);
            process.exit(1);
        }
    
        mergeCoverage(theArgs);
    } catch (err) {
        console.error(err.message || err);
        process.exit(2);
    }
})();