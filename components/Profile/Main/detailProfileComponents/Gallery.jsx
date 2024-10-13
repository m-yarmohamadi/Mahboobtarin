import { useState } from "react";
import TitleItems from "../TitleItems";

export default function Gallery({ gallery }) {
    const [showMore, setShowMore] = useState(false);

    if (gallery && gallery.length) {
        return (
            <div id="gallery" className="pt-16">
                <TitleItems title={"گالری"} />
                <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4 ">
                    <div className="aspect-w-16 aspect-h-10">
                        <img
                            src="/images/Galery.jpg"
                            className=" object-cover w-full h-full rounded-md"
                            alt=""
                        />
                    </div>
                    {gallery.slice(0, showMore ? gallery.length : 10).map((item) => {
                        return (
                            <div className="relative">
                                <div className="aspect-w-16 aspect-h-10">
                                    {item.type === "gallery-image" ? (
                                        <img
                                            src={item.path}
                                            className=" hover:grayscale hover:cursor-pointer object-cover w-full h-full object-center rounded-md"
                                            alt=""
                                        />
                                    ) : (
                                        <video
                                            controls
                                            className="hover:grayscale hover:cursor-pointer object-cover w-full h-full object-center rounded-md"
                                        >
                                            <source src={item.path} type="video/mp4" />
                                        </video>
                                    )}
                                </div>
                                <span className="flex justify-center items-center absolute bottom-0 right-0 w-full text-xs font-semibold p-1 bg-gray-800 text-white bg-opacity-80 rounded-b-md">
                                    {item.title}
                                </span>
                            </div>
                        );
                    })}
                </div>
                {gallery.length > 10 ? <ViewMore complete={showMore} onClick={() => setShowMore(!showMore)} /> : null}
            </div>
        )
    }
}
