const { createUser, getUser, login, getAllUser } = require('../controllers/user')

const router = require('express').Router()

router.post("/", createUser)
router.get("/all", getAllUser)
router.get("/:id", getUser)
router.post("/login", login)


module.exports = router