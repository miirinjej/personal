<template>
  <div class="c-error-handler">
    <template v-if="hasError">
      {{ errors }}
    </template>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'TheErrorHandler',
    computed: {
      hasError() {
        return Array.isArray(this.errors) && this.errors.length > 0;
      },

      ...mapState('errors', ['errors']),
    },

    methods: {
      ...mapActions('errors', ['handleError']),
    },
  };
</script>

<style lang="scss">
</style>
