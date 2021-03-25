/* eslint-disable no-console */

const express = require('express');
const fs = require('fs');
const path = require('path');

const isTest = process.env.NODE_ENV === 'test' || Boolean(process.env.VITE_TEST_BUILD);

async function createServer(
  root = process.cwd(),
  isProduction = process.env.NODE_ENV === 'production',
) {
  const resolve = (innerPath) => path.resolve(__dirname, innerPath);

  const productionIndex = isProduction
    ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
    : '';

  const manifest = isProduction
    ? require('./dist/client/ssr-manifest.json')
    : {};

  const app = express();

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite;

  if (isProduction) {
    app.use(require('compression')());
    app.use(
      require('serve-static')(resolve('dist/client'), {
        index: false,
      }),
    );
  } else {
    vite = await require('vite').createServer({
      root,
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: true,
      },
    });

    // use vite's connect instance as middleware
    app.use(vite.middlewares);
  }

  app.use('*', async (request, response) => {
    try {
      const url = request.originalUrl;

      let template;
      let render;

      if (isProduction) {
        template = productionIndex;
        render = require('./dist/server/server-entry.js').default;
      } else {
        // always read fresh template in dev
        template = fs.readFileSync(resolve('index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/src/server-entry.js')).default;
      }

      const [appHtml, preloadLinks] = await render(url, manifest);

      const html = template
        .replace('<!--preload-links-->', preloadLinks)
        .replace('<!--app-html-->', appHtml);

      response
        .status(200)
        .set({ 'Content-Type': 'text/html' })
        .end(html);
    } catch (error) {
      vite.ssrFixStacktrace(error);
      console.log(error.stack);
      response.status(500).end(error.stack);
    }
  });

  return {
    app,
    vite,
  };
}

if (!isTest) {
  (async () => {
    try {
      const { app } = await createServer();
      const port = process.env.PORT || 3000;
      const host = process.env.HOST || '0.0.0.0';
      const locale = process.env.LOCALE || 'en';

      app.listen(
        port,
        host,
        () => {
          console.log(`http://${host}:${port}/${locale}/`);
        },
      );
    } catch (error) {
      console.log(error);
    }
  })();
}

// for test use
exports.createServer = createServer;
