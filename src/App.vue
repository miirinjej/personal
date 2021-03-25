<template>
  <div class="l-container">
    <TheNavbar />
    <router-view />
    <TheErrorHandler />
  </div>
</template>

<script>
  import TheErrorHandler from '@/components/TheErrorHandler.vue';
  import TheNavbar from '@/components/TheNavbar.vue';

  export default {
    components: {
      TheErrorHandler,
      TheNavbar,
    },
  };
</script>
