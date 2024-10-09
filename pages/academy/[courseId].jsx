import CourseDetails from "@/components/academy/academyIdPage/CourseDetails";
import CourseTeacher from "@/components/academy/academyIdPage/CourseTeacher";
import CourseDescription from "@/components/academy/academyIdPage/CourseDescription";
import Header from "@/components/Header";
import CoursesList from "@/components/academy/academyIdPage/CoursesList";
import CourseComment from "@/components/academy/academyIdPage/CourseComment";
import Footer from "@/components/Footer";

export default function CoursePage() {
    return (
        <>
            <Header />
            <div className="w-full container my-10">
                <CourseDetails />
                <div className="pt-8 grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-4 lg:col-span-3 order-1 md:order-2">
                        <CourseTeacher />
                    </div>
                    <div className="md:col-span-8 lg:col-span-9 order-2 md:order-1 flex flex-col gap-8">
                        <CourseDescription />
                        <CoursesList />
                        <CourseComment />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
