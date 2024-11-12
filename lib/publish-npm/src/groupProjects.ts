/*
 * @nevware21/ts-build-tools
 * https://github.com/nevware21/ts-build-tools
 *
 * Copyright (c) 2022 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import * as fs from "fs";
import * as path from "path";
import { INpmPublishArgs } from "./interfaces/INpmPublishArgs";
import { removeComments, removeJsonTrailingComma } from "./utils";

export function getGroupProjects(theArgs: INpmPublishArgs): string[] {
    if (!fs.existsSync(theArgs.publishGroupDef)) {
        console.error("!!! Unable to locate publish group definitions [" + path.join(process.cwd(), theArgs.publishGroupDef) + "]");
        throw new Error("!!! Unable to locate publish group definitions.");
    }

    var groupText = removeComments(removeJsonTrailingComma(fs.readFileSync(theArgs.publishGroupDef, "utf-8")));

    let groupJson = JSON.parse(groupText);
    theArgs.repoRoot = path.join(process.cwd(), (groupJson.repoRoot || "")).replace(/\\/g, "/");
    console.log("Repo: " + theArgs.repoRoot);

    if (!theArgs.publishGroup) {
        theArgs.publishGroup = groupJson.default || "";
    }

    return (groupJson.groups || {})[theArgs.publishGroup] || [];
}
