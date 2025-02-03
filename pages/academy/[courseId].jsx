import CourseDetails from "@/components/academy/academyIdPage/CourseDetails";
import CourseTeacher from "@/components/academy/academyIdPage/CourseTeacher";
import CourseDescription from "@/components/academy/academyIdPage/CourseDescription";
import Header from "@/components/Header";
import CoursesList from "@/components/academy/academyIdPage/CoursesList";
import CourseComment from "@/components/academy/academyIdPage/CourseComment";
import Footer from "@/components/Footer";
import http from "@/services/httpService";
import { useState } from "react";

export default function CoursePage({ course }) {
    const [selected, setSelected] = useState(course?.videos[0]);

    return (
        <>
            <Header />
            <div className="w-full container my-10">
                <div className="pt-8 grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-6 lg:col-span-7 flex flex-col gap-6">
                        <CourseDetails course={course} selected={selected}>
                            <div className="lg:hidden">
                                <CoursesList courses={course?.videos} selected={selected} setSelected={setSelected} />
                            </div>
                        </CourseDetails>

                        {/* <CourseDescription /> */}
                        {/* <CourseComment /> */}
                    </div>
                    <div className="md:col-span-6 lg:col-span-5 flex flex-col gap-6">
                        <CourseTeacher teacher={course?.user} />
                        <div className="hidden lg:block">
                            <CoursesList courses={course?.videos} selected={selected} setSelected={setSelected} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}


export async function getServerSideProps(ctx) {
    const { query, req } = ctx;

    try {
        const { data } = await http.get(`/api/v1/page/academy/${query.courseId}`);

        if (!data) {
            return {
                notFound: true,
            };
        }
        console.log(data);

        return {
            props: {
                course: data?.academy,
            },
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
}
