const { neon } = require("@neondatabase/serverless");
const express = require("express");
const router = express.Router();
// RESTFUL DESIGN
// DB
const DB = neon(process.env.REACT_APP_DATABASE_URL);
// POST
router.post("/UserData/HandleRegistration", async (req, res) => {
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
        return res.status(500).json({ error: "Internal server error" });
    }
});
// GET LOGIN
router.post("/UserData/UserLogin", async (req, res) => {
    try {
        const loginFormData = req.body;
        console.log("Login Endpoint called for ID", loginFormData.UserName);    

        const UserData = await DB`
                SELECT * FROM "Klex_UserData_General"
                WHERE "AccountName" = ${loginFormData.UserName} AND "AccountEmail" = ${loginFormData.Email} AND "AccountPassword" = ${loginFormData.Password};
            `
        const SelectedTheme = await DB`
        SELECT "SelectedTheme" FROM "Klex_UserData_AccountSettings"
        `
        if (UserData.length === 1){
            const currDate = new Date()
            await DB`
                UPDATE "Klex_UserData_General"
                SET "LastLoginDate" = ${currDate}, "CountLogins" = ${Number(UserData[0].CountLogins) + 1}
                WHERE "AccountID" = ${Number(UserData[0].AccountID)}
            `

            return res.status(200).json({UserData: UserData[0], SelectedTheme: SelectedTheme});
        } else {
            return res.status(500).json({ error: "Failed to verify"});
        }
    } catch (error) {
        console.error("Error in /UserData/CollectSingleUser endpoint:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
// GET FILL
router.get("/UserData/CollectSingleUser/:AccountID", async (req, res) => {
    try {
        console.log("UserData collect single userData endpoint called");    
        
        let AccountID = Number(req.params.AccountID);
        if (isNaN(AccountID)) {
            console.error("Invalid AccountID provided");
            return res.status(400).json({ error: "Invalid AccountID" });
        }

        const UserDataToReturn = await DB`
            SELECT 
            "Klex_UserData_General".*,
            "Klex_UserData_AccountSettings".*,
            "Klex_UserData_Discrepency".*,
            "Klex_UserData_SubscriptionDetails".*,
            "Klex_UserData_UserSupportData".*,
            "Klex_UserData_SecurityQuestions".*
            FROM 
            "Klex_UserData_General"
            LEFT JOIN 
            "Klex_UserData_AccountSettings" ON "Klex_UserData_General"."AccountID" = "Klex_UserData_AccountSettings"."AccountID"
            LEFT JOIN 
            "Klex_UserData_Discrepency" ON "Klex_UserData_General"."AccountID" = "Klex_UserData_Discrepency"."AccountID"
            LEFT JOIN 
            "Klex_UserData_SubscriptionDetails" ON "Klex_UserData_General"."AccountID" = "Klex_UserData_SubscriptionDetails"."AccountID"
            LEFT JOIN 
            "Klex_UserData_UserSupportData" ON "Klex_UserData_General"."AccountID" = "Klex_UserData_UserSupportData"."AccountID"
            LEFT JOIN 
            "Klex_UserData_SecurityQuestions" ON "Klex_UserData_General"."AccountID" = "Klex_UserData_SecurityQuestions"."AccountID"
            WHERE 
            "Klex_UserData_General"."AccountID" = ${AccountID}
        `;
        
        console.log("Query result:", UserDataToReturn);

        if (UserDataToReturn.length === 1) {
            console.log("Data found for User... Returning 200");
            return res.status(200).json(UserDataToReturn);
        } else {
            console.log("Failed to collect Data/ Too much data present, Aborting");
            return res.status(404).json({ message: "No Data found for user" });
        }
    } catch (error) {
        console.error("Error in /UserData/CollectSingleUser endpoint:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// GET ALL
router.get("/UserDataCollectAllUserData", async (req, res) => {
    try {
        const AllData = await DB`
        SELECT * FROM "Klex_UserData_general
        `

        return res.status(200).json(AllData);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal Server Errror"});
    }
})
// PUT
router.put("/UserData", (req, res) => {
    try {
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal Server Errror"});
    }
})
// PATCH
router.patch("/UpdateUserData/:AccountID", async (req, res) => {
    try {
        console.log("Received Request to update UserData")
        const { AccountID } = req.params
        const userData = req.body
        delete userData.AccountID;
        console.log(userData.AccountSettings)
        // Update AccountSettings
        await DB`
            UPDATE "Klex_UserData_AccountSettings"
                SET 
                "SelectedTheme" = ${userData.AccountSettings.SelectedTheme},
                "PushAdvertisement" = ${userData.AccountSettings.PushAdvertisement},
                "Active" = ${userData.AccountSettings.Active},

                "NotifyByEmail" = ${userData.AccountSettings.NotificationPreferences.Email},
                "NotifyBySMS" = ${userData.AccountSettings.NotificationPreferences.SMS},
                "NotifyByPH" = ${userData.AccountSettings.NotificationPreferences.PH},

                "PushNotifications" = ${userData.AccountSettings.NotificationPreferences.PushNotifications},

                "PrivacySensitiveData" = ${userData.AccountSettings.PrivacySettings.SensitiveData},
                "PrivacyDataShare" = ${userData.AccountSettings.PrivacySettings.DataShare},

                "SecurityTwoFactor" = ${userData.Security.TwoFactorAuthentication},
                "LoginAlert" = ${userData.Security.LoginAlert},

                "Language" = ${userData.LanguageAndLocation.Language},
                "TimeZone" = ${userData.LanguageAndLocation.TimeZone}
            WHERE "AccountID" = ${AccountID}
        `;
        // Update General

        await DB`
            UPDATE "Klex_UserData_General"
            SET 
            "AccountEmail" = ${userData.AccountEmail},
            "AccountName" = ${userData.AccountName},
            "AccountPassword" = ${userData.AccountPassword}
            WHERE "AccountID" = ${AccountID}
        `;
        // Update SubscriptionDetails
        await DB`
            UPDATE "Klex_UserData_SubscriptionDetails"
            SET "AutoRenew" = ${userData.SubScriptionDetails.AutoRenew ? true: false}
            WHERE "AccountID" = ${AccountID}
        `;
        res.status(200).json({ message: "UserData successfully Updated"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal Server Errror"});
    }
})
// DELETE
router.delete("/UserData/:AccountID", async (req, res) => {
    try {
        const AccountID = Number(req.params.AccountID);
        console.log("Received Delete request for ID: ", AccountID);
        await DB`
            DROP * FROM "Klex_UserData_General
            WHERE "AccountID" = ${AccountID}
        `

        return res.status(200).json({ message: "Account Data successfully deleted"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal Server Errror"});
    }
})
// SECURITY QUESTION ADD AND REMOVE ONLY


// TESTING
router.get("/UserData/TEST", (req, res) => {
    return res.status(200).json({ message: "UserDataSuccess"})
})

module.exports = router;