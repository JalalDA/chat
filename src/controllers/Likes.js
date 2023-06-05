const {Likes} = require('../models/index')

const createLikes = async (req, res)=>{
    try {
        const {
            type, 
            user_id, 
            video_id, 
            post_id } = req.body
        const resp = await Likes.create({
            type, //1 untuk like video, 
            user_id, //user yang ngelike videonya, oke?
            video_id,//video yang dilike
            post_id,
            time : Math.floor(Date.now() / 1000)
        })
        res.status(200).json({
            msg : "Success likes video",
            resp
        })
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
    }
}

const disLikes = async (req, res)=>{
    try {
        const {user_id, video_id} = req.body
        const resp = await Likes.destroy({
            where : {
                user_id,
                video_id
            }
        })
    } catch (error) {
        console.log({error});
        res.status(200).json({error})
    }
}


module.exports = {
    createLikes,
    disLikes
}