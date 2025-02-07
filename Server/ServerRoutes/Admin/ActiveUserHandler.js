const JWT = require("jsonwebtoken");

let CurrentUsers = [];

async function CheckUsersLoop(){
    console.log("Active User Looping started...");

    const ValidUsers = await Promise.all(
        CurrentUsers.map(async (User) => {
            try {
                const decoded = JWT.decode(User.Cookie);
                
                const expirationTime = decoded?.exp * 1000;
                const timeRemaining = expirationTime - Date.now();

                if (timeRemaining < 600000) {
                    console.log(`Refreshing for User ${User.AccountName}`)
                    User.Cookie = JWT.sign(UserData, process.env.REACT_APP_DATABASE_JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                }
                return decoded ? User : null;
            } catch (err) {
                return null;
            }
        })
    )
    CurrentUsers = ValidUsers.filter(_ => _ !== null);

    console.log("Active User Looping Success...");
    ViewUsers();
    setTimeout(async () => await CheckUsersLoop(), 30000);
};


function RegisterUser(UserData){
    PriorUser = FindUser(UserData.AccountID);

    if (PriorUser) {
        PriorUser.LoginSessionCount++;    
        return;
    };

    var Cookie = JWT.sign(UserData, process.env.REACT_APP_DATABASE_JWT_KEY,
        {
            expiresIn: "1h"
        }
    );

    if (Cookie) {
        CurrentUsers.push(new CurrentUserClass(false, Cookie, UserData));
        return Cookie;
    } else {
        return "";
    }
};

function isUserActive(UserName) {
    return CurrentUsers.some(_ => _.AccountName === UserName);
};

function CanUserChangeDetails(AccountID) {
    const User = FindUser(AccountID);

    if (User && JWT.decode(User.Cookie)){
        console.log(User.Cookie);
        if (User.ChangeDetailCount === 3) return false;

        User.ChangeDetailCount++;
        return User.Permissions.ChangeDetails;
    } else {
        return false;
    }
}
function ViewUsers() {
    console.log("Current Active Users:");

    CurrentUsers.forEach((User, index) => {
        console.log(`----------------------------------------------`);
        console.log(`User ${index + 1}:`);
        for (var [key, value] of Object.entries(User)){
            console.log(`-------------------------`);
            console.log("|", key, value, "|");
        }
        console.log(`----------------------------------------------`);
    });
}
function FindUser(AccountID) {
    return UserInUsers = CurrentUsers.find(_ => _.AccountID === AccountID);
}

class CurrentUserClass {
    constructor(UserType, Cookie, UserData){
        this.AccountID = UserData.AccountID;
        this.UserName = UserData.AccountName;
        this.Email = UserData.AccountEmail
        this.Cookie = Cookie;

        this.Permissions = {
            Login: false,
            ChangeDetails: true,
            Admin: UserType
        };
        this.LoginSessionCount = 1;
        this.ChangeDetailCount = 1;
        
    }
}

module.exports = { CheckUsersLoop, RegisterUser, isUserActive, CanUserChangeDetails, ViewUsers };