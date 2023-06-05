const {Subscriptions} = require('../models/index')

const subscribe = async (req, res)=>{
    try {
        const {user_id, subscriber_id} = req.body
        const resp = await Subscriptions.create({
            user_id,
            subscriber_id,
            time : Math.floor(Date.now() / 1000),
            active : 1,
            notify : 1
        })
        res.status(200).json({
            msg : "Success subsribe user",
            resp
        })
    } catch (error) {
        console.log({error});
    }
}

const unsubscribe = async (req, res)=>{
    try {
        const {user_id, subscriber_id} = req.body
        const data = await Subscriptions.destroy({
            where : {
                user_id,
                subscriber_id
            }
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

module.exports = {
    subscribe,
    unsubscribe
}