/*
 * @nevware21/ts-build-tools
 * https://github.com/nevware21/ts-build-tools
 *
 * Copyright (c) 2023 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { objForEachKey } from "@nevware21/ts-utils";
import { IPreProcArgs } from "./interfaces/IPreArgs";

/**
 * Read the system environment variables and store them in theArgs unless
 * they are already defined.
 * @param theArgs
 */
export function readEnvs(theArgs: IPreProcArgs) {
    let ctx = theArgs.globalContext;
    if (ctx) {
        let defs = ctx.defs;
        if (!defs) {
            defs = {};
            ctx.defs = defs;
        }

        addDefinitions(theArgs, defs);
    }
}

export function addDefinitions(theArgs: IPreProcArgs, defs: { [key: string]: any }) {
    let ctx = theArgs.globalContext;
    if (ctx) {
        let ctxDefs = ctx.defs;
        if (!ctxDefs) {
            ctxDefs = {};
            ctx.defs = ctxDefs;
        }

        objForEachKey(defs, (key, value) => {
            if (!ctxDefs[key]) {
                ctxDefs[key] = value;
            }
        });
    }
}