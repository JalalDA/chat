const db = require('../config/db')
const {DataTypes} = require('sequelize')

const CommReplies = db.define("comm_replies", {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    user_id : {
        type : DataTypes.INTEGER,
    },
    comment_id : {
        type : DataTypes.INTEGER
    },
    video_id : {
        type : DataTypes.INTEGER
    },
    post_id : {
        type : DataTypes.INTEGER
    },
    text : {
        type : DataTypes.INTEGER
    },
    time : {
        type : DataTypes.STRING
    }
})


module.exports = CommReplies