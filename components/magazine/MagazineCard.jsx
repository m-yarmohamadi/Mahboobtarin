import Link from "next/link";

export default function MagazineCard({ post }) {
    return (
        <Link href={`/magazine/${post.slug}`} className="md:container lg:!px-0 grid sm:grid-cols-1 lg:grid-cols-2 md:gap-x-20 pt-4">
            <div className="flex-1 order-2 lg:order-1">
                <div className="text-textDefault font-bold md:text-2xl lg:py-6">
                    <h3 className="text-justify lg:border-r-8 border-primary-01 p-4">
                        {post.title}
                    </h3>
                </div>
                <div className="pb-8 hidden lg:block">
                    <div className=" text-justify text-sm md:text-base leading-7 md:leading-8">
                        <div
                            className="!min-w-none text-textDefault line-clamp-6"
                        >
                            {post.short_desc}
                        </div>
                    </div>
                </div>
            </div>
            <div className="order-1 lg:order-2">
                <img
                    className="w-full rounded-es-3xl lg:rounded-es-none rounded-se-3xl"
                    src={post.photo.path}
                    alt={post.title}
                />
            </div>
        </Link>
    )
}
