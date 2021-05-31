<template>
  <nav class="c-menu">
    <router-link
      v-for="{ name, title } in menuItems"
      :key="name"
      class="c-menu__item"
      :to="{ name, params: { locale } }"
    >
      {{ title }}
    </router-link>
  </nav>
</template>

<script>
  export default {
    name: 'BaseMenu',
    props: {
      locale: {
        type: String,
        required: true,
      },

      menuItems: {
        type: Array,
        required: true,
        validator(menuItems) {
          for (const menuItem of menuItems) {
            if (typeof menuItem.name !== 'string') {
              return false;
            }

            if (typeof menuItem.title !== 'string') {
              return false;
            }
          }

          return true;
        },
      },
    },
  };
</script>

<style lang="scss">
</style>
