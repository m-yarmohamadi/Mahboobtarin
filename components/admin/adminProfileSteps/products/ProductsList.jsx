import ProductCard from "@/components/shop/ProductCard";
import { useDashboardProducts } from "@/hooks/useProducts";
import Link from "next/link";
import PaginationComponent from "@/tools/PaginationComponent";
import { useSearchParams } from "next/navigation";
import Loading from "@/tools/Loading";
import useProfile from "@/hooks/useProfile";

export default function ProductsList() {
    const searchParams = useSearchParams();
    const qs = searchParams.get('page') ? `page=${searchParams.get('page')}` : '';
    const { products, isLoading } = useDashboardProducts(qs);
    const { user, isLoading: isGetUser } = useProfile();

    if (isLoading || isGetUser) {
        return (
            <div className='w-full h-full flex items-center justify-center'>
                <Loading customeColor="#0693a4" />
            </div>
        )
    }

    return (
        <div>
            <div className="w-full flex items-center justify-between border-b border-b-slate-300 dark:border-b-slate-500 pb-4 mb-4">
                <h1 className="text-xl text-slate-800 font-semibold">
                    محصولات
                </h1>
                <Link href="products/create" className="btn btn--primary">
                    افزودن محصول جدید
                </Link>
            </div>

            <div className="w-full flex flex-col gap-10 items-center">
                {
                    products?.data && products?.data?.length ?
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {products?.data?.map((product) => (
                                <ProductCard key={product.id} product={product} user={user} />
                            ))}
                        </div>
                        :
                        <div className="flex justify-center py-8 w-full text-slate-500">
                            محصولی موجود نیست!
                        </div>
                }

                <PaginationComponent totalPages={products?.total} page={products?.current_page} />
            </div>
        </div>
    )
}
