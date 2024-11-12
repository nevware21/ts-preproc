/*
 * @nevware21/ts-build-tools
 * https://github.com/nevware21/ts-build-tools
 *
 * Copyright (c) 2022 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

export function removeJsonTrailingComma(text: string): string {
    return text.replace(/,(\s*[}\],])/g, "$1");
}

export function removeComments(text: string): string {
    return text.replace(/(\s*\/\/\s*.*$)|(\s*$)/gm, "");
}

