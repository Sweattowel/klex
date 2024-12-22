import { useState, createContext } from "react";

export const  ThemeContext = createContext();

export const ThemeContextProvider = ({ children } ) => {
    const [theme, setTheme] = useState('Dark');
    const [themeAlt, setThemeAlt] = useState('altDark');


    return (
        <ThemeContext.Provider value={{theme, setTheme, themeAlt, setThemeAlt}}>
            {children}
        </ThemeContext.Provider>
    )
}