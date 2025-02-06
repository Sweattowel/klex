const { neon } = require("@neondatabase/serverless");
const express = require("express");
const router = express.Router();
const DB = neon(process.env.REACT_APP_DATABASE_URL);

// GET
router.get("/AccountSettings/GetAccountSettings/:AccountID", async (req, res) => {
    try {
        console.log(`Get AccountSettings endpoint called for User ${req.headers["RelevantID"]}...`);
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
router.post("/AccountSettings/CreateSettings/:AccountID", async (req, res) => {
    try {
        console.log(`Post AccountSettings endpoint called for User ${req.headers["RelevantID"]}...`);
        const AccountID = req.params.AccountID;

        await DB`
            INSERT INTO "Klex_UserData_AccountSettings" (
                "AccountID", "SelectedTheme", "PushAdvertisement", "Active", 
                "NotifyByEmail", "NotifyBySMS", "NotifyByPH", "PushNotifications", 
                "PrivacySensitiveData", "PrivacyDataShare", "SecurityTwoFactor", "LoginAlert"
            )
            VALUES (
                ${AccountID}, 'Light', false, true, 
                false, false, false, false, 
                false, false, false, false
            );
        `;
        return res.status(200).json({ message: "Successfully retrieved account settings", AccountSettings});   
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal Server Errror"});
    }
})
// UPDATE
router.patch("/AccountSettings/UpdateAccount", async (req, res) => {
    try {
        console.log(`Update AccountSettings endpoint called for User ${req.headers["RelevantID"]}...`);
        const AccountUpdateDetails = req.body;

        await DB`
            UPDATE "Klex_UserData_AccountSettings"
                SET 
                "SelectedTheme" = ${AccountUpdateDetails.AccountSettings.SelectedTheme},
                "PushAdvertisement" = ${AccountUpdateDetails.AccountSettings.PushAdvertisement},
                "Active" = ${AccountUpdateDetails.AccountSettings.Active},

                "NotifyByEmail" = ${AccountUpdateDetails.AccountSettings.NotificationPreferences.NotifyByEmail},
                "NotifyBySMS" = ${AccountUpdateDetails.AccountSettings.NotificationPreferences.NotifyBySMS},
                "NotifyByPH" = ${AccountUpdateDetails.AccountSettings.NotificationPreferences.NotifyByPH},

                "PushNotifications" = ${AccountUpdateDetails.AccountSettings.NotificationPreferences.PushNotifications},

                "PrivacySensitiveData" = ${AccountUpdateDetails.AccountSettings.PrivacySettings.PrivacySensitiveData},
                "PrivacyDataShare" = ${AccountUpdateDetails.AccountSettings.PrivacySettings.PrivacyDataShare},

                "SecurityTwoFactor" = ${AccountUpdateDetails.Security.SecurityTwoFactor},
                "LoginAlert" = ${AccountUpdateDetails.Security.LoginAlert},

                "Language" = ${AccountUpdateDetails.LanguageAndLocation.Language},
                "TimeZone" = ${AccountUpdateDetails.LanguageAndLocation.TimeZone}
            WHERE "AccountID" = ${AccountID}
        `;
        return res.status(200).json({ message: "Successfully updated AccountSettings"});
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