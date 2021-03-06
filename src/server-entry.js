import { renderToString } from '@vue/server-renderer';

import createUniversalApp from '@/main';

function renderPreloadLink(file) {
  if (file.endsWith('.js')) {
    return `<link rel="modulepreload" href="${file}" crossorigin>`;
  }

  if (file.endsWith('.css')) {
    return `<link rel="stylesheet" href="${file}">`;
  }

  return '';
}

function renderPreloadLinks(modules, manifest) {
  const seen = new Set();
  let links = '';

  modules.forEach((id) => {
    const files = manifest[id];

    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file);
          links += renderPreloadLink(file);
        }
      });
    }
  });

  return links;
}

export default async function render(url, manifest) {
  const {
    app,
    router,
  } = createUniversalApp();

  // set the router to the desired URL before rendering
  await router.push(url);
  await router.isReady();

  // passing SSR context object which will be available via useSSRContext()
  // @vitejs/plugin-vue injects code into a component's setup() that registers
  // itself on ctx.modules. After the render, ctx.modules would contain all the
  // components that have been instantiated during this render call.
  const context = {};

  const html = await renderToString(app, context);

  // the SSR manifest generated by Vite contains module -> chunk/asset mapping
  // which we can then use to determine what files need to be preloaded for this
  // request.
  const preloadLinks = renderPreloadLinks(context.modules, manifest);

  return [html, preloadLinks];
}
