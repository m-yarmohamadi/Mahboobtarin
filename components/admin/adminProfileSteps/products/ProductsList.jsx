import ProductCard from "@/components/shop/ProductCard";
import Link from "next/link";

export default function ProductsList() {
    return (
        <div>
            <div className="w-full flex items-center justify-between border-b border-b-gray-300 pb-4 mb-4">
                <h1 className="text-xl text-gray-800 font-semibold">
                    محصولات
                </h1>
                <Link href="products/create" className="btn btn--primary">
                    افزودن محصول جدید
                </Link>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </div>
    )
}
