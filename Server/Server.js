const express = require("express");
const app = express();
const PORT = 3001;
const cors = require("cors");
const {CheckUsersLoop, RegisterUser, isUserActive, CanUserChangeDetails, ViewUsers} = require("./ServerRoutes/Admin/ActiveUserHandler.js");
require("dotenv").config();

const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200, 
    credentials: false,
}

app.use(cors(corsOptions));
app.use(express.json())
// Start Handle Active Users Loop
CheckUsersLoop();

const AccountSettingRoute = require("./ServerRoutes/Klex_UserData/Klex_UserData_AccountSettings.js");
const DiscrepencyRoute = require("./ServerRoutes/Klex_UserData/Klex_UserData_Discrepency.js");
const GeneralRoute = require("./ServerRoutes/Klex_UserData/Klex_UserData_General.js");
const PriorBillingsRoute = require("./ServerRoutes/Klex_UserData/Klex_UserData_PriorBillings.js");
const SecurityQuestionsRoute = require("./ServerRoutes/Klex_UserData/Klex_UserData_SecurityQuestions.js");
const SubScriptionDetailsRoute = require("./ServerRoutes/Klex_UserData/Klex_UserData_SubScriptionDetails.js");
const UserSupportDataRoute = require("./ServerRoutes/Klex_UserData/Klex_UserData_UserSupportData.js");

app.use("/API", AccountSettingRoute);
app.use("/API", DiscrepencyRoute);
app.use("/API", GeneralRoute);
app.use("/API", PriorBillingsRoute);
app.use("/API", SecurityQuestionsRoute);
app.use("/API", SubScriptionDetailsRoute);
app.use("/API", UserSupportDataRoute);

// TEST CONNECTION
app.get("/API/TEST", (req, res) => {
    return res.status(200).json({ message: "Connection Successfull"});
})

app.listen(3001, () => {
    console.log("Server is listening on port: ", PORT)
})