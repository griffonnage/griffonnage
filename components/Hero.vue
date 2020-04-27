<template>
  <section class="hero is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column is-half is-offset-one-quarter">
            <div class="has-text-centered">
              <p class="title">
                {{ $t('home.title') }}
              </p>

              <p class="subtitle">
                {{ $t('home.subtitle') }}
              </p>
            </div>

            <br />

            <div class="has-text-left">
              <p>
                <strong>{{ $t('home.tagline') }}</strong>
              </p>
            </div>

            <br />

            <div class="has-text-centered">
              <b-button
                type="primary"
                icon-pack="fas"
                icon-left="pencil-alt"
                :to="
                  localePath({
                    name: 'free-id',
                    params: { id: generateRoomId() },
                    hash: `#${generateSecretKey()}`,
                  })
                "
                tag="nuxt-link"
              >
                {{ $t('home.drawFreely') }}
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import * as crypto from '~/utils/crypto'

export default Vue.extend({
  data() {
    return {
      license: this.$t('common.app.license'),
      repository: this.$t('common.app.repository'),
    }
  },

  methods: {
    generateRoomId(): string {
      return Math.random().toString(20).substr(2, 10)
    },

    generateSecretKey(): string {
      return crypto.generateKey()
    },
  },
})
</script>
