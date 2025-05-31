const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", ensureAuth, homeController.getJournal);
router.post("/", homeController.createEntry);

// router.delete('/deleteTodo', entriesController.deleteEntry)

module.exports = router;
