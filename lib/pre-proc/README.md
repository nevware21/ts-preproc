<h1 align="center">@nevware21/ts-preproc</h1>
<h2 align="center">A simple pre-processor for TypeScript files using syntax simular to the C preprocessor</h2>

![GitHub Workflow Status (main)](https://img.shields.io/github/actions/workflow/status/nevware21/ts-preproc/ci.yml?branch=main)
[![codecov](https://codecov.io/gh/nevware21/ts-preproc/branch/main/graph/badge.svg?token=KA05820FMO)](https://codecov.io/gh/nevware21/ts-preproc)
[![npm version](https://badge.fury.io/js/%40nevware21%2Fts-preproc.svg)](https://badge.fury.io/js/%40nevware21%2Fts-preproc)
[![downloads](https://img.shields.io/npm/dt/%40nevware21/ts-preproc.svg)](https://www.npmjs.com/package/%40nevware21/ts-preproc)
[![downloads](https://img.shields.io/npm/dm/%40nevware21/ts-preproc.svg)](https://www.npmjs.com/package/%40nevware21/ts-preproc)

## Description

This package provides a simple pre-processor which can be run against your TypeScript files using single line comments
to comment out the code which does not "pass" the pre-processor directives. The comments include additional details about
why the line(s) where commented out and these comments are also used to identify and revert your source files back to the
original form.

It also has a configuration file which can use used to switch the definition state to enable building multiple variants from
a single common source file, or to enable exposing debug hooks only during a debug build.

## Directives

Directives may be nested, so multiple states may be evaluated to true or false and cause the different
flow of control to be used.

Each directive conforms to the following regex `^(\s*)\/\/\s{0,1}#([^:].*)$`, where all directives must
be preceeded by only spaces and are included in standard single line comment, and the directive may have
at most 1 single space.

```ebnf
Directive = "#" ("if" | "ifdef" | "ifndef" | "else" | "elif" | "endif" | "define" | "undef") DirectiveBody;

DirectiveBody = { Any } [ ":" Comment ];

Any = ? any character except newline or ":" ?;

Comment = ? any character except newline ?;
```
```ts
//#<Directive>
//#<Directive>:<Comment>
// #<Directive>
// #<Directive>:<Comment>
```

### #if

Evaluates the provided expression, the expression can be any valid JavaScript boolean operation.
The expression may include 

Each directive must be ended with the `//#endif` otherwise the state will apply to the end of the
current file.

```ts
//#if Expression
...
//#endif

//#if(Expression)
...
//#endif
```

### #ifdef

Evaluates whether the defined name exists, this does not evaluate the value of the definition only
whether it has been defined. Even if the value is an empty string this will still evaluate to true.

Each directive must be ended with the `//#endif` otherwise the state will apply to the end of the
current file.

```ts
//#ifdef VALUE
...
//#endif

//#ifdef(VALUE)
...
//#endif
```

### #ifndef

Evaluates whether the defined name does not exists, the value is not used only the presence or absence
of the defined name..

Each directive must be ended with the `//#endif` otherwise the state will apply to the end of the
current file.

```ts
//#ifndef VALUE
...
//#endif

//#ifndef(VALUE)
...
//#endif
```

### else

This directive may be used during the evaluation of `#ifdef`, `#ifndef` or `#if` and will apply to the
most recent instance and effectively negates the previous state, if placed after an `#endif` then it
will apply to the previous outer evaluation.

```ts
//#ifdef SOME_DEF
console.log("Some Def")
//#else
console.log("Some def not defined");
//#endif

//#ifdef VALUE1
console.log("value 1");
//#ifdef VALUE2
console.log("value 2");
//#else
console.log("not value 2");
//#endif
//#endif
```

### elif

This directive is only evaluated if the preceeding `#if`, `#ifdef` or `#ifndef` evaluates to `false` at
which point the Expression is evaluated.

```ts
//#ifdef VALUE1
console.log("value 1");
//#elif VALUE2
console.log("value 2");
//#else
console.log("not value 2");
//#endif
```

### #endif

This directive is used to terminate any previous `#if`, `#ifdef` or `#ifndef`.

See previous examples for the usage.

### #define

This directive is used to define (or overwrite) any previous definition.

```ts
//#define NEW_VALUE 1
```

### #undef

This directive is used to un-define (remove) the named definition. 

## Configuration file

The configuration may define:

- Groups of source folders
- Named sets of definitions which can contain pre-defined defined values.
- Identifies the default Group and identified definitions.

The configuration file may include single line comments

```json
// ------------------------------
// Pre-processing group definitions
// ------------------------------
{
    "repoRoot": "../../..",
    "default": {
        "group": "ts-async",        // The source group
        "definition": "prod"        // comma separated list of definition groups
    },
    "groups": {
        "ts-async": [
            "./lib/src"
        ]
    },
    "definitions": {
        "prod": {
        },
        "debug": {
            "DEBUG": true
        },
        "test": {
            "TEST": true
        }
    }
}
```

#### Examples

```ts

//#ifdef DEBUG
import { _debugLog } from "./debug";
//#endif

//#ifdef TEST
//#define NOT_TEST 1
//#undef TEST_MODE
//#elif DEBUG
//#define TEST_MODE 1
//#undef 
//#endif

//#ifndef DEBUG
console.log("Not in debug mode)
//#endif
```

When processed and the evaluations are evaluated as `false` all lines of the code between the if directive
and the `#endif` will include a comment indicating why the code was "removed" (commented out)

```ts
//#ifdef DEBUG
//#:(!DEBUG) import { _debugLog } from "./debug";
//#endif
```
