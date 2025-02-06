const { neon } = require("@neondatabase/serverless");
const express = require("express");
const router = express.Router();
const DB = neon(process.env.REACT_APP_DATABASE_URL);

// GET
router.get("/Support/GetSupport/:AccountID", async (req, res) => {
    try {
        console.log(`Get Support endpoint called for User ${req.headers["RelevantID"]}...`);
        const SelectStatement = await DB`
            SELECT * FROM "Klex_UserData_UserSupportData"
            WHERE "AccountID" = ${req.params.AccountID}
        `;
        return res.status(200).json({ message: "Successfully Collected Support", SelectStatement});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal Server Errror"});
    }
})
// POST
router.post("/Support/", async (req, res) => {
    try {

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal Server Errror"});
    }
})
// UPDATE
router.patch("/Support/", async (req, res) => {
    try {

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal Server Errror"});
    }
})
// DELETE
router.delete("/Support/", async (req, res) => {
    try {

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal Server Errror"});
    }
})
module.exports = router;