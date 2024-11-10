import { strSplit } from "@nevware21/ts-utils";
import { IPreProcArgs } from "./interfaces/IPreArgs";

const DEFAULT_PREPROC_DEF = "../pre-proc.json";

export function parseArgs(cwd: string, cmdArgs: string[]): IPreProcArgs {
    let preProcArgs: IPreProcArgs = {
        cwd: cwd,
        preProcDef: DEFAULT_PREPROC_DEF,
        repoRoot: "",
        sourceGroup: null,
        definitionGroups: null,
        cfgRepoRoot: null,
        restoreOnly: false,
        globalContext: {
            defs: {},
            states: []
        }
    };
    
    if (!cmdArgs) {
        console.error("!!! Invalid number of arguments -- " + cmdArgs.length);
        return null;
    }

    let idx = 0;
    while (idx < cmdArgs.length) {
        let theArg = cmdArgs[idx];
        if (theArg.startsWith("-")) {
            if (theArg === "-restore") {
                preProcArgs.restoreOnly = true;
                console.info(" - Restoring File(s)");
            } else if(theArg === "-D") {
                idx++;
                if (idx < cmdArgs.length) {
                    let name = cmdArgs[idx];
                    preProcArgs.globalContext.defs[name] = true;
                    console.log(` - Defining ${name}`);
                }
            } else if(theArg === "-C" || theArg === "-c") {
                idx++;
                if (idx < cmdArgs.length) {
                    preProcArgs.preProcDef = cmdArgs[idx];
                    console.log(` - Config ${preProcArgs.preProcDef}`);
                }
            } else if(theArg === "-R" || theArg === "-r") {
                idx++;
                if (idx < cmdArgs.length) {
                    preProcArgs.cfgRepoRoot = cmdArgs[idx];
                    console.log(` - Repo Root ${preProcArgs.cfgRepoRoot}`);
                }
            } else {
                console.error("!!! Unknown switch [" + theArg + "] detected");
                return null;
            }
        } else if (!preProcArgs.definitionGroups) {
            preProcArgs.definitionGroups = strSplit(theArg, ",");
            console.log(" - Using " + preProcArgs.definitionGroups.join(","));
        } else if (!preProcArgs.sourceGroup) {
            preProcArgs.sourceGroup = theArg;
            console.log(" - Using " + preProcArgs.sourceGroup);
        } else {
            console.error("!!! Invalid Argument [" + theArg + "] detected");
            return null;
        }

        idx++;
    }

    return preProcArgs;
}

