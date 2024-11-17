import * as fs from "fs";
import * as path from "path";
import { arrForEach, objForEachKey, strSplit, strTrim } from "@nevware21/ts-utils";
import { IPreProcArgs } from "./interfaces/IPreArgs";
import { findRepoRoot, removeComments, removeJsonTrailingComma } from "./utils";
import { IPreProcDefaults, IPreProcFile } from "./interfaces/IPreProc";

export function getGroupDefinitions(preProcArgs: IPreProcArgs): string[] {
    let groupJson: IPreProcFile = {};

    if (preProcArgs.preProcDef) {
        if (!fs.existsSync(preProcArgs.preProcDef)) {
            console.error("!!! Unable to locate group definitions [" + path.join(preProcArgs.cwd, preProcArgs.preProcDef) + "]");
            throw new Error("!!! Unable to locate group definitions.");
        } else {
            console.log("Using: " + path.join(preProcArgs.cwd, preProcArgs.preProcDef));
        }

        var groupText = removeComments(removeJsonTrailingComma(fs.readFileSync(preProcArgs.preProcDef, "utf-8")));

        groupJson = JSON.parse(groupText);
        if (!groupJson.repoRoot) {
            groupJson.repoRoot = findRepoRoot("");
        }
        if (!preProcArgs.cfgRepoRoot) {
            preProcArgs.cfgRepoRoot = findRepoRoot("");
        }

        preProcArgs.repoRoot = path.join(preProcArgs.cwd, (preProcArgs.cfgRepoRoot || groupJson.repoRoot || "")).replace(/\\/g, "/");
        console.log("Repo: " + preProcArgs.repoRoot);

        let defaults = groupJson.default || {} as IPreProcDefaults;

        if (!preProcArgs.definitionGroups) {
            preProcArgs.definitionGroups = strSplit(defaults.definition || "", ",");
        }

        arrForEach(preProcArgs.definitionGroups, (theGroup) => {
            let groupDefines = (groupJson.definitions || {})[strTrim(theGroup)] || {};
            objForEachKey(groupDefines, (key, value) => {
                if (!preProcArgs.globalContext.defs[key]) {
                    preProcArgs.globalContext.defs[key] = value;
                }
            });
        });

        if (!preProcArgs.sourceGroup) {
            preProcArgs.sourceGroup = defaults.group || "";
        }
    }

    return (groupJson.groups || {})[preProcArgs.sourceGroup] || [];
}
