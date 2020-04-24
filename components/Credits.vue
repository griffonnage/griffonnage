<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p class="heading">{{ $t('credits.version') }} {{ appVersion }}</p>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      appVersion: process.env.APP_VERSION,
    }
  },
})
</script>
