const router = require('express').Router()
const userRouter = require("./user")
const conversationsRouter = require("./conversations")

router.use("/user", userRouter)
router.use("/conversations", conversationsRouter )


module.exports = router