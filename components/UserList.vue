<template>
  <div>
    <b-field>
      <b-input
        v-model="username"
        :placeholder="$t('userlist.username')"
        :maxlength="20"
        :has-counter="true"
        @input="changeUsername"
      />
      <p class="control">
        <b-button
          icon-pack="fas"
          icon-left="sync-alt"
          @click="generateUsername"
        />
      </p>
    </b-field>

    <article
      v-for="(u, i) in users"
      :key="u.socketid"
      :data-user="`user-${i}`"
      class="media"
    >
      <div class="media-left">
        <b-icon v-if="u.me || u.username" pack="fas" icon="user-shield" />
        <b-icon v-else pack="fas" icon="user-secret" />
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <span v-if="u.me" class="has-text-weight-bold">
              <span>{{ $t('userlist.me') }}</span>
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
import * as usernames from '~/utils/usernames'

export interface User {
  socketid: string
  username?: string
  me: boolean
}

export default Vue.extend({
  props: {
    users: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      username: usernames.generate(),
    }
  },

  mounted() {
    this.emitUsernameChanged()
  },

  methods: {
    emitUsernameChanged(): void {
      this.$emit('username-changed', this.username)
    },

    generateUsername(): void {
      this.username = usernames.generate()
      this.emitUsernameChanged()
    },

    changeUsername(): void {
      if (this.username === '') {
        this.generateUsername()
      } else {
        this.emitUsernameChanged()
      }
    },
  },
})
</script>
