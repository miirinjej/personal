import { createI18n } from 'vue-i18n';
import { nextTick } from 'vue';

import enums from '@/enums';
import hasStorage from '@/helpers/has-storage';
import isServer from '@/helpers/is-server';

const {
  EN,
  SUPPORTED_LOCALES,
} = enums.LOCALES;

async function loadLocaleMessages(i18n, locale, store) {
  try {
    const messages = await import(`./locales/${locale}.json`);

    i18n.global.setLocaleMessage(locale, messages.default);
  } catch (error) {
    if (!isServer) {
      store.dispatch('errors/setError', error);
    }
  }

  return nextTick();
}

async function loadScopedLocaleMessages(i18n, locale, scope, store) {
  try {
    const messages = await import(`./locales/${scope}.${locale}.json`);

    i18n.setLocaleMessage(locale, messages.default);
  } catch (error) {
    if (!isServer) {
      store.dispatch('errors/setError', error);
    }
  }

  return nextTick();
}

function setI18nLanguage(i18n, locale) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale;
  } else {
    i18n.global.locale.value = locale;
  }

  if (!isServer) {
    document.querySelector('html').setAttribute('lang', locale);
  }
}

function setupI18n(options) {
  const i18n = createI18n(options);

  setI18nLanguage(i18n, options.locale);

  return i18n;
}

function getDefaultLocale() {
  if (!isServer) {
    if (hasStorage()) {
      const defaultLocale = localStorage.getItem('defaultLocale');

      if (SUPPORTED_LOCALES.includes(defaultLocale)) {
        return defaultLocale;
      }
    }

    const navigatorLanguage = navigator.language.split('-')[0];

    if (SUPPORTED_LOCALES.includes(navigatorLanguage)) {
      return navigatorLanguage;
    }
  }

  return import.meta.env.VITE_I18N_LOCALE || EN;
}

function setDefaultLocale(locale, store) {
  try {
    localStorage.setItem('defaultLocale', locale);
  } catch (error) {
    store.dispatch('errors/setError', error);
  }
}

export {
  loadLocaleMessages,
  loadScopedLocaleMessages,
  setI18nLanguage,
  setupI18n,
  getDefaultLocale,
  setDefaultLocale,
};
