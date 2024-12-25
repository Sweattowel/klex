import { useState, createContext, useEffect } from "react";

export const  ThemeContext = createContext();

export const ThemeContextProvider = ({ children } ) => {
    const [theme, setTheme] = useState('Light');
    const [themeAlt, setThemeAlt] = useState('altLight');

    return (
        <ThemeContext.Provider value={{theme, setTheme, themeAlt, setThemeAlt}}>
            {children}
        </ThemeContext.Provider>
    )
}