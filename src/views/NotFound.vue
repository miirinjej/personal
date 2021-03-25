<template>
  <main class="p-not-found">
    <h1>{{ t('heading') }}</h1>
    <p>{{ t('description') }}</p>
    <ul class="c-list">
      <li
        v-for="reason in reasons"
        :key="reason"
        class="c-list__item"
      >
        {{ t(`reasons.${reason}`) }}
      </li>
    </ul>
    <p>{{ t('callToAction') }}</p>
    <BaseSearch />
    <BaseMenu
      :locale="globalLocale"
      :menu-items="helpfulLinks"
    />
  </main>
</template>

<script>
  import { computed } from 'vue';

  import BaseMenu from '@/components/BaseMenu.vue';
  import BaseSearch from '@/components/BaseSearch.vue';
  import enums from '@/enums';
  import useScopedLocale from '@/composables/use-scoped-locale';
  // locales
  import en from '@/locales/not-found.en.json';
  import ru from '@/locales/not-found.ru.json';

  const { NAME } = enums.ROUTING;

  const {
    EN,
    RU,
    SCOPE,
  } = enums.LOCALES;

  export default {
    name: 'NotFound',
    components: {
      BaseMenu,
      BaseSearch,
    },

    props: {
      fallbackRouteName: {
        type: String,
        default: NAME.ARTICLES,
      },
    },

    setup(properties) {
      const {
        globalLocale,
        globalI18n,
        localI18n,
      } = useScopedLocale(SCOPE.NOT_FOUND, [[EN, en], [RU, ru]]);

      const helpfulLinks = computed(() => [
        {
          name: properties.fallbackRouteName,
          title: globalI18n.t('labels.back'),
        },
        {
          name: NAME.ARTICLES,
          title: globalI18n.t('labels.home'),
        },
        {
          name: NAME.SITEMAP,
          title: globalI18n.t('labels.sitemap'),
        },
      ]);

      const reasons = Object.keys(en.reasons);

      return {
        globalLocale,
        helpfulLinks,
        reasons,
        t: localI18n.t,
      };
    },
  };
</script>

<style lang="scss">
</style>
