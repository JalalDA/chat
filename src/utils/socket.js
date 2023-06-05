const {Server} = require ('socket.io')

exports.onlineUsers = []

exports.addNewUser = (username, socketId)=>{
    !onlineUsers.some((user)=>user?.username === username) && onlineUsers.push({username, socketId})
}

exports.removeUser = (socketId)=>{
    onlineUsers = onlineUsers.filter(user => user?.socketId !== socketId )
}

exports.getUser = (username)=>{
   return onlineUsers.find(user=>user?.username === username)
}


const getSocket = (params)=>{
    const io = new Server(params, {
        cors : {
            origin : ["http://localhost:3000","*"]
        }
    })
    return io
}

module.exports = getSocket