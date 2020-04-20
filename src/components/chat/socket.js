const io = require('socket.io-client')

export default function () {
//  const socket = io.connect('http://localhost:3003')
  const socket = io.connect('http://112.196.1.10:3003')
  function registerHandler(onMessageReceived) {
    console.log('new message is arrived');
    socket.on('message', onMessageReceived)
  }
  function unregisterHandler() {
    socket.off('message')
  }
  socket.on('error', function (err) {
    console.log('received socket error:')
    console.log(err)
  })
  function register(userid) {
    // console.log('in the socket',{'userid':userid})
    socket.emit('connectuser',{'userid':userid} )
  }
  function message(msgbody) {
    // console.log('message to be rendered',msgbody)
    socket.emit('message', msgbody)
  }
  function call(param){
    console.log('----> params',param)
    // socket.emit('call',param)
  }
  return {
    register,
    message,
    registerHandler,
    unregisterHandler,
    call
  }
}

