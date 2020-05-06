import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { RootState } from '~/store'
import * as crypto from '~/utils/crypto'
import * as io from '~/utils/io'
import * as usernames from '~/utils/usernames'

enum EmitEvent {
  joinRoom = 'join-room',
  leaveRoom = 'leave-room',
  broadcastRoomData = 'broadcast-room-data',
  broadcastVolatileRoomData = 'broadcast-volatile-room-data',
}

enum ListenEvent {
  connect = 'connect',
  disconnect = 'disconnect',
  userList = 'user-list',
  userJoin = 'user-join',
  userLeave = 'user-leave',
  newRoomData = 'new-room-data',
}

enum RoomEvent {
  hi = 'hi',
  canvas = 'canvas',
  chatMessage = 'chat-message',
}

interface RoomData {
  event: RoomEvent
  userid: string
  payload: any
}

interface User {
  id: string
  username?: string
  me: boolean
}

interface ChatMessage {
  username: string
  content: string
  datetime: Date
}

export const defaultState = {
  room: '',
  encryptionKey: '',
  connected: false,
  users: [] as User[],
  username: usernames.generate(),
  chatMessages: [] as ChatMessage[],
  canvas: '',
  jsonCanvas: '',
}

export const state = () => ({
  ...defaultState,
})

export type RoomState = ReturnType<typeof state>

export const getters: GetterTree<RoomState, RootState> = {}

export const mutations: MutationTree<RoomState> = {
  setRoom: (
    state: RoomState,
    { room, encryptionKey }: { room: string; encryptionKey: string }
  ): void => {
    if (room !== state.room || encryptionKey !== state.encryptionKey) {
      state.users = []
      state.chatMessages = []
      state.canvas = ''
      state.jsonCanvas = ''
    }
    state.room = room
    state.encryptionKey = encryptionKey
    state.connected = false
  },

  setConnected: (state: RoomState, connected: boolean): void => {
    state.connected = connected
  },

  setUsers: (state: RoomState, users: User[]): void => {
    state.users = users
  },

  setUserUsername: (
    state: RoomState,
    { id, username }: { id: string; username: string }
  ): void => {
    state.users.forEach((u) => {
      if (u.id === id) {
        u.username = username
      }
    })
  },

  setUsername: (state: RoomState, username: string): void => {
    state.username = username
  },

  pushChatMessage: (state: RoomState, message: ChatMessage): void => {
    state.chatMessages.unshift(message)
  },

  setCanvas: (state: RoomState, canvas: string): void => {
    state.canvas = canvas
  },

  setJsonCanvas: (state: RoomState, jsonCanvas: string): void => {
    state.jsonCanvas = jsonCanvas
  },
}

export const actions: ActionTree<RoomState, RootState> = {
  connect(
    { commit, dispatch },
    { room, encryptionKey }: { room: string; encryptionKey: string }
  ): void {
    commit('setRoom', { room, encryptionKey })

    const socket = io.createSocket()
    if (socket) {
      socket.on(ListenEvent.connect, () => dispatch('connectHandler', true))
      socket.on(ListenEvent.disconnect, () => dispatch('connectHandler', false))
      socket.on(ListenEvent.userList, (users: string[]) =>
        dispatch('userListHandler', users)
      )
      socket.on(ListenEvent.userJoin, (user: string) =>
        dispatch('userJoinHandler', user)
      )
      socket.on(ListenEvent.userLeave, (user: string) =>
        dispatch('userLeaveHandler', user)
      )
      socket.on(ListenEvent.newRoomData, (data: any) =>
        dispatch('dataHandler', data)
      )
    }
  },

  disconnect({ state }): void {
    const socket = io.getSocket()
    if (socket) {
      socket.emit(EmitEvent.leaveRoom, state.room)
      socket.close()
      io.clearSocket()
    }
  },

  updateUsername({ commit, dispatch }, username: string): void {
    commit('setUsername', username)
    dispatch('sayHi')
  },

  generateUsername({ commit, dispatch }): void {
    commit('setUsername', usernames.generate())
    dispatch('sayHi')
  },

  sayHi({ dispatch, state }): void {
    const socket = io.getSocket()
    const hiData = {
      event: RoomEvent.hi,
      userid: socket?.id,
      payload: {
        username: state.username,
      },
    }
    dispatch('sendRoomData', hiData)
    dispatch('handleHiData', hiData)
  },

  sendChatMessage({ dispatch, state }, newMessage: string): void {
    const socket = io.getSocket()
    const chatMessageData = {
      event: RoomEvent.chatMessage,
      userid: socket?.id,
      payload: {
        username: state.username,
        content: newMessage,
        datetime: new Date().toISOString(),
      },
    }

    dispatch('sendRoomData', chatMessageData)
    dispatch('handleChatMessage', chatMessageData)
  },

  shareCanvas({ commit, dispatch }, canvas: string): void {
    const socket = io.getSocket()
    const canvasData = {
      event: RoomEvent.canvas,
      userid: socket?.id,
      payload: {
        canvas,
      },
    }
    dispatch('sendRoomData', canvasData)
    commit('setCanvas', canvas)
  },

  sendRoomData({ state }, data: any): void {
    const socket = io.getSocket()
    if (socket) {
      const encryptedData = crypto.encrypt(data, state.encryptionKey)
      socket.emit(EmitEvent.broadcastRoomData, state.room, encryptedData)
    }
  },

  sendVolatileRoomData({ state }, data: any): void {
    const socket = io.getSocket()
    if (socket) {
      const encryptedData = crypto.encrypt(data, state.encryptionKey)
      socket.emit(
        EmitEvent.broadcastVolatileRoomData,
        state.room,
        encryptedData
      )
    }
  },

  connectHandler({ commit, state }, connected: boolean): void {
    const socket = io.getSocket()
    commit('setConnected', connected)
    if (state.room && state.connected && socket) {
      socket.emit(EmitEvent.joinRoom, state.room)
    }
  },

  userListHandler({ commit, dispatch }, users: string[]): void {
    const socket = io.getSocket()
    const usersList = users.map((u: string) => ({
      id: u,
      username: '',
      me: socket?.id === u,
    }))

    commit('setUsers', usersList)
    dispatch('sayHi')
  },

  userJoinHandler({ dispatch, state }): void {
    dispatch('shareCanvas', state.canvas)
  },

  userLeaveHandler(): void {},

  async dataHandler({ dispatch, state }, encryptedData: string): Promise<void> {
    const data = crypto.decrypt(encryptedData, state.encryptionKey)

    const handlers = new Map([
      [RoomEvent.hi, (data: RoomData) => dispatch('handleHiData', data)],
      [
        RoomEvent.canvas,
        (data: RoomData) => dispatch('handleCanvasData', data),
      ],
      [
        RoomEvent.chatMessage,
        (data: RoomData) => dispatch('handleChatMessage', data),
      ],
    ])

    const hd = handlers.get(data.event)
    if (hd) {
      await hd(data)
    }
  },

  handleHiData({ commit }, data: RoomData): void {
    commit('setUserUsername', {
      id: data.userid,
      username: data.payload.username,
    })
  },

  handleChatMessage({ commit }, data: RoomData): void {
    commit('pushChatMessage', data.payload)
  },

  handleCanvasData({ commit }, data: RoomData): void {
    commit('setJsonCanvas', data.payload.canvas)
  },
}
