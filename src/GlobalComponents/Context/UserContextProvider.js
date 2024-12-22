import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ( { children } ) => {
    const [ UserData, setUserData ] = useState({
        ID: null,
        UserName: "",
        Email: ""
    });

    return (
        <UserContext.Provider value={{ UserData, setUserData}}>
            {children}
        </UserContext.Provider>
    );
};