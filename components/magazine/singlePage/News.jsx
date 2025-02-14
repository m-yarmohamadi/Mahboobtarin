import { toPersianDateLong } from '@/utils/toPersianDate'
import Link from 'next/link'
import moment from "moment";
import 'moment/locale/fa';

export default function News({ similar_post }) {
    return (
        <div className='w-full bg-slate-200 rounded-ee-2xl'>
            <div className="w-full bg-slate-700 text-slate-100 text-lg md:text-xl p-3 rounded-ee-2xl font-bold">
                اخبار ویژه
            </div>
            <div className='w-full p-4'>
                {similar_post?.map((news) => (
                    <NewsItem key={news.id} news={news} />
                ))}
            </div>
        </div>
    )
}

function NewsItem({ news }) {
    moment.locale("fa");

    return (
        <div className='w-full grid grid-cols-2 gap-4'>
            <div className='w-full flex flex-col gap-2 border-l border-dotted border-slate-400 pl-4  pb-8'>
                <div className='text-xs font-bold text-slate-800'>
                    {toPersianDateLong(news?.created_at)}
                </div>
                <Link href={`/magazine/${news?.slug}`} className='aspect-w-8 aspect-h-6'>
                    <img src={news?.photo?.path} alt={news?.photo?.title} className='w-full h-full object-cover object-center rounded-lg' />
                </Link>
            </div>
            <div className='flex flex-col items-start gap-3'>
                <div className='flex gap-3'>
                    <span className='-mr-[22px] block w-3 h-3 bg-primary-01 rounded-full'></span>
                    <div className='inline-block bg-slate-100 text-primary-01 rounded-full py-0.5 px-4 text-xs font-bold'>
                        {news?.post_category?.title}
                    </div>
                </div>
                <Link href={`/magazine/${news?.slug}`} className='text-sm font-bold text-slate-800 line-clamp-2'>
                    {news?.title}
                </Link>
                <div className='text-xs text-slate-500'>
                    {moment(news?.created_at).fromNow()}
                </div>
            </div>
        </div>
    )
}