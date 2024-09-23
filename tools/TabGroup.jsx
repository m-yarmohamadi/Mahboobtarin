import { useState } from "react"

export default function TabGroup({ tabs = [] }) {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <div className="w-full flex flex-col gap-6">
            <div className="w-full flex items-center gap-6 pb-2 border-b border-slate-300">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`${tab.name === activeTab.name ? " before:h-1 text-primary-01" : " before:h-0 text-gray-900"} px-1 relative before:w-full before:absolute before:-bottom-2 before:right-0 before:rounded-t-full before:duration-100 before:bg-primary-01`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {activeTab.component}
        </div>
    )
}
