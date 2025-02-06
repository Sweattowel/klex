const { neon } = require("@neondatabase/serverless");
const express = require("express");
const router = express.Router();
const DB = neon(process.env.REACT_APP_DATABASE_URL);
// Request Header Schema
/*
    Request["RequestType"]
    Request["RequestDateSent"]
    Request["RelevantID"]
    Request["UserType"]]
*/
// GET
router.update("/General/GetAccount", async (req, res) => {
    try {
        console.log(`Get Account endpoint called for ${req.header["RelevantID"]}`);
        
        const UserData = await DB`SELECT * FROM "Klex_UserData_General" WHERE "AccountID" = ${req.header["RelevantID"]}`
        return res.status(200).json({ message: "Successfully Collected Account" }, UserData );

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal Server Errror"});
    }
})
// POST
router.post("/General/LoginAccount", async (req, res) => {
    try {
        console.log(`Login Endpoint request made...`);
        
        const loginFormData = req.body;
        const UserData = await DB`
            SELECT * FROM "Klex_UserData_General"
            WHERE "AccountName" = ${loginFormData.UserName} AND "AccountEmail" = ${loginFormData.Email} AND "AccountPassword" = ${loginFormData.Password};
        `

        if (UserData.length === 1){
            const currDate = new Date()
            await DB`
                UPDATE "Klex_UserData_General"
                SET "LastLoginDate" = ${currDate}, "CountLogins" = ${Number(UserData[0].CountLogins) + 1}
                WHERE "AccountID" = ${Number(UserData[0].AccountID)}
            `

            res.header["RequestType"] = req.header["RequestType"]
            res.header["RequestDateSent"] = req.header["RequestDateSent"]
            res.header["RelevantID"] = req.header["RelevantID"]
            res.header["UserType"] = req.header["UserType"]

            return res.status(200).json({ Message: "Successfully verified account"})
        } else {
            return res.status(500).json({ error: "Failed to verify"});
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal Server Errror"});
    }
})

router.post("/General/CreateAccount", async (req, res) => {
    try {
        console.log("Registration endpoint called");

        const registerFormData = req.body; 
        console.log(registerFormData);

        // Check if user already exists
        const VerifySoleUser = await DB`
            SELECT COUNT(*) AS count
            FROM "Klex_UserData_General"
            WHERE "AccountName" = ${registerFormData.UserName}
            OR "AccountEmail" = ${registerFormData.Email};
        `;
        console.log(VerifySoleUser);

        if (VerifySoleUser[0].count === "0") {
            console.log("Verified sole user... Inputting data to UserData table");
            // Insert new user
            await DB`
                INSERT INTO "Klex_UserData_General" ("AccountName", "AccountEmail", "AccountPassword", "AccountCreated")
                VALUES (${registerFormData.UserName}, ${registerFormData.Email}, ${registerFormData.Password}, ${new Date()});
            `;
            console.log("Data inputed, collecting Generated Data")
            // Retrieve the newly created user
            const CollectUserData = await DB`
                SELECT * 
                FROM "Klex_UserData_General"
                WHERE "AccountName" = ${registerFormData.UserName}
                AND "AccountEmail" = ${registerFormData.Email};
            `;
            if (CollectUserData[0]) {
                console.log("Generated Data collected... Flashing")
                const dataToPlace = CollectUserData[0];
                const currDate = new Date();

                // Update login details
                await DB`
                    UPDATE "Klex_UserData_General"
                    SET "LastLoginDate" = ${currDate}, "CountLogins" = ${Number(dataToPlace.CountLogins || 0) + 1}
                    WHERE "AccountID" = ${dataToPlace.AccountID};
                `;

                // Insert into AccountSettings
                await DB`
                    INSERT INTO "Klex_UserData_AccountSettings" (
                        "AccountID", "SelectedTheme", "PushAdvertisement", "Active", 
                        "NotifyByEmail", "NotifyBySMS", "NotifyByPH", "PushNotifications", 
                        "PrivacySensitiveData", "PrivacyDataShare", "SecurityTwoFactor", "LoginAlert"
                    )
                    VALUES (
                        ${dataToPlace.AccountID}, 'Light', false, true, 
                        false, false, false, false, 
                        false, false, false, false
                    );
                `;

                const oneYearFromNow = new Date();
                oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

                await DB`
                    INSERT INTO "Klex_UserData_SubscriptionDetails" (
                        "CurrentPlan", "AutoRenew", "FollowUpDate", "AccountID"
                    )
                    VALUES (
                        NULL, false, ${oneYearFromNow}, ${dataToPlace.AccountID}
                    );
                `;
                console.log("Registration and flashing completed, returning 200")
                return res.status(200).json({ message: "Successfully registered and data initialized" });
            }
        } else {
            return res.status(409).json({ message: "User already exists" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal Server Errror"});
    }
})
// UPDATE
router.update("/General/UpdateAccount", async (req, res) => {
    try {
        console.log(`Update Account endpoint called for ${req.header["RelevantID"]}`);
        
        const UpdateFormData = req.body
        await DB`UPDATE "Klex_UserData_General"
            SET 
            "AccountEmail" = ${UpdateFormData.AccountEmail},
            "AccountName" = ${UpdateFormData.AccountName},
            "AccountPassword" = ${UpdateFormData.AccountPassword},
            "AccountBillingPeriod" = ${UpdateFormData.AccountBillingPeriod}
            WHERE "AccountID" = ${UpdateFormData.AccountID}
        `
        return res.status(200).json({ message: "Successfully Updated Account" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal Server Errror"});
    }
})
// DELETE
router.delete("/General/DeleteAccount", async (req, res) => {
    try {
        console.log(`Delete Account endpoint called for ${req.header["RelevantID"]}`);
        
        const Count = await DB`DELETE FROM "Klex_UserData_General"
            WHERE "AccountID" = ${req.header["RelevantID"]}
        `
        return Count.Count === 1 ? res.status(200).json({ message: "Successfully Deleted Account" }) : res.status(500).json({ message: "Failed to delete account" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal Server Errror"});
    }
})
module.exports = router;