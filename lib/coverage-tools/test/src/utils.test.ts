/*
 * @nevware21/ts-build-tools
 * https://github.com/nevware21/ts-build-tools
 *
 * Copyright (c) 2022 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { expect } from "@nevware21/tripwire";
import { findRepoRoot, removeComments, removeJsonTrailingComma } from "../../src/utils";

describe("utils", () => {
    it("should not trailing comma", () => {
        expect(removeJsonTrailingComma("hello,")).equals("hello,");
    });

    it("should remove trailing comma", () => {
        expect(removeJsonTrailingComma("hello, ")).equals("hello, ");
    });

    it("should remove trailing comma", () => {
        expect(removeJsonTrailingComma("{ \"hello\": \"darkness\", }")).equals("{ \"hello\": \"darkness\" }");
    });

    it("should remove comments", () => {
        expect(removeComments("hello// test")).equals("hello");
    });

    it("should remove comments", () => {
        expect(removeComments("hello// test\ndarkness")).equals("hello\ndarkness");
    });

    it("should remove comments", () => {
        expect(removeComments("hello// test\ndarkness// test\n")).equals("hello\ndarkness");
    });

    it("should remove comments", () => {
        expect(removeComments("hello// test\ndarkness// test\n// test\n")).equals("hello\ndarkness");
    });

    it("should remove comments", () => {
        expect(removeComments("hello// test\ndarkness// test\n// test\n// test\n")).equals("hello\ndarkness");
    });

    it("should remove comments", () => {
        expect(removeComments("hello// test \ndarkness// test\n// test\n// test\n// test\n")).equals("hello\ndarkness");
    });

    it("should remove comments", () => {
        expect(removeComments("hello// test\ndarkness// test\n// test\n// test\n// test\n// test\n")).equals("hello\ndarkness");
    });

    it("should remove comments", () => {
        expect(removeComments("hello// test\ndarkness// test\n// test\n// test\n// test\n// test\n// test\n")).equals("hello\ndarkness");
    });

    it ("should remove leading comments", () => {
        expect(removeComments("// test\nhello")).equals("\nhello");
    });

    it ("should remove leading comments", () => {
        expect(removeComments("// test\n// test\nhello")).equals("\nhello");
    });

    it ("should remove leading comments", () => {
        expect(removeComments("// test\n// test\nhello//inline\ndarkness")).equals("\nhello\ndarkness");
    });
});

describe("findRepoRoot", () => {
    it("should find repo root", () => {
        expect(findRepoRoot("")).equals("../..");
        expect(findRepoRoot(".")).equals("../..");
        expect(findRepoRoot("./")).equals("../..");
        expect(findRepoRoot("../")).equals("../..");
        expect(findRepoRoot("../..")).equals("../..");
        expect(findRepoRoot("../../")).equals("../..");
        expect(findRepoRoot("./../../")).equals("./../..");
        expect(findRepoRoot("../../.")).equals("../..");
        expect(findRepoRoot("../../..")).equals(null);
    });
});

