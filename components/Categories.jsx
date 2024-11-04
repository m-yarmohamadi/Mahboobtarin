import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import Loading from "@/tools/Loading";

export default function Categories({ isOpen, setIsOpen, categories, isLoading }) {
    const [lastHover, setLastHover] = useState(0);
    const categoryListRef = useRef(null);
    const [childrenRecursive, setChildrenRecursive] = useState({});

    useEffect(() => {
        if (!isLoading) {
            const firstCategory = categories.filter((c) => c.parent_id === 0)[0];
            setChildrenRecursive(firstCategory || {});
            setLastHover(firstCategory.id)
        }
    }, [isLoading]);

    useEffect(() => {
        const getScrollWidth = window.innerWidth - document.body.clientWidth;

        if (isOpen) {
            document.body.classList.add("lg:!overflow-hidden");
            if(document.body.clientWidth >= 1024){
                document.body.style.paddingRight = `${getScrollWidth}px`;
            }

            categoryListRef.current?.classList.add("!flex");
            setTimeout(() => {
                categoryListRef.current?.classList.add("!opacity-100");
            }, 100);
        } else {
            categoryListRef.current?.classList.remove("!opacity-100");
            
            setTimeout(() => {
                categoryListRef.current?.classList.remove("!flex");
                document.body.classList.remove("lg:!overflow-hidden");
                document.body.style.paddingRight = `0px`;

            }, 300);
        }
    }, [isOpen]);

    return (
        <>
            {isOpen && (
                <div onClick={setIsOpen} className={"hidden lg:block w-full h-screen z-50 fixed top-[68px] right-0 bg-black/10 backdrop-blur"}></div>
            )}

            <div
                ref={categoryListRef}
                onMouseLeave={() => setIsOpen(false)}
                className="category__list opacity-0 duration-500 ease-in-out items-start"
            >
                <div className="category__list-items w-full h-full flex overflo-y-auto bg-primary-02/50">
                    <ul className="w-[218px] flex flex-col overflow-y-auto overflow-x-hidden">
                        {!isLoading &&
                            categories.filter((c) => c.parent_id === 0).map((category) => (
                                <li key={category.id}>
                                    <Link
                                        href={`/group/${category.id}`}
                                        onMouseEnter={() => {
                                            setLastHover(category.id);
                                            setChildrenRecursive(category);
                                        }}
                                        className={`${lastHover === category.id &&
                                            "bg-white !text-primary-01 !border-y-gray-300"
                                            } category__list-items-parent-btn`}
                                    >
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                    </ul>

                    <div className={`flex-1 flex min-h-full pt-7 pr-7 z-50 bg-white overflow-y-auto drop-shadow-lg dark:shadow-darkLg`}>
                        {!isLoading ?
                            <div className="w-full flex flex-col flex-1 flex-grow">
                                <Link
                                    href={`/group/${childrenRecursive?.id}`}
                                    className=" text-xs mb-7 font-medium text-secondary-01 inline-flex items-center gap-2 !p-0 whitespace-nowrap"
                                >
                                    همه موارد مرتبط با {childrenRecursive?.name}
                                    <FaAngleLeft className="w-3 h-3" />
                                </Link>
                                <ul className={`[column-width:180px]  [column-fill:balance]`}>
                                    {childrenRecursive?.children_recursive?.map(
                                        (subItem) => (
                                            <div key={subItem.id} className="break-inside-avoid">
                                                <li className="pt-1 pb-2 pl-6">
                                                    <Link
                                                        href={`/group/${subItem.id}`}
                                                        className="text-slate-800 flex items-center border-r-2 pr-1 border-r-primary-01 font-semibold text-xs  cursor-pointer duration-200"
                                                    >
                                                        {subItem.name}
                                                        <FaAngleLeft className="w-3 h-3" />
                                                    </Link>
                                                </li>
                                                <ul className="pl-10 mb-4">
                                                    {subItem?.children_recursive?.map((subMenu) => (
                                                        <li key={subMenu.id}>
                                                            <Link
                                                                href={`/group/${subItem.id}`}
                                                                className="text-slate-500  text-[10px] cursor-pointer duration-200"
                                                            >
                                                                {subMenu.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )
                                    )}
                                </ul>

                            </div>
                            :
                            <div className="w-full min-h-full flex items-center justify-center">
                                <Loading customeColor={'#0693a4'} />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
