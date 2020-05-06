<template>
  <div>
    <section class="hero is-fullheight-with-navbar">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-one-fifth">
              <user-list />
            </div>

            <div class="column is-three-fifths">
              <join-link v-model="link" />
              <drawing />
            </div>

            <div class="column is-one-fifth">
              <chat />
            </div>
          </div>

          <b-loading
            :is-full-page="true"
            :active="!connected"
            :can-cancel="false"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import UserList from '~/components/UserList.vue'
import JoinLink from '~/components/JoinLink.vue'
import Drawing from '~/components/Drawing.vue'
import Chat from '~/components/Chat.vue'

export default Vue.extend({
  components: {
    UserList,
    JoinLink,
    Drawing,
    Chat,
  },

  data() {
    return {
      link: `${process.env.HOSTNAME}${this.$route.fullPath}`,
    }
  },

  computed: {
    ...mapState('room', {
      connected: 'connected',
    }),
  },

  mounted() {
    const room = this.$route.params.id
    const hash = this.$route.hash
    let encryptionKey = ''
    if (hash.length > 1) {
      encryptionKey = hash.slice(1)
    }

    if (room && encryptionKey) {
      this.connect({ room, encryptionKey })
    }

    window.addEventListener('beforeunload', this.disconnect)
  },

  beforeDestroy() {
    this.disconnect()
  },

  methods: {
    ...mapActions('room', {
      connect: 'connect',
      disconnect: 'disconnect',
    }),
  },
})
</script>
