import { arrSlice } from '@nevware21/ts-utils';
import { showHelp } from "../../src/showHelp";
import { expect } from '@nevware21/tripwire';

describe('showHelp', () => {
    let originalArgv: string[];
    let orgLog: any;
    let consoleLog: string = "";

    beforeEach(() => {
        originalArgv = process.argv;
        process.argv = [...originalArgv];
        orgLog = console.log;
        console.log = function() {
            let args = arrSlice(arguments);
            consoleLog += args.join(' ');
        };
    });

    afterEach(() => {
        process.argv = originalArgv;
        console.log = orgLog;
    });

    it('should display help message with script name containing backslashes', () => {
        process.argv[1] = 'C:\\path\\to\\script.js';
        showHelp("C:\\path\\to\\script.js");
        expect(consoleLog).to.contain('');
        expect(consoleLog).to.contain('script.js [-c <coverage root>]');
        expect(consoleLog).to.contain('--------------------------');
        expect(consoleLog).to.contain('-C|-c <coverage root>');
    });

    it('should display help message with script name containing forward slashes', () => {
        process.argv[1] = '/path/to/script.js';
        showHelp("/path/to/script.js");
        expect(consoleLog).to.contain('');
        expect(consoleLog).to.contain('script.js [-c <coverage root>]');
        expect(consoleLog).to.contain('--------------------------');
        expect(consoleLog).to.contain('-C|-c <coverage root>');
    });

    it('should display help message with script name without slashes', () => {
        process.argv[1] = 'script.js';
        showHelp("script.js");
        expect(consoleLog).to.contain('');
        expect(consoleLog).to.contain('script.js [-c <coverage root>]');
        expect(consoleLog).to.contain('--------------------------');
        expect(consoleLog).to.contain('-C|-c <coverage root>');
    });
});