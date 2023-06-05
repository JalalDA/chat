const {Comments} = require("../models")

const createComment = async (req, res) =>{
    try {
        const {
            user_id, 
            video_id,
            post_id,
            activity_id,
            text,
            time,
            pinned,
            likes,
            dis_likes
        } = req.body
        const data = await Comments.create({
            user_id, 
            video_id,
            post_id,
            activity_id,
            text,
            time,
            pinned,
            likes,
            dis_likes
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

const deleteComment = async (req, res)=>{
    try {
        const data = await Comments.destroy({})
    } catch (error) {
        console.log({error});
        res.status(400).json({error})
    }
}

module.exports = {
    createComment,
    deleteComment
}