<template>
  <div>
    <navbar />
    <nuxt />
    <credits />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Navbar from '~/components/Navbar.vue'
import Credits from '~/components/Credits.vue'

export default Vue.extend({
  components: {
    Navbar,
    Credits,
  },

  head() {
    return this.$nuxtI18nSeo()
  },
})
</script>
