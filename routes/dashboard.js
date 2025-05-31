const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const dashboardController = require('../controllers/dashboard')
const homeController = require('../controllers/home')
const { ensureAuth, ensureGuest } = require('../middleware/auth')


router.get('/', ensureAuth, dashboardController.getEntries)
router.get('/', ensureAuth, homeController.getJournal)
router.post('/entry', dashboardController.createEntry)

// router.delete('/deleteTodo', entriesController.deleteEntry)

module.exports = router