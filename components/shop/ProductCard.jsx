import numberWithCommas from "@/utils/numberWithCommas"
import Link from "next/link"
import { MdEdit } from "react-icons/md";

export default function ProductCard({ product, user, isEdit = false }) {
    const addDiscount = (item, discount) => {
        return item - ((item * discount) / 100)
    }

    const link = `/products/${product?.id}`;

    return (
        <div className='w-full relative h-full flex flex-col overflow-hidden bg-white rounded-xl duration-300 border border-slate-300 hover:shadow-md dark:shadow-darkMd'>
            {isEdit &&
                <div className="absolute top-5 left-5 z-10 space-y-2">
                    <Link href={`/admin/products/edit/${product.id}`} className='btn btn--danger !bg-secondary-01 !p-2'>
                        <MdEdit className='w-5 h-5' />
                    </Link>
                </div>
            }

            <Link href={link} className='block border-b border-slate-300 relative'>
                <div className='aspect-w-10 aspect-h-10'>
                    {product?.photos &&
                        <img
                            src={product?.photos[0]?.path}
                            alt={product?.title}
                            className='w-full h-full object-center object-cover'
                        />
                    }
                </div>
                {/* <div className="flex items-center absolute bottom-2 left-2 text-sm text-white bg-blue-500 p-2 rounded-lg">
                    خرید قسطی
                </div> */}

            </Link>
            <div className='p-4 flex-1 flex flex-col justify-between'>
                <Link href={link} className='block'>
                    <h3 className='text-slate-800 font-bold mb-2'>
                        {product?.title || "محصول"}
                    </h3>
                </Link>
                <div className='space-y-4'>
                    <div className={`w-full flex mt-4 gap-1 ${product?.discount_price ? "justify-between" : "justify-end"} items-center`}>
                        {product?.discount_price > 0 && <span className='text-sm font-bold text-secondary-03 border-2 border-secondary-03  p-2 rounded-md'>{product?.discount_price} %</span>}
                        <div className='flex flex-col justify-center items-center'>
                            {product?.discount_price > 0 && <p className='text-md line-through  text-slate-500'>{numberWithCommas(product?.price)} </p>}
                            <p className='text-lg font-bold text-slate-700 text-left'>{product?.price && numberWithCommas(product?.discount_price ? addDiscount(product?.price, product?.discount_price) : product?.price)} تومان</p>

                        </div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <span className='flex flex-col justify-center items-start text-xs text-textDefault'>
                            <span>عرضه کننده:</span>
                            <span>{user?.name} {user?.lastname}</span>
                        </span>
                        <div className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden">
                            <img
                                className={"object-cover w-full h-full"}
                                src={user?.avatar[0]?.path || "/images/user.png"}
                                alt=''
                            />
                        </div>
                    </div>
                    {/* {
                        isProductInCart(item.id) ?
                            <Link href="/cart" className='btn btn--secondary w-full'>
                                موجود در سبد خرید، مشاهده
                            </Link>
                            :
                            <button onClick={() => addNewToCart(item.id)} className='btn btn--primary w-full'>
                                افزودن به سبد خرید
                            </button>
                    } */}
                </div>
            </div>
        </div>
    )
}
