import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";

export default function GroupExpertises({ data }) {
    return (
        <div className="flex flex-col">
            {data.map((item) => (
                <GroupTree key={item.id} label={item.title}>
                    {item?.children_recursive.map((subItem) => (
                        <GroupTree key={subItem.id} label={subItem.title} />
                    ))}
                </GroupTree>
            ))}
        </div>
    )
}

function GroupTree({ label, children }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='ml-4 pb-3 text-textDefault text-sm'>
            <div
                className='flex items-center cursor-pointer'
                onClick={toggleOpen}
            >
                <span>{label}</span>
                <span className={`mr-2 ${isOpen ? '-rotate-90' : ''} flex gap-3`}>
                    <FaAngleLeft />
                </span>
            </div>
            {isOpen && <div className='ms-4'>{children}</div>}
        </div>
    );
}