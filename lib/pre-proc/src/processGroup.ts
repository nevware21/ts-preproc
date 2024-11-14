/*
 * @nevware21/ts-build-tools
 * https://github.com/nevware21/ts-build-tools
 *
 * Copyright (c) 2023 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import * as fs from "fs";
import * as path from "path";
import { globbySync } from "globby";
import { arrForEach } from "@nevware21/ts-utils";
import { undefSrc } from "./undef";
import { LineEnding, getLines } from "./getLines";
import { convertFile } from "./convertFile";
import { IPreProcArgs } from "./interfaces/IPreArgs";

export function processGroup(theArgs: IPreProcArgs, sourceRoot: string) {
    const files = globbySync(path.join(sourceRoot, "./**/*.ts").replace(/\\/g, "/"));
    files.map((inputFile) => {
        console.debug("   - " + inputFile);
        let orgSrc = fs.readFileSync(inputFile, { encoding: "utf8" });

        let newSrc = undefSrc(orgSrc);
        if (!theArgs.restoreOnly) {
            let lines = getLines(newSrc);
            if (convertFile(theArgs.globalContext, lines)) {
                newSrc = "";
                arrForEach(lines, (theLine) => {
                    newSrc = newSrc + theLine.value;
                    switch (theLine.ending) {
                    case LineEnding.Unix:
                        newSrc += "\n";
                        break;
                    case LineEnding.Mac:
                        newSrc += "\r";
                        break;
                    case LineEnding.Win:
                        newSrc += "\r\n";
                        break;
                    }
                });
            }
        }

        if (newSrc != orgSrc) {
            // File Changed
            console.debug("     - Updating: " + inputFile);

            fs.writeFileSync(inputFile, newSrc, { encoding: "utf8" });
        }
    });
}
