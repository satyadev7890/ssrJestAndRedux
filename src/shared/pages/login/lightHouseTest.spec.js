/* eslint-disable no-underscore-dangle */
import { launchChromeAndRunLighthouse, createLighthouseHtmlFile } from './lighthouse';
import "babel-polyfill";

const timeout = 50000;

describe(
    'lightHouse',
    () => {
        it('Should be perform better', async () => {
            const opts = {
                chromeFlags: ['--show-paint-rects', '--headless'],
                output: 'json',
                saveAssets: true,
                onlyCategories: ['performance'],
                logLevel: 'info'
            };
            const config = {
                throttling: {
                    rttMs: 150,
                    throughputKbps: 1.6 * 1024,
                    cpuSlowdownMultiplier: 4
                }
            };
            const results = await launchChromeAndRunLighthouse('http://localhost:3000', opts);
            const obj = JSON.parse(results);
            const metrics = obj.audits.metrics.details.items;
            expect(metrics[0].firstContentfulPaint).toBeLessThan(2000);
            expect(metrics[0].firstMeaningfulPaint).toBeLessThan(1000);
        });
        // it('Should create html file', async () => {
        //     const secondaryOpts = {
        //         chromeFlags: ['--show-paint-rects', '--headless'],
        //         output: 'html',
        //         saveAssets: true,
        //         // onlyCategories: ['performance', 'seo', 'accessibility', 'pwa', 'best-practices'],
        //         onlyCategories: ['performance'],
        //         logLevel: 'info'
        //     };
        //     await createLighthouseHtmlFile('https://www.lowes.com/store/NC-Troutman/2750', secondaryOpts, 'storeDetailLighthouse.html');
        // });
    },
    timeout
);
