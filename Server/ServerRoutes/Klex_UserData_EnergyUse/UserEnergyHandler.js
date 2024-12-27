const express = require("express");
const router = express.Router();

router.get("/USERDATAEnergyHANDLER/TEST", (req, res) => {
    return res.status(200).json({ message: "UserDataEnergySuccess"})
})

module.exports = router;