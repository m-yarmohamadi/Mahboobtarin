import toast from "react-hot-toast";
import { enToFaMessages } from "./enToFaMessages";

export const toastFunction = (message,type)=>{
    message &&
    message.map((item, index) => {
        const faItem = enToFaMessages(item);
        toast[type](faItem);
    });


}
export const toastLoading =()=>{
    
}