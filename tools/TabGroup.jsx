"use client"
import React, { useEffect, useState } from "react"

export default function TabGroup({ tabs = [], children, handler, onIndex, className }) {
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        if (handler) {
            handler();
        }

        if (onIndex) {
            onIndex(activeTab);
        }
    }, [activeTab])

    return (
        <div className={`w-full flex flex-col gap-6 ${className}`}>
            <div className={`w-full flex items-center gap-6 pb-2 overflow-x-auto no-scrollbar border-b border-slate-300 dark:border-slate-400`}>
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => setActiveTab(index)}
                        className={`${index === activeTab ? " before:h-1 text-primary-01" : " before:h-0 text-slate-900"} ${tab?.className} text-base whitespace-nowrap px-1 relative before:w-full before:absolute before:-bottom-2 before:right-0 before:rounded-t-full before:duration-100 before:bg-primary-01`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div>
                {React.Children.toArray(children)[activeTab]}
            </div>
        </div>
    )
}

function TabItem({ children }) {
    return (
        <div>
            {children}
        </div>
    )
}

TabGroup.Item = TabItem;