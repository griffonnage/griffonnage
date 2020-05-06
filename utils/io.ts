import io from 'socket.io-client'

const syncUrl = process.env.SYNC_URL || ''

export type Socket = SocketIOClient.Socket

export function createSocket(): Socket {
  return io(syncUrl)
}
