const {DataTypes} = require('sequelize')
const db = require('../config/db')


const Likes = db.define("likes_dislikes", {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    user_id : {
        type : DataTypes.INTEGER
    },
    video_id : {
        type : DataTypes.INTEGER
    },
    post_id : {
        type : DataTypes.INTEGER
    },
    activity_id : {
        type : DataTypes.INTEGER
    },
    type : {
        type : DataTypes.INTEGER
    },
    time : {
        type : DataTypes.INTEGER
    }
})

module.exports = Likes