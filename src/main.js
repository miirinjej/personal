import { createSSRApp } from 'vue';

import { getDefaultLocale, setupI18n } from '@/i18n';
import App from '@/App.vue';
import createUniversalRouter from '@/router';
import createUniversalStore from '@/store';
import enums from '@/enums';
// locales
import en from '@/locales/en.json';
import ru from '@/locales/ru.json';

const { EN } = enums.LOCALES;

export default function createUniversalApp() {
  const app = createSSRApp(App);

  const i18n = setupI18n({
    globalInjection: true,
    legacy: false,
    locale: getDefaultLocale(),
    fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE || EN,
    messages: {
      en,
      ru,
    },
  });

  const store = createUniversalStore();
  const router = createUniversalRouter(i18n, store);

  app
    .use(i18n)
    .use(store)
    .use(router);

  return {
    app,
    i18n,
    store,
    router,
  };
}
