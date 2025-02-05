const express = require("express");
const app = express();
const PORT = 3001;
const cors = require("cors");

require("dotenv").config();

const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200, 
    credentials: false,
}

app.use(cors(corsOptions));
app.use(express.json())

const UserDataRoute = require("./ServerRoutes/Klex_UserData/UserDataHandler.js");
const UserDataEnergyRoute = require("./ServerRoutes/Klex_UserData_EnergyUse/UserEnergyHandler.js");

app.use("/API", UserDataRoute);
app.use("/API", UserDataEnergyRoute);


// TESTING
app.get("/API/TEST", (req, res) => {
    return res.status(200).json({ message: "Test Complete"});
})

app.listen(3001, () => {
    console.log("Server is listening on port: ", PORT)
})