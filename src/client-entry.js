import createUniversalApp from '@/main';

(async () => {
  const {
    app,
    router,
  } = createUniversalApp();

  await router.isReady();

  const instance = app.mount('#app', true);

  // workaround for vue-devtools
  // eslint-disable-next-line no-underscore-dangle
  app._container._vnode = instance.$.vnode;
})();
