import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import Loading from "@/tools/Loading";
import { useCategoryChild } from "@/hooks/useMainPage";

export default function Categories({ isOpen, setIsOpen, categories, isLoading }) {
    const [lastHover, setLastHover] = useState(0);
    const { categoryChilds, isGetCateChild } = useCategoryChild(lastHover);
    const categoryListRef = useRef(null);

    useEffect(() => {
        if (!isLoading) setLastHover(categories[0].id);
    }, [isLoading]);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("lg:!overflow-hidden");

            categoryListRef.current?.classList.add("!flex");
            setTimeout(() => {
                categoryListRef.current?.classList.add("!opacity-100");
            }, 100);
        } else {
            document.body.classList.remove("lg:!overflow-hidden");

            categoryListRef.current?.classList.remove("!opacity-100");
            setTimeout(() => {
                categoryListRef.current?.classList.remove("!flex");
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
                className="category__list opacity-0 duration-300 ease-in-out items-start"
            >
                <div className="category__list-items w-full h-full flex overflo-y-auto bg-primary-02/50">
                    <ul className="w-[218px] flex flex-col overflow-y-auto overflow-x-hidden">
                        {!isLoading &&
                            categories.map((category) => (
                                <li key={category.id}>
                                    <div
                                        onMouseEnter={() => setLastHover(category.id)}
                                        className={`${lastHover === category.id &&
                                            "bg-white !text-primary-01 !border-y-gray-300"
                                            } category__list-items-parent-btn`}
                                    >
                                        {category.name}
                                    </div>
                                </li>
                            ))}
                    </ul>

                    <div className={`flex-1 flex h-[420px] p-7 z-50 bg-white overflow-y-auto drop-shadow-lg dark:shadow-darkLg`}>
                        {!isGetCateChild ?
                            <div className="flex-grow flex-1 h-full flex flex-col">
                                <div
                                    className=" text-xs mb-5 font-medium text-secondary-01 inline-flex items-center gap-2 !p-0"
                                >
                                    همه موارد مرتبط با {categoryChilds?.name}
                                    <FaAngleLeft className="w-3 h-3" />
                                </div>
                                <ul className="h-[400px] flex flex-col flex-wrap items-start">
                                    {categoryChilds?.children?.map(
                                        (subItem) => (
                                            <React.Fragment key={subItem.id}>
                                                <li className="w-auto">
                                                    <div
                                                        className="text-slate-800 flex items-center border-r-2 pr-2 mb-1 mt-4 border-r-primary-01 font-semibold text-xs  cursor-pointer duration-200"
                                                    >
                                                        {subItem.name}
                                                        <FaAngleLeft className="w-3 h-3" />
                                                    </div>
                                                </li>
                                                {subItem?.children?.map((subMenu) => (
                                                    <li key={subMenu.id} className="mb-1 w-auto">
                                                        <div
                                                            className="text-slate-500  text-[10px] cursor-pointer duration-200"
                                                        >
                                                            {subMenu.name}
                                                        </div>
                                                    </li>
                                                ))}
                                            </React.Fragment>
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
