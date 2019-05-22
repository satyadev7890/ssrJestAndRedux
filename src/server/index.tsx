import express from 'express';
import cors from 'cors';
import { renderToString } from 'react-dom/server';
import App from '../shared/App';
import React from 'react';
import serialize from "serialize-javascript";
import routes from '../shared/routes';
import { matchPath, StaticRouter } from 'react-router-dom';

const app = express();

app.use(cors());
app.use(express.static('public'));

app.get('*', (req: any, res: any, next: any) => {
    const activeRoute = routes.find((route) => matchPath(req.url, route)) || {};

    const promise = activeRoute.fetchInitialData
        ? activeRoute.fetchInitialData(req.path)
        : Promise.resolve();

    promise.then((data: any) => {

        const context:any = { data };

        const markup: string = renderToString(
            <StaticRouter location={req.url} context={context}>
                <App/>
            </StaticRouter>
        );

        res.send(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>SSR with RR</title>
                    <link rel="stylesheet" href="/css/style.css">
                    <script src='/bundle.js' defer></script>
                    <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
                </head>
                <body>
                    <div id="app">${markup}<y/div>
                </body>
            </html>
        `);
    }).catch(next);
})

app.listen(3000, () => {
    console.log('server is running')
})