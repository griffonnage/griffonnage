<template>
  <div>
    <section class="hero is-fullheight-with-navbar">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-one-fifth">
              <b-field>
                <b-input
                  v-model="username"
                  :placeholder="$t('rooms.username')"
                  :maxlength="20"
                  :has-counter="true"
                  @input="sayHi"
                />
              </b-field>
              <user-list v-model="users" />
            </div>
            <div class="column is-three-fifths">
              <join-link v-model="link" />
              <drawing-section v-model="canvas" @input="shareCanvas" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UserList from '~/components/UserList.vue'
import JoinLink from '~/components/JoinLink.vue'
import DrawingSection from '~/components/DrawingSection.vue'
import * as io from '~/utils/io'

interface User {
  socketid: string
  username?: string
  me: boolean
}

interface Data {
  kind: string
  message: any
}

export default Vue.extend({
  components: {
    UserList,
    JoinLink,
    DrawingSection,
  },

  asyncData({ route }) {
    return {
      room: route.params.id,
    }
  },

  data() {
    return {
      link: `${process.env.HOSTNAME}${this.$route.fullPath}`,
      room: '',
      encryptionKey: '',
      socket: undefined as io.Socket | undefined,
      users: [] as User[],
      canvas: '',
      username: '',
    }
  },

  mounted() {
    const hash = this.$route.hash
    if (hash.length > 1) {
      this.encryptionKey = hash.slice(1)
    }

    this.joinRoom()

    window.addEventListener('beforeunload', this.browserClose)
  },

  beforeDestroy() {
    this.leaveRoom()
  },

  methods: {
    sayHi(): void {
      const hiData = {
        kind: 'hi',
        message: {
          socketid: this.socket?.id,
          username: this.username,
        },
      }
      this.sendRoomData(hiData)
      this.handleHiData(hiData)
    },

    shareCanvas(): void {
      this.sendRoomData({
        kind: 'canvas',
        message: {
          socketid: this.socket?.id,
          canvas: this.canvas,
        },
      })
    },

    joinRoom(): void {
      this.socket = io.createSocket(
        this.userListHandler,
        this.userJoinHandler,
        this.userLeaveHandler,
        this.roomDataHandler,
        this.encryptionKey
      )
      io.joinRoom(this.socket, this.room)
    },

    leaveRoom(): void {
      if (this.socket) {
        io.leaveRoom(this.socket, this.room)
        io.closeSocket(this.socket)
      }
    },

    browserClose(_: Event): void {
      this.leaveRoom()
    },

    sendRoomData(data: any): void {
      if (this.socket) {
        io.broadcastRoomData(this.socket, this.room, data, this.encryptionKey)
      }
    },

    userListHandler(socketsids: string[]): void {
      this.users = socketsids.map((s) => ({
        socketid: s,
        username: '',
        me: this.socket?.id === s,
      }))
      this.sayHi()
    },

    userJoinHandler(_: string): void {
      this.shareCanvas()
    },

    userLeaveHandler(_: string): void {},

    roomDataHandler(data: Data): void {
      const handlers = new Map([
        ['hi', this.handleHiData],
        ['canvas', this.handleCanvasData],
      ])

      const hd = handlers.get(data.kind)

      if (hd) {
        hd(data)
      }
    },

    handleHiData(data: Data): void {
      this.users.forEach((u) => {
        if (u.socketid === data.message.socketid) {
          u.username = data.message.username
        }
      })
    },

    handleCanvasData(data: Data): void {
      this.canvas = data.message.canvas
    },
  },
})
</script>
