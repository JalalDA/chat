const Videos = require('./Videos')
const Users = require('./Users')
const Messages = require('./Messages')
const Conversations = require('./Conversations')
const Likes = require('./Likes')
const Subscriptions = require("./Subscriptions")
const Comments = require('./Comments')
const CommReplies = require("./Comm_replies")

Videos.hasOne(Users, {foreignKey : "user_id"})
Users.hasMany(Conversations, {foreignKey : "id"})
Users.hasMany(Messages, {foreignKey : "id"})

module.exports = {
    Videos,
    Users,
    Messages,
    Conversations,
    Likes,
    Subscriptions,
    Comments,
    CommReplies
}