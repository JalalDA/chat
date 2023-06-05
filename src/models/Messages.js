const db = require('../config/db')
const {DataTypes} = require('sequelize')

const Messages = db.define('messages', {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    from_id : {
        type : DataTypes.INTEGER
    },
    to_id : {
        type : DataTypes.INTEGER
    },
    text : {
        type : DataTypes.STRING
    },
    seen : {
        type : DataTypes.INTEGER
    },
    time : {
        type : DataTypes.INTEGER
    },
    from_deleted :{
        type : DataTypes.INTEGER
    },
    to_deleted : {
        type : DataTypes.INTEGER
    }
}, {
    timestamps : false
})

module.exports = Messages