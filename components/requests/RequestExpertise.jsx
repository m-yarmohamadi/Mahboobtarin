import Link from "next/link";
import { useState, useEffect } from "react";
import { FaAngleLeft } from "react-icons/fa6";

export default function RequestExpertise({ data, searchTerm }) {
    const filterCategories = (categories) => {
        return categories.filter((category) => {
            const matchCategory = category.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchChildren = category?.children_recursive && filterCategories(category.children_recursive).length > 0;
            return matchCategory || matchChildren;
        });
    };

    return (
        <div className="flex flex-col overflow-y-auto">
            {filterCategories(data?.filter((c) => c.parent_id === 0)).map((item) => (
                <ExpertisesItem key={item.id} id={item.id} label={item.name} cateChildren={item?.children_recursive} searchTerm={searchTerm} />
            ))}
        </div>
    );
}

function ExpertisesItem({ id, label, cateChildren, searchTerm }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (searchTerm) {
            const hasMatchingChildren = cateChildren.some(
                (child) =>
                    child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (child.children_recursive && child.children_recursive.some((subChild) => subChild.name.toLowerCase().includes(searchTerm.toLowerCase())))
            );
            setIsOpen(hasMatchingChildren);
        } else {
            setIsOpen(false);
        }
    }, [searchTerm, cateChildren]);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const filteredChildren = cateChildren.filter((subItem) =>
        subItem.name.toLowerCase().includes(searchTerm.toLowerCase()) || (subItem?.children_recursive && subItem.children_recursive.length > 0)
    );

    return (
        <div className='text-textDefault w-full text-sm'>
            <div
                className='flex items-center justify-between w-full cursor-pointer pb-4'
            >
                <Link href={`/requests`}>{label}</Link>
                {filteredChildren.length > 0 && (
                    <span onClick={toggleOpen} className={`mr-2 ${isOpen ? '-rotate-90' : ''} flex gap-3`}>
                        <FaAngleLeft />
                    </span>
                )}
            </div>
            {isOpen && filteredChildren.length > 0 && (
                <div className="px-2">
                    {filteredChildren.map((subItem) => (
                        <ExpertisesItem key={subItem.id} id={subItem.id} label={subItem.name} cateChildren={subItem?.children_recursive} searchTerm={searchTerm} />
                    ))}
                </div>
            )}
        </div>
    );
}
