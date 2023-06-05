const {CommReplies} = require("../models")


const replyComment = async (req, res)=>{
    try {
        const {comment_id, video_id, user_id} = req.body
        const resp = await CommReplies.create({
            comment_id,
            video_id,
            user_id
        })
    } catch (error) {
        console.log({error});
        res.status(400).json({error})
    }
}