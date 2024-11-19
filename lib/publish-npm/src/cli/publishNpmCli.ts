/*
 * @nevware21/ts-build-tools
 * https://github.com/nevware21/ts-build-tools
 *
 * Copyright (c) 2022 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import * as fs from "fs";
import * as path from "path";
import * as child_process from "child_process";
import { getGroupProjects } from "../groupProjects";
import { parseArgs } from "../parseArgs";
import { showHelp } from "../showHelp";
import { getNpmPackageName } from "../npmPackageName";

(function() {
    try {
        console.log("cwd: " + process.cwd());
        let theArgs = parseArgs();
        
        if (theArgs) {
            var packages = getGroupProjects(theArgs);
    
            console.log(`Publishing [${theArgs.publishGroup}] packages => ${packages.length}`);
            packages.forEach((packageRoot) => {
                let packageJsonFile = path.join(theArgs.repoRoot, packageRoot + "/package.json");
    
                if (!fs.existsSync(packageJsonFile)) {
                    throw new Error("!!! Source package.json doesn't exist [" + packageJsonFile + "] - [" + theArgs.repoRoot + ", " + packageRoot + "]");
                }
    
                let packageName = getNpmPackageName(packageJsonFile);
                console.log("\n\n##################################################################");
                console.log("Publishing - " + packageName);
                console.log("##################################################################");
                let npmPackageName = path.join(theArgs.repoRoot, packageRoot + "/" + packageName);
                if (!fs.existsSync(npmPackageName)) {
                    throw new Error("!!! NPM Package not found [" + npmPackageName + "] - [" + theArgs.repoRoot + ", " + packageRoot + "]");
                }
                
                console.log(`npm package present ${npmPackageName}`);
                let npmCmd = `npm publish ${npmPackageName} --access public ${theArgs.dryRun}`;
                console.log(`Running: \"${npmCmd}\"`);
                child_process.execSync(npmCmd);
            });
        } else {
            showHelp();
            process.exit(1);
        }
    } catch (err) {
        console.error(err.message || err);
        process.exit(2);
    }
})();