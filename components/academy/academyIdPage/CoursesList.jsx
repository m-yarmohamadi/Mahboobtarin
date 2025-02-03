import Accordion from "@/tools/Accordion"
import { useState } from "react"
import { FaRegCirclePause, FaRegCirclePlay } from "react-icons/fa6";

export default function CoursesList({ courses, selected, setSelected }) {
    const [selectedCourse, setSelectedCourse] = useState("");

    return (
        <div className="bg-white px-3 py-6 lg:p-5 rounded-xl w-full lg:shadow-2xl">
            <div className="text-lg font-bold text-primary-01 pb-4">
                جلسات
            </div>
            <div>
                <ul className="space-y-3">
                    {courses.map((item, index) => (
                        <li key={index} className={`${selected.id === item.id ? "border-primary-01" : "border-slate-400"} border-2 bg-slate-300 p-3 rounded-lg flex items-center justify-between`}>
                            <div className="text-sm font-medium text-slate-800">
                                {item.title}
                            </div>
                            {
                                selected.id === item.id ?
                                    <FaRegCirclePause className="w-4 h-4 text-primary-01" />
                                    :
                                    <button onClick={() => setSelected(item)} className="text-xs text-slate-700 flex items-center gap-1">
                                        پخش
                                        <FaRegCirclePlay className="w-4 h-4 text-primary-01" />
                                    </button>
                            }

                            {/* <Accordion title={item.title} selected={selectedCourse === index} setSelected={() => setSelectedCourse(selectedCourse === index ? -1 : index)}>
                                <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
                                    <video
                                        controls
                                        className='w-full h-full object-cover object-center'>
                                        <source
                                            src={item?.path}
                                            type='video/mp4'
                                        />
                                    </video>
                                </div>
                            </Accordion> */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
