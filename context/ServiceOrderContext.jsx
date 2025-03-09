import { createContext, useContext, useEffect, useState } from "react";

const ServiceOrderContext = createContext();

const mahbobtarinLocalStorage = "mahbobtarinService";
export default function ServiceOrderProvider({ children }) {
    const [service, setService] = useState();

    const createService = (data) => {
        setService(data);
    }

    const resetService = () => {
        setService();
        localStorage.removeItem(mahbobtarinLocalStorage);
    }    

    useEffect(() => {
        if (service) {
            localStorage.setItem(mahbobtarinLocalStorage, JSON.stringify(service));
        }
    }, [service]);

    useEffect(() => {
        const serviceData = localStorage.getItem(mahbobtarinLocalStorage) || null;
        setService(serviceData && JSON.parse(serviceData));
    }, []);

    return (
        <ServiceOrderContext.Provider
            value={{
                createService,
                resetService,
                service
            }}
        >
            {children}
        </ServiceOrderContext.Provider>
    )
}

export function useServiceOrderContext() {
    const context = useContext(ServiceOrderContext);

    if (context === undefined) throw new Error("CartShop context was used outside of CartShopContext");

    return context
}