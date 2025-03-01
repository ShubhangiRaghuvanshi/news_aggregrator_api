
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const prefController = require("../controllers/preferences");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/preferences", [
    authMiddleware,
    check("preferences")
        .optional()  
        .isArray({ min: 1 })
        .withMessage("Preferences must be an array if provided")
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

   
    prefController.getPreferences(req, res);
});

router.put("/preferences", [
    authMiddleware,
    check("preferences")
        .isArray({ min: 1 })
        .withMessage("Preferences must be an array and should contain at least one item")
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    // Proceed to the controller if no validation errors
    prefController.updatePreferences(req, res);
});

module.exports = router;
