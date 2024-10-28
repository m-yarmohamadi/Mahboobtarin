import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";

export default function GroupExpertises({ data }) {
    return (
        <div className="flex flex-col overflow-y-auto">
            {data?.filter((c) => c.parent_id === 0).map((item) => (
                <GroupTree key={item.id} label={item.name} cateChildren={item?.children_recursive} />
            ))}
        </div>
    )
}

function GroupTree({ label, cateChildren }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='text-textDefault w-full text-sm'>
            <div
                className='flex items-center justify-between w-full cursor-pointer pb-4'
                onClick={toggleOpen}
            >
                <span>{label}</span>
                {
                    cateChildren.length ?

                        <span className={`mr-2 ${isOpen ? '-rotate-90' : ''} flex gap-3`}>
                            <FaAngleLeft />
                        </span>
                        :
                        null
                }
            </div>
            {isOpen &&
                <div className="px-2">
                    {cateChildren.map((subItem) => (
                        <GroupTree key={subItem.id} label={subItem.name} cateChildren={subItem?.children_recursive} />
                    ))}
                </div>
            }
        </div>
    );
}