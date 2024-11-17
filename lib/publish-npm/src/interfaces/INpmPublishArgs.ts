/*
 * @nevware21/ts-build-tools
 * https://github.com/nevware21/ts-build-tools
 *
 * Copyright (c) 2022 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

export interface INpmPublishArgs {
    publishGroupDef: string | null;
    repoRoot: string;
    publishGroup: string | null;
    dryRun: string;
}
