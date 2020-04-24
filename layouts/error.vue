<template>
  <section class="hero is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div v-if="statusCode === 404">
          <p class="title">
            {{ $t('error.pageNotFound.title') }}
          </p>

          <p class="subtitle">
            {{ $t('error.pageNotFound.subtitle') }}
          </p>
        </div>

        <nuxt-link :to="localePath('index')">
          {{ $t('error.backToHome') }}
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

interface Error {
  statusCode: number
  message: string
}

export default Vue.extend({
  props: {
    error: {
      type: Object,
      required: true,
    } as PropOptions<Error>,
  },

  computed: {
    statusCode(): number {
      return this.error.statusCode || 500
    },
  },

  head() {
    return this.$nuxtI18nSeo()
  },
})
</script>
