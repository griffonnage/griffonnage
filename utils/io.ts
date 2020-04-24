import io from 'socket.io-client'
import * as crypto from '~/utils/crypto'

const wsUrl = process.env.WS_URL || ''

export type Socket = SocketIOClient.Socket
export type UserHandler = (socketid: string) => void
export type DataHandler = (data: any) => void

export function createSocket(
  userJoinHandler: UserHandler,
  userLeaveHandler: UserHandler,
  dataHandler: DataHandler,
  encryptionKey: string
): Socket {
  const socket = io(wsUrl)
  socket.on('user-join', userJoinHandler)
  socket.on('user-leave', userLeaveHandler)
  socket.on('new-room-data', newRoomData(dataHandler, encryptionKey))
  return socket
}

export function closeSocket(socket: Socket) {
  socket.close()
}

export function joinRoom(socket: Socket, room: string) {
  socket.emit('join-room', room)
}

export function leaveRoom(socket: Socket, room: string) {
  socket.emit('leave-room', room)
}

export function broadcastRoomData(
  socket: Socket,
  room: string,
  data: any,
  encryptionKey: string
): void {
  const encryptedData = crypto.encrypt(data, encryptionKey)
  socket.emit('broadcast-room-data', room, encryptedData)
}

export function broadcastVolatileRoomData(
  socket: Socket,
  room: string,
  data: any,
  encryptionKey: string
): void {
  const encryptedData = crypto.encrypt(data, encryptionKey)
  socket.emit('broadcast-volatile-room-data', room, encryptedData)
}

export function newRoomData(dataHandler: DataHandler, encryptionKey: string) {
  return (encryptedData: string): void => {
    const data = crypto.decrypt(encryptedData, encryptionKey)
    dataHandler(data)
  }
}
