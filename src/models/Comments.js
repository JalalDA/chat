const db = require('../config/db')
const {DataTypes} = require('sequelize')

const Comments = db.define("Comments", {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true, 
        autoIncrement : true
    },
    user_id : {
        type : DataTypes.INTEGER,
    },
    video_id : {
        type : DataTypes.INTEGER
    },
    post_id : {
        type : DataTypes.INTEGER,
    },
    activity_id : {
        type : DataTypes.INTEGER
    },
    text : {
        type : DataTypes.TEXT
    },
    time : {
        type : DataTypes.INTEGER
    },
    pinned : {
        type : DataTypes.ENUM('0','1')
    },
    likes : {
        type : DataTypes.INTEGER
    },
    dis_likes : {
        type : DataTypes.INTEGER
    }
})

module.exports = Comments