/*
 * @nevware21/ts-build-tools
 * https://github.com/nevware21/ts-build-tools
 *
 * Copyright (c) 2024 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { objDefineProps } from "@nevware21/ts-utils";
import { IParseState } from "./interfaces/IParseState";
import { IParseArgsOptions } from "./interfaces/IParseArgsOptions";

export function createParseState<V>(argv: string[], opts: IParseArgsOptions): IParseState<V> {
    let idx = 0;
    let isFailed = false;
    let stopProcessing = false;
    let errors: string[] = [];
    let warnings: string[] = [];

    function nextArg(): string {
        if (idx <= argv.length) {
            return argv[idx++];
        }

        return null;
    }

    function stopParsing(): void {
        stopProcessing = true;
    }

    function addError<T>(message: string, opts: IParseArgsOptions): boolean {
        isFailed = true;
        errors.push(message);
    
        if (opts.handleError) {
            let result = opts.handleError(message);
            if (result) {
                stopProcessing = true;
            }

            return result;
        }
    
        if (opts.failOnError) {
            stopProcessing = true;
            throw new Error(message);
        }
    
        return false;
    }

    function addWarning(message: string): void {
        warnings.push(message);

        if (opts.handleWarning) {
            opts.handleWarning(message);
        }
    }

    function addSwitch(arg: IArg): void {
        if (opts.switchHandler) {
            opts.switchHandler(arg);
        }
    }

    function addArg(arg: IArg): void {
        if (opts.argHandler) {
            opts.argHandler(arg);
        }
    }

    let theState = objDefineProps<IParseState<V>>({
        next: nextArg,
        stop: stopParsing,
        error: addError,
        warn: addWarning,
        addSwitch: addSwitch,
        addArg: addArg,
    } as IParseState<V>, {
        isDone: {
            g: () => stopProcessing || idx >= argv.length,
        },
        isFailed: { g: () => isFailed },
        errors: { g: () => errors },
        warnings: { g: () => warnings }
    });

    if (opts.minArgs && argv.length < opts.minArgs) {
        theState.error(`Expected at least ${opts.minArgs} arguments, but got ${argv.length}`);
    }

    return theState;
}
