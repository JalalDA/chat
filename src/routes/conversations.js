const { createConversations, getConversations } = require('../controllers/conversations')

const router = require('express').Router()

router.post('/', createConversations)
router.get("/:id", getConversations)

module.exports = router