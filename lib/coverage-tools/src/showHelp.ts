/*
 * @nevware21/ts-build-tools
 * https://github.com/nevware21/ts-build-tools
 *
 * Copyright (c) 2023 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

export function showHelp(scriptName: string) {
    let scriptParts: string[]; //d
    if (scriptName.indexOf("\\") !== -1) {
        scriptParts = scriptName.split("\\");
        scriptName = scriptParts[scriptParts.length - 1];
    } else if (scriptName.indexOf("/") !== -1) {
        scriptParts = scriptName.split("/");
        scriptName = scriptParts[scriptParts.length - 1];
    }

    console.log("");
    console.log(scriptName + " [-c <coverage root>]");
    console.log("--------------------------");
    console.log(" -C|-c <coverage root>   - The root folder for the coverage reports, defaults to first existing ./coverage; ../coverage or ../../coverage");
}
