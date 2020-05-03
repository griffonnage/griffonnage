<template>
  <div>
    <section class="hero is-fullheight-with-navbar">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-one-fifth">
              <user-list :users="users" @username-changed="updateUsername" />
            </div>

            <div class="column is-three-fifths">
              <join-link v-model="link" />
              <drawing v-model="canvas" @input="shareCanvas" />
            </div>

            <div class="column is-one-fifth">
              <chat :messages="chatMessages" @new-message="sendChatMessage" />
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
import UserList, { User } from '~/components/UserList.vue'
import JoinLink from '~/components/JoinLink.vue'
import Drawing from '~/components/Drawing.vue'
import Chat, { ChatMessage } from '~/components/Chat.vue'
import * as io from '~/utils/io'

enum RoomEvent {
  hi = 'hi',
  canvas = 'canvas',
  chatMessage = 'chat-message',
}

interface RoomData {
  event: RoomEvent
  payload: any
}

export default Vue.extend({
  components: {
    UserList,
    JoinLink,
    Drawing,
    Chat,
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
      connected: false,
      socket: undefined as io.Socket | undefined,
      users: [] as User[],
      canvas: '',
      username: '',
      chatMessages: [] as ChatMessage[],
    }
  },

  mounted() {
    const hash = this.$route.hash
    if (hash.length > 1) {
      this.encryptionKey = hash.slice(1)
    }

    this.socket = io.createSocket(
      this.connectHandler,
      this.userListHandler,
      this.userJoinHandler,
      this.userLeaveHandler,
      this.roomDataHandler,
      this.encryptionKey
    )

    window.addEventListener('beforeunload', this.browserClose)
  },

  beforeDestroy() {
    this.leaveRoom()
  },

  methods: {
    updateUsername(username: string): void {
      this.username = username
      this.sayHi()
    },

    sayHi(): void {
      const hiData = {
        event: RoomEvent.hi,
        payload: {
          socketid: this.socket?.id,
          username: this.username,
        },
      }
      this.sendRoomData(hiData)
      this.handleHiData(hiData)
    },

    shareCanvas(): void {
      const canvasData = {
        event: RoomEvent.canvas,
        payload: {
          socketid: this.socket?.id,
          canvas: this.canvas,
        },
      }
      this.sendRoomData(canvasData)
    },

    sendChatMessage(newMessage: string): void {
      const chatMessageData = {
        event: RoomEvent.chatMessage,
        payload: {
          socketid: this.socket?.id,
          username: this.username,
          content: newMessage,
          datetime: new Date().toISOString(),
        },
      }
      this.sendRoomData(chatMessageData)
      this.handleChatMessage(chatMessageData)
    },

    joinRoom(): void {
      if (this.socket) {
        io.joinRoom(this.socket, this.room)
      }
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

    connectHandler(connected: boolean): void {
      if (connected) {
        this.joinRoom()
      }
      this.connected = connected
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

    roomDataHandler(data: RoomData): void {
      const handlers = new Map([
        [RoomEvent.hi, this.handleHiData],
        [RoomEvent.canvas, this.handleCanvasData],
        [RoomEvent.chatMessage, this.handleChatMessage],
      ])

      const hd = handlers.get(data.event)

      if (hd) {
        hd(data)
      }
    },

    handleHiData(data: RoomData): void {
      this.users.forEach((u) => {
        if (u.socketid === data.payload.socketid) {
          u.username = data.payload.username
        }
      })
    },

    handleCanvasData(data: RoomData): void {
      this.canvas = data.payload.canvas
    },

    handleChatMessage(data: RoomData): void {
      this.chatMessages.unshift(data.payload)
    },
  },
})
</script>
