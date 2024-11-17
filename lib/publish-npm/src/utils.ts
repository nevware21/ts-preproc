/*
 * @nevware21/ts-build-tools
 * https://github.com/nevware21/ts-build-tools
 *
 * Copyright (c) 2022 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import * as fs from "fs";
import * as path from "path";
import { strEndsWith, strLeft, strRight } from "@nevware21/ts-utils";

const PUBLISH_GROUPS_JSON = "publish-groups.json";

export function removeJsonTrailingComma(text: string): string {
    return text.replace(/,(\s*[}\],])/g, "$1");
}

export function removeComments(text: string): string {
    return text.replace(/(\s*\/\/\s*.*$)|(\s*$)/gm, "");
}

export function findPath(cb: (thePath: string) => string, thePath: string, cnt = 0): string {
    if (thePath && strRight(thePath, 1) != "/") {
        thePath += "/";
    }

    if (!thePath) {
        thePath = "./";
    }

    let foundPath = cb(thePath);
    if (foundPath || foundPath === null) {
        return foundPath ? foundPath.replace(/\\/g, "/") : foundPath;
    }

    let current: string;
    if (!path.isAbsolute(thePath)) {
        current = path.normalize(path.join(process.cwd(), thePath));
    } else {
        current = path.normalize(thePath);
    }

    let checkPath = thePath;
    if (!path.isAbsolute(thePath)) {
        checkPath = path.normalize(path.join(process.cwd(), thePath));
    }

    if (current == path.normalize(checkPath + "../")) {
        // Looks like we are at the root of the file system, so stop
        return null;
    }

    if (cnt > 10) {
        return null;
    }

    if (thePath == "./") {
        thePath = "";
    }

    return findPath(cb, thePath + "../", cnt + 1);
}

export function findPublishGroupsFile(thePath: string, name = PUBLISH_GROUPS_JSON): string {
    let foundPath = findPath((thePath) => {
        if (fs.existsSync(thePath + name)) {
            return thePath + name;
        }

        if (fs.existsSync(thePath + ".git")) {
            // Looks like we are at the root of the repo, so stop
            return null;
        }

        return;
    }, thePath);

    if (!foundPath) {
        console.error("!!! Unable to locate publish group definitions [" + path.join(process.cwd(), thePath) + "]");
    }

    return foundPath;
}

export function findRepoRoot(thePath: string): string {
    let foundPath = findPath((thePath) => {
        console.error("Checking [" + thePath + ".git]");
        if (fs.existsSync(thePath + ".git")) {
            // Looks like we are at the root of the repo, so stop
            return thePath;
        }

        return;
    }, thePath);

    if (!foundPath) {
        console.error("!!! Unable to locate the repo root [" + path.join(process.cwd(), thePath) + "]");
    } else {
        while (foundPath && strEndsWith(foundPath, "/")) {
            foundPath = strLeft(foundPath, foundPath.length - 1);
        }
    }

    return foundPath;
}

