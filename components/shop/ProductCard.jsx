import numberWithCommas from "@/utils/numberWithCommas"
import Link from "next/link"

export default function ProductCard() {
    const addDiscount = (item, discount) => {
        return item - ((item * discount) / 100)
    }

    return (
        <div className='w-full h-full flex flex-col overflow-hidden bg-white rounded-xl duration-300 border border-gray-300 hover:shadow-md'>
            <Link href={`#`} className='block border-b border-sky-300 relative'>
                <div className='aspect-w-10 aspect-h-10'>
                    <img
                        src={'/images/Book001.png'}
                        alt={''}
                        className='w-full h-full object-center object-cover'
                    />
                </div>
                <div className="flex items-center absolute bottom-2 left-2 text-sm text-white bg-blue-500 p-2 rounded-lg">
                    خرید قسطی
                </div>

            </Link>
            <div className='p-4 flex-1 flex flex-col justify-between'>
                <Link href={`#`} className='block'>
                    <h3 className='text-gray-800 font-bold mb-2'>
                        عنوان
                    </h3>
                </Link>
                <div className='space-y-4'>
                    <div className='w-full flex mt-4 gap-1 justify-between items-center'>
                        {1 !== 0 && <span className='text-sm text-white bg-error px-4 py-2 rounded-md'>{3} %</span>}
                        <div className='flex flex-col justify-center items-center'>
                            <p className='text-md line-through  text-gray-400'>{numberWithCommas(250000)} </p>
                            <p className='text-lg font-bold text-gray-700 text-left'>{numberWithCommas(addDiscount(250000, 3))} تومان</p>

                        </div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <span className='flex flex-col justify-center items-start text-xs'>
                            <span>عرضه کننده:</span>
                            <span>امیر عزیزی</span>
                        </span>
                        <span>
                            <img className='w-10 h-10 rounded-full' src='/images/KavehBehbahani.jpg' />
                        </span>
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
