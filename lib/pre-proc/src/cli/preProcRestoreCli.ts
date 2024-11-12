import * as path from "path";
import { arrSlice } from "@nevware21/ts-utils";
import { processGroup } from "../processGroup";
import { showHelp } from "../showHelp";
import { parseArgs } from "../parseArgs";
import { getGroupDefinitions } from "../groupDefinitions";
import { IPreProcArgs } from "../interfaces/IPreArgs";

(function() {
    console.log("cwd: " + process.cwd());

    let theArgs: IPreProcArgs = null;
    if (process.argv.length < 2) {
        console.error("!!! Invalid number of arguments -- " + process.argv.length);
    } else {
        let argvArgs = arrSlice(process.argv, 2);
        theArgs = parseArgs(process.cwd(), argvArgs);
        if (theArgs) {
            theArgs.restoreOnly = true;
        }
    }

    if (theArgs) {
        let groupDef = getGroupDefinitions(theArgs);

        console.log(`Process [${theArgs.sourceGroup}] packages => ${groupDef.length}`);
        console.log(` - Defined: ${JSON.stringify(theArgs.globalContext.defs, null, 4)}`);
        groupDef.forEach((groupRoot) => {
            let theRoot = path.join(theArgs.repoRoot, groupRoot).replace(/\\/g, "/")
            console.log(` - ${theRoot}`);
            processGroup(theArgs, theRoot);
        });
    } else {
        showHelp(process.argv[1]);
        process.exit(1);
    }
})();