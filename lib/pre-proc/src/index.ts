import * as path from "path";
import { processGroup } from "./processGroup";
import { showHelp } from "./showHelp";
import { parseArgs } from "./parseArgs";
import { getGroupDefinitions } from "./groupDefinitions";


export function preProcess(cwd: string, cmdArgs: string[]) {
    console.log("cwd: " + cwd);
    let theArgs = parseArgs(cwd, cmdArgs);
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
        showHelp("ts-preProccess");
        process.exit(1);
    }
}