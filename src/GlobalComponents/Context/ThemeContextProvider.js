import { useState, createContext, useEffect } from "react";

export const  ThemeContext = createContext();

export const ThemeContextProvider = ({ children } ) => {
    const [theme, setTheme] = useState('');
    const [themeAlt, setThemeAlt] = useState('');

    useEffect(() => {
        //localStorage.setItem("KLEXTHEMECACHE", JSON.stringify({theme, themeAlt}));
    },[theme, themeAlt])
    useEffect(() => {
        const cachedTheme = JSON.parse(localStorage.getItem("KLEXTHEMECACHE"));
        console.log(cachedTheme)
        console.log(cachedTheme["theme"])
        setTheme(cachedTheme["theme"]);
        setThemeAlt(cachedTheme["themeAlt"]);
    },[])
    return (
        <ThemeContext.Provider value={{theme, setTheme, themeAlt, setThemeAlt}}>
            {children}
        </ThemeContext.Provider>
    )
}