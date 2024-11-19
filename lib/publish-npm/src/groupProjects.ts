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
import { findPublishGroupsFile, findRepoRoot, removeComments, removeJsonTrailingComma } from "./utils";

export function getGroupProjects(theArgs: INpmPublishArgs): string[] {
    let publishGroup = theArgs.publishGroupDef;
    if (!publishGroup) {
        publishGroup = findPublishGroupsFile("./");
        console.log("Using Publish Group: " + publishGroup);
    }

    if (!fs.existsSync(publishGroup)) {
        throw new Error("!!! Unable to locate publish group definitions [" + path.join(process.cwd(), publishGroup) + "]");
    }

    var groupText = removeComments(removeJsonTrailingComma(fs.readFileSync(publishGroup, "utf-8")));

    let groupJson = JSON.parse(groupText);
    let repoRoot = groupJson.repoRoot;
    if (!repoRoot) {
        repoRoot = findRepoRoot("./");
    }

    theArgs.repoRoot = path.relative(process.cwd(), path.join(process.cwd(), (repoRoot || ""))).replace(/\\/g, "/");
    console.log("Repo: " + theArgs.repoRoot);

    if (!theArgs.publishGroup) {
        theArgs.publishGroup = groupJson.default || "";
    }

    return (groupJson.groups || {})[theArgs.publishGroup] || [];
}
