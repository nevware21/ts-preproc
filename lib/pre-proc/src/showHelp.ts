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
    console.log(scriptName + " [<definitions> [<group>]] [-D <name>]*");
    console.log("--------------------------");
    console.log(" <definitions>    - Use the global group definitions, this is a comma separated list of groups to process");
    console.log(" <group>          - Identifies the group of projects to process");
    console.log(" -D <name>        - Define the named variable, can be specified more than once");
    console.log(" -C <config file> - The json config file to use");
    console.log(" -R <repoRoot>    - The repository root");
}
