const {DataTypes} = require('sequelize')
const db = require("../config/db")

const Subscriptions = db.define("subscriptions", {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    user_id : {
        type : DataTypes.INTEGER,
    },
    subscriber_id : {
        type : DataTypes.INTEGER
    },
    time : {
        type : DataTypes.INTEGER
    },
    active : {
        type : DataTypes.INTEGER
    },
    notify : {
        type : DataTypes.INTEGER
    }
})


module.exports = Subscriptions