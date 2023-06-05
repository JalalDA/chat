const db = require('../config/db')
const {DataTypes} = require('sequelize')

const Conversations = db.define("conversations", {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    }, 
    user_one : {
        type : DataTypes.INTEGER,
    },
    user_two : {
        type : DataTypes.INTEGER
    }, 
    time : {
        type : DataTypes.INTEGER
    }
}, {
    timestamps : false
})

module.exports = Conversations