import Categories from "@/components/academy/Categories";
import Newest from "@/components/academy/Newest";
import Populars from "@/components/academy/Populars";
import Suggestion from "@/components/academy/Suggestion";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function academy() {
    return (
        <div>
            <Header />
            <div className="w-full h-[250px]">
                <img src="/images/Baner002.png" alt="" className="w-full h-full object-cover object-center" />
            </div>
            <Populars />

            <div className="md:h-[350px] p-4 lg:p-0 md:mx-auto md:container grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-6">
                <div className="w-full rounded-lg overflow-hidden md:col-span-4">
                    <img src="/images/img002.jpg" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="w-full rounded-lg overflow-hidden md:row-span-2 md:col-span-8">
                    <img src="/images/img003.jpg" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="w-full rounded-lg overflow-hidden md:col-span-4">
                    <img src="/images/Baner002.png" alt="" className="w-full h-full object-cover" />
                </div>
            </div>

            <Newest />
            <Categories />
            <Suggestion />

            <div className="w-full p-6">
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="w-full rounded-lg overflow-hidden">
                        <img src="/images/omicron.png" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-full rounded-lg overflow-hidden">
                        <img src="/images/liraglotide.webp" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-full rounded-lg overflow-hidden">
                        <img src="/images/omicron.png" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-full rounded-lg overflow-hidden">
                        <img src="/images/liraglotide.webp" alt="" className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="w-full h-[250px] rounded-lg overflow-hidden mt-6">
                    <img src="/images/Baner004.png" alt="" className="w-full h-full object-cover object-center" />
                </div>
            </div>

            <Footer />
        </div>
    )
}
