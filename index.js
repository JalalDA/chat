const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const http = require('http')
const { Server } = require("socket.io")
const db = require('./src/config/db')
const router = require('./src/routes')
const {
    Users,
    Videos,
    Conversations,
    Messages,
    Likes
} = require('./src/models/index')
const getSocket = require('./src/utils/socket')
const cors = require('cors')
const { Op, VIRTUAL } = require('sequelize')

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "*"]
    }
})

// Users.sync()
// Videos.sync()
// Conversations.sync()
// Messages.sync()
// Likes.sync()

app.use(cors(
    {
        origin: ['*', 'http://localhost:3000', 'https://coffeelands-app.netlify.app'],
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
        credentials: true,
        optionsSuccessStatus: 200
    }
))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)

// db.authenticate().then(() => {
//     console.log(`DB Connected . . .`);
// }).catch((err) => console.log({ err }))

server.listen(5000, () => {
    console.log(`App liseten on port 5000`);
})


app.get("/", (req, res) => {
    res.status(200).json({
        msg: "Wellcome"
    })
})

let onlineUsers = []
const addNewUser = (username, socketId) => {
    !onlineUsers.some((user) => user?.username === username) && onlineUsers.push({ username, socketId })
}
const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter(user => user?.socketId !== socketId)
}

const getUser = (username) => {
    return onlineUsers.find(user => user?.username === username)
}

io.on("connection", (socket) => {

    socket.on("join_room", data => {
        socket.join(data)
        console.log(`User ${socket.id} joined the room`);
        socket.on("sendMessage", message => {
            console.log({ message });
            io.to(data).emit("getMessage", message)
        })
    })

    //when user close or left app
    socket.on("disconnect", () => {
        removeUser(socket.id)
    })


    //when user login to app
    socket.on("userLogin", async (data) => {
        addNewUser(data?.username, socket.id)
        const conversations = await Conversations.findAll({
            where: {
                [Op.or]: {
                    user_one: data?.id,
                    user_two: data?.id
                }
            },
            include: {
                model: Users,
                attributes: ["id", "username", "email"]
            }
        })
        console.log({ conversations: conversations[0].dataValues?.users[0].dataValues });
        console.log(`Data user login : `, data);
        io.to(socket.id).emit("getConversations", conversations)
        console.log({ onlineUsers });
    })


    //getAllMsgs
    socket.on("getAllMsg", async (id) => {
        const dataMsg = await Messages.findAll({
            where: {
                from_id: id?.from,
                to_id: id?.to
            }
        })
        const username = await Users.findAll({
            where: {
                id: id?.to
            },
            attributes: ['id', 'username', 'avatar']
        })
        io.to(socket.id).emit("getMessages", {
            dataMsg,
            username
        })
    })

    socket.on("getConversations", async (data) => {
        try {
            console.log({data});
            const result = await db.query(`
            SELECT * FROM ( SELECT u.username,       m.text,
                m.time,        FALSE imSender
          FROM messages m INNER JOIN users u ON u.id = m.from_id 
          WHERE m.id IN (SELECT MAX(id) FROM messages WHERE to_id = ${data?.user_id} GROUP BY from_id) UNION ALL 
          SELECT u.username,       m.text,
                m.time,
                TRUE imSender FROM messages m
          INNER JOIN users u ON u.id = m.to_id  WHERE m.id IN (SELECT MAX(id) FROM messages WHERE from_id = ${data?.user_id} GROUP BY to_id) ) message
          ORDER BY message.time DESC
            `)
            console.log({ result });
        } catch (error) {
            console.log({ error });
        }
    })
})