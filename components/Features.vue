<template>
  <section class="section hero is-fullheight has-background-light">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column is-one-third">
            <p class="title">
              <b-icon pack="fas" icon="pencil-alt" />
              {{ $t('features.drawing.title') }}
            </p>

            <i18n path="features.drawing.text" tag="p">
              <template #fabricjs>
                <a
                  :href="fabricjs.url"
                  :title="fabricjs.name"
                  :alt="fabricjs.name"
                >
                  <span>{{ fabricjs.name }}</span>
                </a>
              </template>
            </i18n>
          </div>

          <div class="column is-one-third">
            <p class="title">
              <b-icon pack="fas" icon="comments" />
              {{ $t('features.messaging.title') }}
            </p>

            <i18n path="features.messaging.text" tag="p">
              <template #socketio>
                <a
                  :href="socketio.url"
                  :title="socketio.name"
                  :alt="socketio.name"
                >
                  <span>{{ socketio.name }}</span>
                </a>
              </template>
            </i18n>
          </div>

          <div class="column is-one-third">
            <p class="title">
              <b-icon pack="fas" icon="users" />
              {{ $t('features.p2p.title') }}
            </p>

            <i18n path="features.p2p.text" tag="p">
              <template #socketio>
                <a
                  :href="socketio.url"
                  :title="socketio.name"
                  :alt="socketio.name"
                >
                  <span>{{ socketio.name }}</span>
                </a>
              </template>
            </i18n>
          </div>
        </div>

        <div class="columns">
          <div class="column is-one-third">
            <p class="title">
              <b-icon pack="fas" icon="shield-alt" />
              {{ $t('features.privacy.title') }}
            </p>

            <i18n path="features.privacy.text" tag="p">
              <template #tweetnacljs>
                <a
                  :href="tweetnacljs.url"
                  :title="tweetnacljs.name"
                  :alt="tweetnacljs.name"
                >
                  <span>{{ tweetnacljs.name }}</span>
                </a>
              </template>
            </i18n>
          </div>

          <div class="column is-one-third">
            <p class="title">
              <b-icon pack="fas" icon="lock-open" />
              {{ $t('features.oss.title') }}
            </p>

            <i18n path="features.oss.text" tag="p">
              <template #license>
                <a
                  :href="license.url"
                  :title="license.name"
                  :alt="license.name"
                >
                  <span>{{ license.name }}</span>
                </a>
              </template>

              <template #repository>
                <a
                  :href="repository.url"
                  :title="repository.name"
                  :alt="repository.name"
                >
                  <span>{{ repository.name }}</span>
                </a>
              </template>
            </i18n>
          </div>

          <div class="column is-one-third">
            <p class="title">
              <b-icon pack="fas" icon="envelope-open-text" />
              {{ $t('features.suggestions.title') }}
            </p>

            <i18n path="features.suggestions.text" tag="p">
              <template #repository>
                <a
                  :href="repository.url"
                  :title="repository.name"
                  :alt="repository.name"
                >
                  <span>{{ repository.name }}</span>
                </a>
              </template>
            </i18n>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      license: this.$t('common.app.license'),
      repository: this.$t('common.app.repository'),
      fabricjs: this.$t('common.links.fabricjs'),
      socketio: this.$t('common.links.socketio'),
      tweetnacljs: this.$t('common.links.tweetnacljs'),
    }
  },
})
</script>
