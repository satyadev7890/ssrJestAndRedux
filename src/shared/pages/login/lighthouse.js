/* eslint-disable camelcase */
import "babel-polyfill";
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const log = require('lighthouse-logger');

function launchChromeAndRunLighthouse(url, options, config = null) {
    log.setLevel(options.logLevel);
    return chromeLauncher.launch({ chromeFlags: options.chromeFlags }).then((chrome) => {
        const opts = options;
        opts.port = chrome.port;
        return lighthouse(url, opts, config).then((results) => {
            const res = results.report;
            const name = 'lighthouseReport'+Date.now().toString()+'.json';
            fs.writeFile(name, res, (err) => {
                if (err) {
                    return console.log(err);
                }
                return null;
            });
            chrome.kill().then(() => results.lhr);
            if (res) {
                return res;
            }
            return null;
        });
    });
}

function createLighthouseHtmlFile(url, options, fileName, config = null) {
    log.setLevel(options.logLevel);
    return chromeLauncher.launch({ chromeFlags: options.chromeFlags }).then((chrome) => {
        const opts = options;
        opts.port = chrome.port;
        return lighthouse(url, opts, config).then((results) => {
            const res = results.report;
            fs.writeFile(fileName, res, (err) => {
                if (err) {
                    return console.log(err);
                }
                return null;
            });
            chrome.kill().then(() => results.lhr);
            return null;
        });
    });
}

export {
    launchChromeAndRunLighthouse,
    createLighthouseHtmlFile
};
