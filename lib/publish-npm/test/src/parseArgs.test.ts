/*
 * @nevware21/ts-build-tools
 * https://github.com/nevware21/ts-build-tools
 *
 * Copyright (c) 2022 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { expect } from "@nevware21/tripwire";
import { parseArgs } from "../../src/parseArgs";
import { INpmPublishArgs } from "../../src/interfaces/INpmPublishArgs";


describe("parseArgs", () => {
    let originalArgv: string[];

    beforeEach(() => {
        originalArgv = process.argv;
        process.argv = ["node", "script"];
    });

    afterEach(() => {
        process.argv = originalArgv;
    });

    it("test invalid number of arguments", () => {
        process.argv = [];
        const result = parseArgs();
        expect(result).to.be.null();
    });

    it("should return null if no arguments are provided", () => {
        const result = parseArgs();
        expect(result).deep.equals({
            publishGroupDef: "../publish-groups.json",
            repoRoot: "",
            publishGroup: null,
            dryRun: ""
        });
    });

    it("should set dryRun to '--dry-run' if '-test' argument is provided", () => {
        process.argv.push("-test");
        const result = parseArgs();
        expect(result).deep.equals({
            publishGroupDef: "../publish-groups.json",
            repoRoot: "",
            publishGroup: null,
            dryRun: "--dry-run"
        } as INpmPublishArgs);
    });

    it("should set publishGroup if a non-switch argument is provided", () => {
        process.argv.push("my-publish-group");
        const result = parseArgs();
        expect(result).deep.equals({
            publishGroupDef: "../publish-groups.json",
            repoRoot: "",
            publishGroup: "my-publish-group",
            dryRun: ""
        } as INpmPublishArgs);
    });

    it("should return null if an unknown switch is provided", () => {
        process.argv.push("-unknown");
        const result = parseArgs();
        expect(result).to.be.null();
    });

    it("should return null if multiple non-switch arguments are provided", () => {
        process.argv.push("group1", "group2");
        const result = parseArgs();
        expect(result).to.be.null();
    });
});




























































