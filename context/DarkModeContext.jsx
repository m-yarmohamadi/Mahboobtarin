import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

export default function DarkModeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(null); 

    const toggleDarkMode = () => {
        setIsDarkMode(prevDark => !prevDark);
    }

    useEffect(() => {
        const getDarkMode = localStorage.getItem("darkMode");
        setIsDarkMode(getDarkMode ? JSON.parse(getDarkMode) : false); 
    }, []);

    useEffect(() => {
        if (isDarkMode !== null) {
            if (isDarkMode) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }

            localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
        }
    }, [isDarkMode]);

    if (isDarkMode === null) return null;

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    )
}

export function useDarkMode() {
    const context = useContext(DarkModeContext);

    if (context === undefined) throw new Error("Dark mode context was used outside of DarkModeProvider");

    return context;
}
