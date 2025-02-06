const { neon } = require("@neondatabase/serverless");
const express = require("express");
const router = express.Router();
const DB = neon(process.env.REACT_APP_DATABASE_URL);

// GET
router.get("/Billings/GetBillings/:AccountID", async (req, res) => {
    try {
        console.log(`Get Billings endpoint called for User ${req.headers["RelevantID"]}...`);
        const SelectStatement = await DB`
            SELECT * FROM "Klex_UserData_PriorBillings"
            WHERE "AccountID" = ${req.params.AccountID}
        `;
        return res.status(200).json({ message: "Successfully Collected Billings", SelectStatement});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal Server Errror"});
    }
})
// POST
router.post("/", async (req, res) => {
    try {

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal Server Errror"});
    }
})
// UPDATE
router.patch("/", async (req, res) => {
    try {

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal Server Errror"});
    }
})
// DELETE
router.delete("/", async (req, res) => {
    try {

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal Server Errror"});
    }
})
module.exports = router;