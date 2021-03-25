import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';

import { loadScopedLocaleMessages } from '@/i18n';

export default function useScopedLocale(scope, messages) {
  const globalI18n = useI18n({ useScope: 'global' });
  const globalLocale = ref(globalI18n.locale);
  const store = useStore();

  const localI18n = useI18n({
    messages: Object.fromEntries(messages),
    useScope: 'local',
  });

  async function loadLocalLocaleMessages(locale) {
    if (!localI18n.availableLocales.includes(locale)) {
      await loadScopedLocaleMessages(localI18n, locale, scope, store);
    }
  }

  (async () => {
    await loadLocalLocaleMessages(globalLocale.value);
  })();

  watch(globalLocale, async (currentLocale) => {
    await loadLocalLocaleMessages(currentLocale);
  });

  return {
    globalI18n,
    globalLocale,
    localI18n,
  };
}
