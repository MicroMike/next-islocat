const express = require('express')
const next = require('next')
const mongoose = require('mongoose')
const path = require('path')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000;
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/mern-starter'

import React from 'react';
import { renderToString } from 'react-dom/server';

import { Provider } from 'react-redux';
import StaticRouter from 'react-router-dom/StaticRouter';

import IntlWrapper from '../modules/Intl/IntlWrapper'
import { matchRoutes, renderRoutes } from 'react-router-config';
import { configureStore } from '../client/store';
import routes from '../client/routes';

const store = configureStore({});

// MongoDB Connection
mongoose.connect(mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
});

import router from './routes'

app.prepare()
  .then(() => {
    const server = express()

    server.use('/api', router)
    server.use(express.static(path.resolve(__dirname, '../.next/static')));
    server.use('/_next/-', express.static(path.resolve(__dirname, '../.next/bundles/pages')));
    server.use('/_next/', express.static(path.resolve(__dirname, '../.next')));

    server.get('*', (req, res) => {
      const branch = matchRoutes(routes, req.url);

      let context = {};
      const content = renderToString(
        <Provider store={store}>
          <IntlWrapper >
            <StaticRouter location={req.url} context={context}>
              {renderRoutes(routes)}
            </StaticRouter>
          </IntlWrapper>
        </Provider>
      );

      res
        .set('Content-Type', 'text/html')
        .status(200)
        .end(content);
    });

    server.listen(port, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:' + port)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })