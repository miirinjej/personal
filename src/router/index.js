import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router';

import { loadLocaleMessages, setI18nLanguage } from '@/i18n';
import Articles from '@/views/Articles.vue';
import enums from '@/enums';
import isServer from '@/helpers/is-server';

const {
  PATH,
  NAME,
  ALIAS,
} = enums.ROUTING;

export default function createUniversalRouter(i18n, store) {
  const history = isServer
    ? createMemoryHistory()
    : createWebHistory();

  const routes = [
    {
      path: `/:locale${PATH.ARTICLES}`,
      name: NAME.ARTICLES,
      component: Articles,
      alias: `/:locale${ALIAS.ARTICLES}`,
    },
    {
      path: `/:locale${PATH.PROJECTS}`,
      name: NAME.PROJECTS,
      component: () => import('@/views/Projects.vue'),
    },
    {
      path: `/:locale${PATH.HIRE}`,
      name: NAME.HIRE,
      component: () => import('@/views/Hire.vue'),
    },
    {
      path: `/:locale${PATH.ABOUT}`,
      name: NAME.ABOUT,
      component: () => import('@/views/About.vue'),
    },
    {
      path: `/:locale${PATH.CONTACT}`,
      name: NAME.CONTACT,
      component: () => import('@/views/Contact.vue'),
    },
    {
      path: `/:locale${PATH.SITEMAP}`,
      name: NAME.SITEMAP,
      component: () => import('@/views/Sitemap.vue'),
    },
    {
      path: `/:locale${PATH.NOT_FOUND}`,
      name: NAME.NOT_FOUND,
      component: () => import('@/views/NotFound.vue'),
      props: true,
    },
  ];

  const router = createRouter({
    history,
    linkActiveClass: 'is-active',
    linkExactActiveClass: 'is-exact-active',
    routes,
  });

  router.beforeEach(async (to, from, next) => {
    const fallbackRouteName = from.name || NAME.ARTICLES;

    const currentLocale = i18n.mode === 'legacy'
      ? i18n.global.locale
      : i18n.global.locale.value;

    const notFoundRoute = {
      name: NAME.NOT_FOUND,
      params: {
        fallbackRouteName, // pass property to views/NotFound.vue
        locale: currentLocale,
      },
    };

    const paramsLocale = to.params.locale;

    if (to.matched.length === 0) {
      if (to.path === '/') {
        return next({
          name: NAME.ARTICLES,
          params: {
            locale: currentLocale,
          },
        });
      }

      return next(notFoundRoute);
    }

    if (!enums.LOCALES.SUPPORTED_LOCALES.includes(paramsLocale)) {
      return next(notFoundRoute);
    }

    if (!i18n.global.availableLocales.includes(paramsLocale)) {
      await loadLocaleMessages(i18n, paramsLocale, store);
    }

    setI18nLanguage(i18n, paramsLocale);

    return next();
  });

  return router;
}
