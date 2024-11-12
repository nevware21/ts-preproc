/*
 * @nevware21/ts-build-tools
 * https://github.com/nevware21/ts-build-tools
 *
 * Copyright (c) 2023 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

import { IStateContext } from "./IStateContext";

export interface IPreProcArgs {
    cwd: string;
    preProcDef: string;
    repoRoot: string;
    sourceGroup: string;
    definitionGroups: string[];
    cfgRepoRoot: string;
    restoreOnly: boolean;
    globalContext: IStateContext;
}
