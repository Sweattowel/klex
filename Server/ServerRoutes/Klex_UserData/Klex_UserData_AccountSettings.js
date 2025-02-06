const { neon } = require("@neondatabase/serverless");
const express = require("express");
const router = express.Router();
const DB = neon(process.env.REACT_APP_DATABASE_URL);

// GET
router.get("/AccountSettings/GetAccountSettings/:AccountID", async (req, res) => {
    try {
        console.log(`Get AccountSettings endpoint called for User ${req.headers["RelevantID"]}...`)
        const accountID = req.params.AccountID;

        const AccountSettings = await DB`
            SELECT * FROM "Klex_UserData_AccountSettings" WHERE "AccountID" = ${accountID}
        `

        return AccountSettings.length === 1 ? res.status(200).json({ message: "Successfully retrieved account settings", AccountSettings}) : res.status(404).json({ message: "No data found"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal Server Errror"});
    }
})
// POST
router.post("/AccountSettings/CreateSettings", async (req, res) => {
    try {
        console.log(`Post AccountSettings endpoint called for User ${req.headers["RelevantID"]}...`)
        const accountID = req.params.AccountID;

        const AccountSettings = await DB`
            SELECT * FROM "Klex_UserData_AccountSettings" WHERE "AccountID" = ${accountID}
        `

        return AccountSettings.length === 1 ? res.status(200).json({ message: "Successfully retrieved account settings", AccountSettings}) : res.status(404).json({ message: "No data found"})        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal Server Errror"});
    }
})
// UPDATE
router.update("/AccountSettings/", async (req, res) => {
    try {

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal Server Errror"});
    }
})
// DELETE
router.delete("/AccountSettings/", async (req, res) => {
    try {

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal Server Errror"});
    }
})
module.exports = router;