const { neon } = require("@neondatabase/serverless");
const express = require("express");
const router = express.Router();
const DB = neon(process.env.REACT_APP_DATABASE_URL);
const {CheckUsersLoop, RegisterUser, isUserActive, CanUserChangeDetails, ViewUsers} = require("../../Admin/ActiveUserHandler");

// GET
router.get("/EneryHandling/GetEneryHandling/:AccountID", async (req, res) => {
    try {
        console.log(`Get EneryHandling endpoint called for User ${req.headers["RelevantID"]}...`);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal Server Errror"});
    }
})
// POST
router.post("/EneryHandling/CreateLocalUserProfile", async (req, res) => {
    try {
        console.log(`Post EneryHandling endpoint called for User ${req.headers["RelevantID"]}...`);
        
        return res.status(200).json({ message: "Successfully retrieved account settings", EneryHandling});   
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal Server Errror"});
    }
})
// UPDATE
router.patch("/EneryHandling/UpdateAccount", async (req, res) => {
    try {
        console.log(`Update EneryHandling endpoint called for User ${req.headers["RelevantID"]}...`);
       
        return res.status(200).json({ message: "Successfully updated EneryHandling"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal Server Errror"});
    }
})
// DELETE
router.delete("/EneryHandling/", async (req, res) => {
    try {

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal Server Errror"});
    }
})
module.exports = router;