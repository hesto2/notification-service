import express from 'express';
import {
  useCommonMiddleware,
  errorHandler,
  useNotFoundHandler,
} from '@hesto2/express-utils';
import * as Sentry from '@sentry/node';
import api from './api';

const getApp = () => {
  const app = express();
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
    ],
    tracesSampleRate: 1.0,
  });
  app.use(Sentry.Handlers.requestHandler());
  useCommonMiddleware(app);

  app.use('/api', api);

  useNotFoundHandler(app);
  app.use(Sentry.Handlers.errorHandler());
  app.use(errorHandler);
  return app;
};

export default getApp;
