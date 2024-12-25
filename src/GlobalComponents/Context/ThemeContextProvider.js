import { useState, createContext, useEffect } from "react";

export const  ThemeContext = createContext();

export const ThemeContextProvider = ({ children } ) => {
    const [theme, setTheme] = useState('');
    const [themeAlt, setThemeAlt] = useState('');

    return (
        <ThemeContext.Provider value={{theme, setTheme, themeAlt, setThemeAlt}}>
            {children}
        </ThemeContext.Provider>
    )
}