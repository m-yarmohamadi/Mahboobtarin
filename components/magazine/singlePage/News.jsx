import React from 'react'

export default function News() {
    return (
        <div className='w-full bg-slate-200 rounded-ee-2xl'>
            <div className="w-full bg-slate-700 text-slate-100 text-lg md:text-xl p-3 rounded-ee-2xl font-bold">
                اخبار ویژه
            </div>
            <div className='w-full p-4'>
                <NewsItem />
                <NewsItem />
                <NewsItem />
            </div>
        </div>
    )
}

function NewsItem() {
    return (
        <div className='w-full grid grid-cols-2 gap-4'>
            <div className='w-full flex flex-col gap-2 border-l border-dotted border-slate-400 pl-4  pb-8'>
                <div className='text-xs font-bold text-slate-800'>
                    30 ابان 1400
                </div>
                <div className='aspect-w-8 aspect-h-6'>
                    <img src="/images/gardasil.jpg" alt="" className='w-full h-full object-cover object-center rounded-lg' />
                </div>
            </div>
            <div className='flex flex-col items-start gap-3'>
                <div className='flex gap-3'>
                    <span className='-mr-[22px] block w-3 h-3 bg-primary-01 rounded-full'></span>
                    <div className='inline-block bg-slate-100 text-primary-01 rounded-full py-0.5 px-4 text-xs font-bold'>
                        سیاسی
                    </div>
                </div>
                <div className='text-sm font-bold text-slate-800 line-clamp-2'>
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                </div>
                <div className='text-xs text-slate-500'>
                    10 دقیقه پیش
                </div>
            </div>
        </div>
    )
}