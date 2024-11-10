/*
 * @nevware21/ts-build-tools
 * https://github.com/nevware21/ts-build-tools
 *
 * Copyright (c) 2022 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import * as fs from "fs";
import { removeJsonTrailingComma } from "./utils";

export function getNpmPackageName(packageJsonFile: string) {
    var packageText = removeJsonTrailingComma(fs.readFileSync(packageJsonFile, "utf-8"));

    let packageJson = JSON.parse(packageText);
    let packageName = packageJson.name;
    let packageVersion = packageJson.version;

    let theNpmPackageName = packageName + "-" + packageVersion;

    theNpmPackageName = theNpmPackageName.replace("@", "").replace("/", "-");

    return theNpmPackageName + ".tgz";
}

