import { io } from 'socket.io-client'
const socket = io('ws://localhost:1302', {
  transports: ['websocket', 'polling'],
  withCredentials: true,
  extraHeaders: {
    'my-custom-header': 'abcd'
  }
})
export default socket