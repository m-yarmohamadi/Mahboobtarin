import Link from "next/link";

export default function OthersPosts({ posts }) {
    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-6">
            {posts.map((post) => (
                <Link key={post.id} href={`/magazine/${post.slug}`} className="w-full xs:min-w-full group">
                    <div className="aspect-w-16 aspect-h-10">
                        <img
                            className="w-full h-full object-cover object-center group-odd:rounded-ss-3xl group-even:rounded-se-3xl"
                            src={post.photo.path}
                            alt={post.title}
                        />
                    </div>
                    <div className="gap-1 flex flex-col justify-center items-start pt-4">
                        <span className="text-sm font-bold text-textDefault p-2 border-r-8 border-secondary-01 line-clamp-2">
                            {post.title}
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    )
}
