/*
 * @nevware21/ts-build-tools
 * https://github.com/nevware21/ts-build-tools
 *
 * Copyright (c) 2022 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import * as path from "path";
import { expect } from "@nevware21/tripwire";
import { getGroupProjects } from "../../src/groupProjects";
import { INpmPublishArgs } from "../../src/interfaces/INpmPublishArgs";

describe("getGroupProjects", () => {

    beforeEach(() => {
    });

    afterEach(() => {
    });

    it("should find the default groups project when not specified", () => {
        let publishArgs: INpmPublishArgs = {
            publishGroupDef: null,
            repoRoot: null as any,
            publishGroup: null,         // use the default
            dryRun: ""
        };

        const result = getGroupProjects(publishArgs);

        expect(result).to.not.be.null();
        expect(result.length).equals(3);
        expect(result).deep.equals([
            "./lib/pre-proc",
            "./lib/coverage-tools",
            "./lib/publish-npm"
        ]);
    });

    it("should find the return all groups", () => {
        let publishArgs: INpmPublishArgs = {
            publishGroupDef: null,
            repoRoot: null as any,
            publishGroup: "all",
            dryRun: ""
        };

        const result = getGroupProjects(publishArgs);

        expect(result).to.not.be.null();
        expect(result.length).equals(3);
        expect(result).deep.equals([
            "./lib/pre-proc",
            "./lib/coverage-tools",
            "./lib/publish-npm"
        ]);
    });

    it("should find the return no groups when invalid group name given", () => {
        let publishArgs: INpmPublishArgs = {
            publishGroupDef: null,
            repoRoot: null as any,
            publishGroup: "missing",
            dryRun: ""
        };

        const result = getGroupProjects(publishArgs);

        expect(result).to.not.be.null();
        expect(result.length).equals(0);
        expect(result).deep.equals([]);
    });

    it("should fail when the config file is not found", () => {
        let publishArgs: INpmPublishArgs = {
            publishGroupDef: "publish-missing.json",
            repoRoot: null as any,
            publishGroup: "all",
            dryRun: ""
        };

        expect(() => getGroupProjects(publishArgs)).to.throw();
    });

    it("should find the return all groups from the config file with no repo-root", () => {
        let publishArgs: INpmPublishArgs = {
            publishGroupDef: "./test/publish-groups-test.json",
            repoRoot: null as any,
            publishGroup: "all",
            dryRun: ""
        };

        const result = getGroupProjects(publishArgs);

        expect(result).to.not.be.null();
        expect(result.length).equals(3);
        expect(result).deep.equals([
            "./lib/pre-proc",
            "./lib/coverage-tools",
            "./lib/publish-npm"
        ]);

        expect(publishArgs.repoRoot).equals("../..");
    });
});
