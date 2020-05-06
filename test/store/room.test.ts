import faker from 'faker'
import * as room from '~/store/room'
import * as io from '~/utils/io'
import * as crypto from '~/utils/crypto'

faker.seed(1234)

function generateRoom() {
  return faker.random.alphaNumeric(10)
}

function generateEncryptionKey() {
  return crypto.generateKey()
}

function generateUsername() {
  return faker.internet.userName()
}

function generateUsers() {
  const users = []
  for (let i = 0; i < 4; ++i) {
    users.push({
      id: faker.random.alphaNumeric(),
      username: generateUsername(),
      me: false,
    })
  }
  users[0].me = true
  return users
}

function generateMessages() {
  const messages = []
  for (let i = 0; i < 4; ++i) {
    messages.push({
      username: generateUsername(),
      content: faker.lorem.sentence(),
      datetime: faker.date.recent(),
    })
  }

  return messages
}

function generateState() {
  return {
    room: generateRoom(),
    encryptionKey: generateEncryptionKey(),
    connected: true,
    users: generateUsers(),
    username: generateUsername(),
    chatMessages: generateMessages(),
    canvas: '',
    jsonCanvas: '',
  }
}

describe('store/room state', () => {
  test('default state', () => {
    expect(room.state()).toStrictEqual(room.defaultState)
  })
})

describe('store/auth mutations', () => {
  test('set room', () => {
    const state = generateState()
    const before = Object.assign({}, state)
    const newRoom = generateRoom()
    const newEncryptionKey = generateEncryptionKey()

    room.mutations.setRoom(state, {
      room: newRoom,
      encryptionKey: newEncryptionKey,
    })

    expect(state.room).toEqual(newRoom)
    expect(state.encryptionKey).toEqual(newEncryptionKey)
    expect(state.connected).toBeFalsy()
    expect(state.users).toStrictEqual([])
    expect(state.username).toEqual(before.username)
    expect(state.chatMessages).toStrictEqual([])
    expect(state.canvas).toEqual('')
    expect(state.jsonCanvas).toEqual('')
  })

  test('set room with same id and encryption key', () => {
    const state = generateState()
    const before = Object.assign({}, state)

    room.mutations.setRoom(state, {
      room: state.room,
      encryptionKey: state.encryptionKey,
    })

    expect(state.room).toEqual(before.room)
    expect(state.encryptionKey).toEqual(before.encryptionKey)
    expect(state.connected).toBeFalsy()
    expect(state.users).toStrictEqual(before.users)
    expect(state.username).toEqual(before.username)
    expect(state.chatMessages).toStrictEqual(before.chatMessages)
    expect(state.canvas).toEqual(before.canvas)
    expect(state.jsonCanvas).toEqual(before.canvas)
  })

  test('set connected', () => {
    const state = generateState()
    const newConnected = !state.connected

    room.mutations.setConnected(state, newConnected)

    expect(state.connected).toEqual(newConnected)
  })

  test('set users', () => {
    const state = generateState()
    const newUsers = generateUsers()

    room.mutations.setUsers(state, newUsers)

    expect(state.users).toStrictEqual(newUsers)
  })

  test('set username', () => {
    const state = generateState()
    const newUsername = generateUsername()

    room.mutations.setUsername(state, newUsername)

    expect(state.username).toEqual(newUsername)
  })

  test('push chat message', () => {
    const state = generateState()
    const beforeMessages = new Array(...state.chatMessages)
    const newMessages = generateMessages()
    const newMessage = newMessages[0]

    room.mutations.pushChatMessage(state, newMessage)

    expect(state.chatMessages.length).toEqual(beforeMessages.length + 1)
    expect(state.chatMessages[0]).toStrictEqual(newMessage)
    beforeMessages.forEach((m, i) => {
      expect(state.chatMessages[i + 1]).toStrictEqual(m)
    })
  })

  test('set canvas', () => {
    const state = generateState()
    const newCanvas = '{"aaa": "bbb"}'

    room.mutations.setCanvas(state, newCanvas)

    expect(state.canvas).toEqual(newCanvas)
  })

  test('set json canvas', () => {
    const state = generateState()
    const newJsonCanvas = '{"aaa": "bbb"}'

    room.mutations.setJsonCanvas(state, newJsonCanvas)

    expect(state.jsonCanvas).toEqual(newJsonCanvas)
  })
})

describe('store/room actions', () => {
  test('connect', async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    const newRoom = generateRoom()
    const newEncryptionKey = generateEncryptionKey()

    const action = room.actions.connect as Function
    const result = await action(
      { commit, dispatch },
      { room: newRoom, encryptionKey: newEncryptionKey }
    )

    expect(result).toBeUndefined()
    expect(commit).toHaveBeenCalledWith('setRoom', {
      room: newRoom,
      encryptionKey: newEncryptionKey,
    })
    expect(dispatch).not.toHaveBeenCalled()

    io.clearSocket()
  })

  test('disconnect', async () => {
    io.createSocket()

    const state = generateState()

    const action = room.actions.disconnect as Function
    const result = await action({ state })

    expect(result).toBeUndefined()
  })

  test('disconnect undefined socket', async () => {
    io.clearSocket()

    const state = generateState()

    const action = room.actions.disconnect as Function
    const result = await action({ state })

    expect(result).toBeUndefined()
  })

  test('update username', async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    const newUsername = generateUsername()

    const action = room.actions.updateUsername as Function
    const result = await action({ commit, dispatch }, newUsername)

    expect(result).toBeUndefined()
    expect(commit).toHaveBeenCalledWith('setUsername', newUsername)
    expect(dispatch).toHaveBeenCalledWith('sayHi')
  })

  test('generate username', async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()

    const action = room.actions.generateUsername as Function
    const result = await action({ commit, dispatch })

    expect(result).toBeUndefined()
    expect(commit).toHaveBeenCalledWith('setUsername', expect.anything())
    expect(dispatch).toHaveBeenCalledWith('sayHi')
  })

  test('say hi', async () => {
    const state = generateState()
    const dispatch = jest.fn()

    const action = room.actions.sayHi as Function
    const result = await action({ dispatch, state })

    expect(result).toBeUndefined()
    expect(dispatch).toHaveBeenCalledWith('sendRoomData', expect.anything())
    expect(dispatch).toHaveBeenCalledWith(
      'handleHiData',
      dispatch.mock.calls[0][1]
    )
  })

  test('send chat message', async () => {
    const state = generateState()
    const dispatch = jest.fn()
    const newMessage = generateMessages()[0]

    const action = room.actions.sendChatMessage as Function
    const result = await action({ dispatch, state }, newMessage)

    expect(result).toBeUndefined()
    expect(dispatch).toHaveBeenCalledWith('sendRoomData', expect.anything())
    expect(dispatch).toHaveBeenCalledWith(
      'handleChatMessage',
      dispatch.mock.calls[0][1]
    )
  })

  test('share canvas', async () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    const newCanvas = '{"aaa": "bbb"}'

    const action = room.actions.shareCanvas as Function
    const result = await action({ commit, dispatch }, newCanvas)

    expect(result).toBeUndefined()
    expect(dispatch).toHaveBeenCalledWith('sendRoomData', expect.anything())
    expect(commit).toHaveBeenCalledWith('setCanvas', newCanvas)
  })

  test('send room data', async () => {
    io.createSocket()

    const state = generateState()
    const newData = faker.random.words()

    const action = room.actions.sendRoomData as Function
    const result = await action({ state }, newData)

    expect(result).toBeUndefined()

    io.clearSocket()
  })

  test('send room data undefined socket', async () => {
    io.clearSocket()

    const state = generateState()
    const newData = faker.random.words()

    const action = room.actions.sendRoomData as Function
    const result = await action({ state }, newData)

    expect(result).toBeUndefined()
  })

  test('send volatile room data', async () => {
    io.createSocket()

    const state = generateState()
    const newData = faker.random.words()

    const action = room.actions.sendVolatileRoomData as Function
    const result = await action({ state }, newData)

    expect(result).toBeUndefined()

    io.clearSocket()
  })

  test('send volatile room data undefined socket', async () => {
    io.clearSocket()

    const state = generateState()
    const newData = faker.random.words()

    const action = room.actions.sendVolatileRoomData as Function
    const result = await action({ state }, newData)

    expect(result).toBeUndefined()
  })

  test('connect handler', async () => {
    io.createSocket()

    const state = generateState()
    const commit = jest.fn()
    const newConnected = !state

    const action = room.actions.connectHandler as Function
    const result = await action({ commit, state }, newConnected)

    expect(result).toBeUndefined()
    expect(commit).toHaveBeenCalledWith('setConnected', newConnected)

    io.clearSocket()
  })

  test('connect handler empty room', async () => {
    io.createSocket()

    const state = generateState()
    state.room = ''
    const commit = jest.fn()
    const newConnected = !state

    const action = room.actions.connectHandler as Function
    const result = await action({ commit, state }, newConnected)

    expect(result).toBeUndefined()
    expect(commit).toHaveBeenCalledWith('setConnected', newConnected)

    io.clearSocket()
  })

  test('connect handler undefined socket', async () => {
    io.clearSocket()

    const state = generateState()
    state.room = ''
    const commit = jest.fn()
    const newConnected = !state

    const action = room.actions.connectHandler as Function
    const result = await action({ commit, state }, newConnected)

    expect(result).toBeUndefined()
    expect(commit).toHaveBeenCalledWith('setConnected', newConnected)
  })

  test('connect handler not connected', async () => {
    io.createSocket()

    const state = generateState()
    state.room = ''
    const commit = jest.fn()
    const newConnected = false

    const action = room.actions.connectHandler as Function
    const result = await action({ commit, state }, newConnected)

    expect(result).toBeUndefined()
    expect(commit).toHaveBeenCalledWith('setConnected', newConnected)

    io.clearSocket()
  })

  test('user list handler', async () => {
    io.createSocket()

    const commit = jest.fn()
    const dispatch = jest.fn()
    const newUsers = [
      faker.random.alphaNumeric(10),
      faker.random.alphaNumeric(10),
    ]

    const action = room.actions.userListHandler as Function
    const result = await action({ commit, dispatch }, newUsers)

    expect(result).toBeUndefined()
    expect(commit).toHaveBeenCalledWith('setUsers', expect.anything())
    expect(dispatch).toHaveBeenCalledWith('sayHi')

    io.clearSocket()
  })

  test('user join handler', async () => {
    io.createSocket()

    const state = generateState()
    const dispatch = jest.fn()

    const action = room.actions.userJoinHandler as Function
    const result = await action({ dispatch, state })

    expect(result).toBeUndefined()
    expect(dispatch).toHaveBeenCalledWith('shareCanvas', state.canvas)

    io.clearSocket()
  })

  test('user leave handler', async () => {
    io.createSocket()

    const action = room.actions.userLeaveHandler as Function
    const result = await action()

    expect(result).toBeUndefined()

    io.clearSocket()
  })

  test('data handler (hi)', async () => {
    const state = generateState()
    const dispatch = jest.fn()
    const newData = {
      event: 'hi',
    }
    const encryptedData = crypto.encrypt(newData, state.encryptionKey)

    const action = room.actions.dataHandler as Function
    const result = await action({ dispatch, state }, encryptedData)

    expect(result).toBeUndefined()
    expect(dispatch).toHaveBeenCalledWith('handleHiData', newData)
  })

  test('data handler (canvas)', async () => {
    const state = generateState()
    const dispatch = jest.fn()
    const newData = {
      event: 'canvas',
    }
    const encryptedData = crypto.encrypt(newData, state.encryptionKey)

    const action = room.actions.dataHandler as Function
    const result = await action({ dispatch, state }, encryptedData)

    expect(result).toBeUndefined()
    expect(dispatch).toHaveBeenCalledWith('handleCanvasData', newData)
  })

  test('data handler (chat-message)', async () => {
    const state = generateState()
    const dispatch = jest.fn()
    const newData = {
      event: 'chat-message',
    }
    const encryptedData = crypto.encrypt(newData, state.encryptionKey)

    const action = room.actions.dataHandler as Function
    const result = await action({ dispatch, state }, encryptedData)

    expect(result).toBeUndefined()
    expect(dispatch).toHaveBeenCalledWith('handleChatMessage', newData)
  })

  test('handle hi data', async () => {
    const commit = jest.fn()
    const newData = {
      userid: faker.random.alphaNumeric(10),
      payload: {
        username: generateUsername(),
      },
    }

    const action = room.actions.handleHiData as Function
    const result = await action({ commit }, newData)

    expect(result).toBeUndefined()
    expect(commit).toHaveBeenCalledWith('setUserUsername', {
      id: newData.userid,
      username: newData.payload.username,
    })
  })

  test('handle chat message', async () => {
    const commit = jest.fn()
    const newData = {
      userid: faker.random.alphaNumeric(10),
      payload: {
        username: generateUsername(),
        content: faker.lorem.words(),
        datetime: faker.date.recent(),
      },
    }

    const action = room.actions.handleChatMessage as Function
    const result = await action({ commit }, newData)

    expect(result).toBeUndefined()
    expect(commit).toHaveBeenCalledWith('pushChatMessage', newData.payload)
  })

  test('handle canvas data', async () => {
    const commit = jest.fn()
    const newData = {
      userid: faker.random.alphaNumeric(10),
      payload: {
        canvas: '{"aaa": "bbb"}',
      },
    }

    const action = room.actions.handleCanvasData as Function
    const result = await action({ commit }, newData)

    expect(result).toBeUndefined()
    expect(commit).toHaveBeenCalledWith('setJsonCanvas', newData.payload.canvas)
  })
})
