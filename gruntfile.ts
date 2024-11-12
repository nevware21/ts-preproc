/*
 * ts-build-tools
 * https://github.com/nevware21/ts-build-tools
 *
 * Copyright (c) 2022 NevWare21 Solutions LLC
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                "Gruntfile.js",
                "<%= nodeunit.tests %>"
            ],
            options: {
                jshintrc: ".jshintrc"
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ["tmp"]
        },

        // Unit tests.
        nodeunit: {
            tests: ["test/*_test.js"]
        },
        ts: {
            options: {
                debug: true,
                logOutput: true
            },
            "pre-proc": {
                // Default ES5
                tsconfig: [
                    {
                        name: "./lib/pre-proc/tsconfig.json",
                        tsconfig: {
                            compilerOptions: {
                                target: "es5",
                                declaration: true,
                                declarationDir: "./build/types",
                                removeComments: false,
                                outDir: "./build/es5"
                            }
                        },
                        outDir: "./lib/pre-proc/build/es5/mod"
                    },
                    {
                        name:"./lib/pre-proc/tsconfig.json",
                        tsconfig: {
                            compilerOptions: {
                                target: "es6",
                                outDir: "./build/es6"
                            }
                        },
                        outDir: "./lib/pre-proc/build/es6/mod"
                    }
                ]
            },
            "pre-proc-test": {
                tsconfig: "./lib/pre-proc/test/tsconfig.test.json",
                outDir: "./lib/pre-proc/test-esm"
            },
            "publish-npm": {
                // Default ES5
                tsconfig: [
                    {
                        name: "./lib/publish-npm/tsconfig.json",
                        tsconfig: {
                            compilerOptions: {
                                target: "es5",
                                declaration: true,
                                declarationDir: "./build/types",
                                removeComments: false,
                                outDir: "./build/es5"
                            }
                        },
                        outDir: "./lib/publish-npm/build/es5/mod"
                    },
                    {
                        name:"./lib/publish-npm/tsconfig.json",
                        tsconfig: {
                            compilerOptions: {
                                target: "es6",
                                outDir: "./build/es6"
                            }
                        },
                        outDir: "./lib/publish-npm/build/es6/mod"
                    }
                ]
            },
            "publish-npm-test": {
                tsconfig: "./lib/publish-npm/test/tsconfig.test.json",
                outDir: "./lib/publish-npm/test-esm"
            },
            "coverage-tools": {
                // Default ES5
                tsconfig: [
                    {
                        name: "./lib/coverage-tools/tsconfig.json",
                        tsconfig: {
                            compilerOptions: {
                                target: "es5",
                                declaration: true,
                                declarationDir: "./build/types",
                                removeComments: false,
                                outDir: "./build/es5"
                            }
                        },
                        outDir: "./lib/coverage-tools/build/es5/mod"
                    },
                    {
                        name:"./lib/coverage-tools/tsconfig.json",
                        tsconfig: {
                            compilerOptions: {
                                target: "es6",
                                outDir: "./build/es6"
                            }
                        },
                        outDir: "./lib/coverage-tools/build/es6/mod"
                    }
                ]
            }
        },
        "lint": {
            options: {
                format: "codeframe",
                suppressWarnings: false,
                logOutput: true
            },
            "pre-proc": {
                tsconfig: "./lib/pre-proc/tsconfig.json",
                ignoreFailures: true
            },
            "pre-proc-test": {
                tsconfig: "./lib/pre-proc/test/tsconfig.test.json",
                ignoreFailures: true
            },
            "pre-proc-fix": {
                options: {
                    tsconfig: "./lib/pre-proc/tsconfig.json",
                    fix: true
                }
            },
            "pre-proc-test-fix": {
                options: {
                    tsconfig: "./lib/pre-proc/test/tsconfig.test.json",
                    fix: true
                }
            },
            "publish-npm": {
                tsconfig: "./lib/publish-npm/tsconfig.json",
                ignoreFailures: true
            },
            "publish-npm-test": {
                tsconfig: "./lib/publish-npm/test/tsconfig.test.json",
                ignoreFailures: true
            },
            "publish-npm-fix": {
                options: {
                    tsconfig: "./lib/publish-npm/tsconfig.json",
                    fix: true
                }
            },
            "publish-npm-test-fix": {
                options: {
                    tsconfig: "./lib/publish-npm/test/tsconfig.test.json",
                    fix: true
                }
            },
            "coverage-tools": {
                tsconfig: "./lib/coverage-tools/tsconfig.json",
                ignoreFailures: true
            },
            "coverage-tools-fix": {
                options: {
                    tsconfig: "./lib/coverage-tools/tsconfig.json",
                    fix: true
                }
            }
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadNpmTasks("@nevware21/grunt-ts-plugin");
    grunt.loadNpmTasks("@nevware21/grunt-eslint-ts");

    grunt.registerTask("rollupuglify", ["ts:rollupuglify" ]);
    grunt.registerTask("pre-proc", [ "lint:pre-proc-fix", "lint:pre-proc-test-fix", "ts:pre-proc", "ts:pre-proc-test" ]);
    grunt.registerTask("pre-proc-test", [ "lint:pre-proc-test-fix", "ts:pre-proc-test" ]);
    grunt.registerTask("pre-proc-lint", [ "lint:pre-proc-fix", "lint:pre-proc-test-fix" ]);

    grunt.registerTask("publish-npm", [ "lint:publish-npm-fix", "lint:publish-npm-test-fix", "ts:publish-npm", "ts:publish-npm-test" ]);
    grunt.registerTask("publish-npm-test", [ "lint:publish-npm-test-fix", "ts:publish-npm-test" ]);
    grunt.registerTask("publish-npm-lint", [ "lint:publish-npm-fix", "lint:publish-npm-test-fix" ]);

    grunt.registerTask("coverage-tools", [ "lint:coverage-tools-fix", "ts:coverage-tools" ]);
    grunt.registerTask("coverage-tools-lint", [ "lint:coverage-tools-fix" ]);

    grunt.registerTask("dolint", [ "lint:pre-proc", "lint:pre-proc-test", "lint:publish-npm", "lint:publish-npm-test", "lint:coverage-tools" ]);
    grunt.registerTask("lint-fix", [ "lint:pre-proc-fix", "lint:pre-proc-test-fix", "lint:publish-npm-fix", "lint:publish-npm-test-fix", "lint:coverage-tools-fix" ]);
    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    // grunt.registerTask('pre-proc_test', ['clean', 'pre-proc']);

    // By default, lint and run all tests.
    grunt.registerTask("default", ["jshint" ]);
};
