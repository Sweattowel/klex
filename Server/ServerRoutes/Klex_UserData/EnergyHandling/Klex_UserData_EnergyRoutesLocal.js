const { neon } = require("@neondatabase/serverless");
const express = require("express");
const router = express.Router();
const {CheckUsersLoop, RegisterUser, isUserActive, CanUserChangeDetails, ViewUsers} = require("../../Admin/ActiveUserHandler");
const FS = require("fs");
const Path = require("path");

// GET
router.get("/EnergyHandling/GetEnergyHandling/:AccountName", async (req, res) => {
    try {
        console.log(`Get EnergyHandling endpoint called for User ${req.headers["RelevantID"]}...`);
        
        console.log(`Update EnergyHandling endpoint called for User ${req.headers["RelevantID"]}...`);
        const AccountName = req.params.AccountName;
        if (!AccountName) return res.status(404).json({ error: "Missing Data"});
        const Directory = Path.join(__dirname, "EnergyUsers");
        const filePath = Path.join(Directory, `Account_${AccountName}.json`);

        if (!FS.existsSync(Directory)) {
            FS.mkdirSync(Directory, { recursive: true });
        }
        let UserProfile = await FS.promises.readFile(filePath);
        let ParsedUserProfile = JSON.parse(UserProfile);

        return res.status(200).json({ message: "Successfully pullled information", ParsedUserProfile});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal Server Errror"});
    }
})
// POST
router.post("/EnergyHandling/CreateLocalUserProfile", async (req, res) => {
    try {
        console.log(`Post EnergyHandling endpoint called for User ${req.headers["RelevantID"]}...`);
        const UserData = req.body;

        console.log(UserData);

        const Directory = Path.join(__dirname, "EnergyUsers");
        const filePath = Path.join(Directory, `Account_${UserData.AccountName}.json`);

        if (!FS.existsSync(Directory)) {
            FS.mkdirSync(Directory, { recursive: true });
        }
        
        await FS.promises.writeFile(
            filePath,
            JSON.stringify({...UserData, EnergyYears: []}, null, 4)
        )

        return res.status(200).json({ message: "Successfully Created Local Account"});   
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal Server Errror"});
    }
})
// UPDATE
router.patch("/EnergyHandling/UpdateEnergy", async (req, res) => {
    try {
        console.log(`Update EnergyHandling endpoint called for User ${req.headers["RelevantID"]}...`);
        const UpdateData = req.body;
        const Directory = Path.join(__dirname, "EnergyUsers");
        const filePath = Path.join(Directory, `Account_${UpdateData.UserData.AccountName}.json`);

        if (!FS.existsSync(Directory)) {
            FS.mkdirSync(Directory, { recursive: true });
        };

        let UserProfile = await FS.promises.readFile(filePath);
        let ParsedUserProfile = JSON.parse(UserProfile);

        ParsedUserProfile.EnergyYears = [...ParsedUserProfile.EnergyYears, UpdateData.EnergyYear];

        await FS.promises.writeFile(filePath, JSON.stringify(ParsedUserProfile, null, 4));

        return res.status(200).json({ message: "Successfully updated EnergyHandling"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal Server Errror"});
    }
})
// DELETE
router.delete("/EnergyHandling/", async (req, res) => {
    try {

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal Server Errror"});
    }
})
module.exports = router;