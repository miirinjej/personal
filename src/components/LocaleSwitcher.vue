<template>
  <div class="c-locale-switcher">
    <label>
      <select v-model="globalLocale">
        <option
          v-for="supportedLocale in supportedLocales"
          :key="supportedLocale"
          :value="supportedLocale"
        >
          {{ label[supportedLocale] }}
        </option>
      </select>
    </label>
  </div>
</template>

<script>
  import { onUpdated, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';

  import enums from '@/enums';
  import { setDefaultLocale } from '@/i18n';

  const {
    LABEL,
    SUPPORTED_LOCALES,
  } = enums.LOCALES;

  export default {
    name: 'LocaleSwitcher',
    setup() {
      const router = useRouter();
      const globalI18n = useI18n({ useScope: 'global' });
      const globalLocale = ref(globalI18n.locale);
      const store = useStore();

      watch(router.currentRoute, (route) => {
        globalLocale.value = route.params.locale;
      });

      watch(globalLocale, (currentLocale) => {
        router.push({
          name: router.currentRoute.value.name,
          params: { locale: currentLocale },
        });
      });

      onUpdated(() => {
        setDefaultLocale(globalLocale.value, store);
      });

      return {
        globalLocale,
        label: LABEL,
        supportedLocales: SUPPORTED_LOCALES,
      };
    },
  };
</script>

<style lang="scss">
</style>
