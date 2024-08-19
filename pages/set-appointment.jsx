import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ExpertDetails from "@/components/Profile/setAppointment/ExpertDetails";
import Summary from "@/components/Profile/setAppointment/Summary";
import VisitDetails from "@/components/Profile/setAppointment/VisitDetails";

export default function setAppointment() {
    return (
        <div className="w-full">
            <Header />
            <div className="w-full grid grid-cols-1 gap-2 lg:gap-4 lg:grid-cols-5 p-6 lg:px-12 md:container md:mx-auto">
                <div className="flex flex-col gap-2 lg:col-span-3">
                    <div className>
                        <ExpertDetails />
                    </div>
                    <div>
                        <VisitDetails />
                    </div>
                </div>
                <div className="lg:col-span-2">
                    <Summary />
                </div>
            </div>
            <div className="hidden lg:block">
                <Footer />
            </div>
        </div>
    )
}
