import io from 'socket.io-client'

const wsUrl = process.env.WS_URL || ''
const socket = io(wsUrl)

export default socket
