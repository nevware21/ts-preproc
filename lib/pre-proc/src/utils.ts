/*
 * @nevware21/ts-build-tools
 * https://github.com/nevware21/ts-build-tools
 *
 * Copyright (c) 2023 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import * as fs from "fs";
import * as path from "path";
import { strEndsWith, strLeft, strRight } from "@nevware21/ts-utils";

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

export function findRepoRoot(thePath: string): string {
    let foundPath = findPath((thePath) => {
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

