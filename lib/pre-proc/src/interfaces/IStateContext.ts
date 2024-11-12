/*
 * @nevware21/ts-build-tools
 * https://github.com/nevware21/ts-build-tools
 *
 * Copyright (c) 2023 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { IState } from "./IState";

export interface IStateContext {
    defs: { [key: string]: any},
    states: IState[];
}