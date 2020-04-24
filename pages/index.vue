<template>
  <div>
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

                <b-button
                  type="primary"
                  :to="
                    localePath({
                      name: 'free-id',
                      params: { id: generateRoomId() },
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    generateRoomId(): string {
      return Math.random().toString(20).substr(2, 10)
    },
  },
})
</script>
