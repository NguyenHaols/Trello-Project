import { io } from 'socket.io-client'
const socket = io('wss://trello-be.vercel.app', {
  transports: ['websocket', 'polling'],
  withCredentials: true,
  extraHeaders: {
    'my-custom-header': 'abcd'
  }
})
export default socket
