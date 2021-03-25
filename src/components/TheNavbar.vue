<template>
  <header class="c-navbar">
    <BaseMenu
      :locale="$i18n.locale"
      :menu-items="menuItems"
    />
    <LocaleSwitcher />
  </header>
</template>

<script>
  import BaseMenu from '@/components/BaseMenu.vue';
  import LocaleSwitcher from '@/components/LocaleSwitcher.vue';
  import enums from '@/enums';

  const { NAME } = enums.ROUTING;

  export default {
    name: 'TheNavbar',
    components: {
      BaseMenu,
      LocaleSwitcher,
    },

    computed: {
      menuItems() {
        return [
          {
            name: NAME.ARTICLES,
            title: this.$t('labels.articles'),
          },
          {
            name: NAME.PROJECTS,
            title: this.$t('labels.projects'),
          },
          {
            name: NAME.HIRE,
            title: this.$t('labels.hire'),
          },
          {
            name: NAME.ABOUT,
            title: this.$t('labels.about'),
          },
          {
            name: NAME.CONTACT,
            title: this.$t('labels.contact'),
          },
        ];
      },
    },
  };
</script>

<style lang="scss">
</style>
