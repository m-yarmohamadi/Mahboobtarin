import { FaAngleDown } from "react-icons/fa6";

export default function Accordion({ title, selected, setSelected, name, children }) {
    return (
        <div className={`w-full overflow-hidden ${selected ? "my-3 rounded-t-lg" : "my-2 rounded-lg"}`}>
            <button onClick={setSelected} className='w-full flex items-center justify-between p-3 bg-slate-300 text-slate-800 font-semibold'>
                {title}
                <FaAngleDown className={`w-4 h-4 duration-200 ${selected && "rotate-180"}`} />
            </button>
            <div className={`w-full bg-slate-100 rounded-b-lg px-4 ${selected ? "max-h-screen py-4" : "max-h-0"} duration-300 ease-in-out`}>
                {children}
            </div>
        </div>
    )
}
