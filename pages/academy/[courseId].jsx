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
                <div className="pt-8 grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-6 flex flex-col gap-6">
                        <CourseDetails />
                        <CourseTeacher />
                        {/* <CourseDescription /> */}
                        <CourseComment />
                    </div>
                    <div className="md:col-span-6">
                        <CoursesList />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
