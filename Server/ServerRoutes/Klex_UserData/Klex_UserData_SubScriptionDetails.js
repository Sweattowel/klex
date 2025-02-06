const { neon } = require("@neondatabase/serverless");
const express = require("express");
const router = express.Router();
const DB = neon(process.env.REACT_APP_DATABASE_URL);

// GET
router.get("/Subscription/GetSubscriptionDetails/:AccountID", async (req, res) => {
    try {
        console.log(`Get SubscriptionDetails endpoint called for User ${req.headers["RelevantID"]}...`);
        const SubscriptionDetails = await DB`
            SELECT * FROM "Klex_UserData_SubscriptionDetails"
            WHERE "AccountID" = ${req.params.AccountID}
        `;
        return SubscriptionDetails.length === 1 ? res.status(200).json({ message: "Successfully Collected UserData", SubscriptionDetails}) : res.status(404).json({ message: "No Data Found"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal Server Errror"});
    }
})
// POST
router.post("/Subscription/CreateSubscriptionDetails", async (req, res) => {
    try {
        console.log(`Create SubscriptionDetails endpoint called for User ${req.headers["RelevantID"]}...`);
        const InsertForm = req.body;

        const InsertStatement = await DB`
            INSERT INTO "Klex_UserData_SubscriptionDetails" 
            ("CurrentPlan","AutoRenew","FollowUpDate","AccountID")
            VALUES (${UpdateForm.CurrentPlan},${UpdateForm.AutoRenew},${UpdateForm.FollowUpDate},${UpdateForm.AccountID})
        `;
        return InsertStatement.count === 1 ? res.status(200).json({ message: "Successfully Created SubscriptionDetails"}) : res.status(200).json({ message: "Failed to Create SubscriptionDetails "});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal Server Errror"});
    }
})
// UPDATE
router.patch("/Subscription/UpdateSubscriptionDetails", async (req, res) => {
    try {
        console.log(`Update SubscriptionDetails endpoint called for User ${req.headers["RelevantID"]}...`);
        const UpdateForm = req.body;

        const UpdateStatement = await DB`
            UPDATE "Klex_UserData_SubscriptionDetails" 
            SET
                "CurrentPlan" = ${UpdateForm.CurrentPlan},
                "AutoRenew" = ${UpdateForm.AutoRenew},
                "FollowUpDate" = ${UpdateForm.FollowUpDate},
            WHERE "AccountID" = ${UpdateForm.AccountID}
        `
        return UpdateStatement.count === 1 ? res.status(200).json({ message: "Successfully Updated SubscriptionDetails"}) : res.status(200).json({ message: "Failed to Update SubscriptionDetails "});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal Server Errror"});
    }
})
// DELETE
router.delete("/Subscription/DeleteSubscriptionDetails/:AccountID", async (req, res) => {
    try {
        console.log(`Delete SubscriptionDetails endpoint called for User ${req.headers["RelevantID"]}...`);
        const DeleteStatement = await DB`
            DELETE FROM "Klex_UserData_SubscriptionDetails" 
            WHERE "AccountID" = ${req.params.AccountID}
        `;
        return DeleteStatement.count === 1 ? res.status(200).json({ message: "Successfully Deleted SubscriptionDetails"}) : res.status(200).json({ message: "Failed to Delete SubscriptionDetails "});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal Server Errror"});
    }
})
module.exports = router;