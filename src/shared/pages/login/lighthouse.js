/* eslint-disable camelcase */
import lighthouse from 'lighthouse';
import chromeLauncher from 'chrome-launcher';
import fs from 'fs';
import v from 'lighthouse-logger';


const launchChromeAndRunLighthouse = (url, options, config = null) => {
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

const createLighthouseHtmlFile = (url, options, fileName, config = null) => {
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
