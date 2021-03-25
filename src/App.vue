<template>
  <div class="l-container">
    <router-view />
    <TheErrorHandler />
  </div>
</template>

<script>
  import TheErrorHandler from '@/components/TheErrorHandler.vue';

  export default {
    components: {
      TheErrorHandler,
    },
  };
</script>
