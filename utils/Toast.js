import toast from "react-hot-toast";
import { enToFaMessages } from "./enToFaMessages";

export const toastFunction = (message,type)=>{
    message &&
    message.map((item, index) => {
        const faItem = enToFaMessages(item);
        toast[type](faItem, {
            style: {
                border: '1px solid #dc2626',
                padding: '16px',
                color:"#dc2626"
            },
            className: 'text-sm font-bold w-full ',
            iconTheme: {
                primary: '#dc2626',
                secondary: '#FFFAEE',
            },
            position: 'top-center',
        });
    });


}
export const toastLoading =()=>{
    
}