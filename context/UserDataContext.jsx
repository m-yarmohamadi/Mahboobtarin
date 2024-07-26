import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";


const UserDataContext = createContext();

export default function UserDataProvider({ children }) {
    const [userData, setUserData] = useState(null);

    const saveUserDataHandler = (data) => {
        localStorage.setItem("USER_DATA", JSON.stringify(data));
    }

    useEffect(() => {
        const userDataValue = localStorage.getItem("USER_DATA") || null;
        if (!Cookies.get("accessToken")) {
            setUserData(null);
            userDataValue && localStorage.removeItem("USER_DATA");
        } else {
            setUserData(userDataValue ? JSON.parse(userDataValue) : null);
        }
    }, [])

    return (
        <UserDataContext.Provider value={{ userData, saveUserDataHandler }}>
            {children}
        </UserDataContext.Provider>
    )
}

export function useUserDataContext() {
    return useContext(UserDataContext);
}