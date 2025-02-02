import Accordion from "@/tools/Accordion"
import { useState } from "react"

export default function CoursesList({ courses }) {
    const [selectedCourse, setSelectedCourse] = useState("");

    return (
        <div className="bg-white px-3 py-6 lg:p-5 rounded-xl w-full shadow-2xl">
            <div className="text-lg lg:text-xl font-bold text-primary-01 pb-4">
                جلسات
            </div>
            <div>
                <ul>
                    {courses.map((item, index) => (
                        <li key={index}>
                            <Accordion title={item.title} selected={selectedCourse === index} setSelected={() => setSelectedCourse(selectedCourse === index ? -1 : index)}>
                                <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
                                    {/* <img src="/images/AliArdam.jpg" alt="" className="w-full h-full object-cover object-center" /> */}
                                    <video
                                        controls
                                        className='w-full h-full object-cover object-center'>
                                        <source
                                            src={item?.path}
                                            type='video/mp4'
                                        />
                                    </video>
                                </div>
                            </Accordion>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
