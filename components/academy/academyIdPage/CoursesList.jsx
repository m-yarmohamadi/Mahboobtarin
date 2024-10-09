import Accordion from "@/tools/Accordion"
import { useState } from "react"

export default function CoursesList() {
    const [selectedCourse, setSelectedCourse] = useState("");

    return (
        <div className="bg-white px-3 py-6 lg:p-5 rounded-xl w-full">
            <div className="text-lg lg:text-xl font-bold text-primary-01">
                جلسات
            </div>
            <div>
                <ul>
                    {Array(7).fill({}).map((item, index) => (
                        <li key={index}>
                            <Accordion title={`قسمت ${index + 1}`} selected={selectedCourse === index} setSelected={() => setSelectedCourse(selectedCourse === index ? -1 : index)}>
                                <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
                                    <img src="/images/AliArdam.jpg" alt="" className="w-full h-full object-cover object-center" />
                                </div>
                            </Accordion>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
