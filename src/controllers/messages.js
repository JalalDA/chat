const {Messages} = require("../models/index")

const getMessagesById = async (req, res)=>{
    try {
        const {id} = req.body
        const data = await Messages.findAll({
            where : {
                id
            }
        })
        res.status(200).json({
            msg : "Success",
            data
        })
    } catch (error) {
        console.log({error});
        res.status(400).json({
            msg : "error",
            error
        })
    }
}

module.exports = {
    getMessagesById
}