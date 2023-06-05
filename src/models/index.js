const Videos = require('./Videos')
const Users = require('./Users')
const Messages = require('./Messages')
const Conversations = require('./Conversations')

Videos.hasOne(Users, {foreignKey : "user_id"})
Users.hasMany(Conversations, {foreignKey : "id"})
Users.hasMany(Messages, {foreignKey : "id"})

module.exports = {
    Videos,
    Users,
    Messages,
    Conversations
}