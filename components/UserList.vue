<template>
  <div>
    <article v-for="(u, i) in value" :key="u.socketid" class="media">
      <div class="media-left">
        <b-icon v-if="u.me || u.username" pack="fas" icon="user-shield" />
        <b-icon v-else pack="fas" icon="user-secret" />
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <span v-if="u.me">
              {{ $t('userlist.me') }}
              <span v-if="u.username">({{ u.username }})</span>
            </span>
            <span v-else-if="u.username">{{ u.username }}</span>
            <span v-else>{{ $t('userlist.anonymous') }} {{ i + 1 }}</span>
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
})
</script>
