const {Conversations, Users} = require('../models/index')

const createConversations = async (req, res)=>{
    try {
        const {
            id,
            user_one, 
            user_two,
            time
        } = req.body
        const data = await Conversations.create({
            id,
            user_one,
            user_two,
            time
        })
        res.status(200).json({
            msg : "Success",
            data
        })
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}

const getConversations = async (req, res)=>{
    try {
        const {id} = req.params
        const data = await Conversations.findAll({
            where : {
                user_one : id
            },
            include : {
                model : Users,
                attributes : ["id", "username", "email"]
            }
        })
        res.status(200).json({data})
    } catch (error) {
        console.log({error});
        res.status(400).json({error})
    }
}

module.exports = {
    createConversations,
    getConversations
}