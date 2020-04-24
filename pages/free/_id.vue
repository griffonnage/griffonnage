<template>
  <div>
    <section class="hero is-fullheight-with-navbar">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-half is-offset-one-quarter">
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
import DrawingSection from '~/components/DrawingSection.vue'
import * as io from '~/utils/io'

export default Vue.extend({
  components: {
    DrawingSection,
  },

  asyncData({ route }) {
    return {
      room: route.params.id,
    }
  },

  data() {
    return {
      room: '',
      encryptionKey: '',
      socket: undefined as io.Socket | undefined,
      canvas: '',
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
    sayHi(username: string): void {
      this.sendRoomData({
        kind: 'hi',
        message: {
          socketid: this.socket?.id,
          username,
        },
      })
    },

    sayBye(username: string): void {
      this.sendRoomData({
        kind: 'bye',
        message: {
          socketid: this.socket?.id,
          username,
        },
      })
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

    browserClose(event: Event): null {
      this.leaveRoom()
      event.returnValue = false
      return null
    },

    sendRoomData(data: any): void {
      if (this.socket) {
        io.broadcastRoomData(this.socket, this.room, data, this.encryptionKey)
      }
    },

    userJoinHandler(_: string): void {
      this.shareCanvas()
    },

    userLeaveHandler(_: string): void {},

    roomDataHandler(data: any): void {
      if (data.kind === 'canvas') {
        return this.handleCanvasData(data)
      }
    },

    handleCanvasData(data: any): void {
      this.canvas = data.message.canvas
    },
  },
})
</script>
