/*
 * @nevware21/ts-build-tools
 * https://github.com/nevware21/ts-build-tools
 *
 * Copyright (c) 2023 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import * as fs from "fs";

export function removeJsonTrailingComma(text: string): string {
    return text.replace(/,(\s*[}\],])/g, "$1");
}

export function removeComments(text: string): string {
    return text.replace(/(\s*\/\/\s*.*$)|(\s*$)/gm, "");
}

// Helper to load a json blob from a .json file
export function getJson(fileName: string) {
    let value = removeComments(removeJsonTrailingComma(fs.readFileSync(fileName, "utf-8")));
    return JSON.parse(value);
}