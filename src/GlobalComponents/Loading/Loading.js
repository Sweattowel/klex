import { useContext } from "react"
import { ThemeContext } from "../Context/ThemeContextProvider"
import "./Loading.css";
export default function Loading(){
    const {theme, setTheme, themeAlt, setThemeAlt} = useContext(ThemeContext);
    return (
        <main className={`LoadingScreen ${theme}`}>
            <h1 className={`${themeAlt}`}>LOADING</h1>
        </main>
    )
}