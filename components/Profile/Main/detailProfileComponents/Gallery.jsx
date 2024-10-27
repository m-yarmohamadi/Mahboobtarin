import { useState } from "react";
import TitleItems from "../TitleItems";
import TabGroup from "@/tools/TabGroup";

export default function Gallery({ gallery }) {
    const [showMore, setShowMore] = useState(false);

    const pictures = gallery && gallery.filter((g) => g.type === "gallery-image");
    const video = gallery && gallery.filter((g) => g.type === "gallery-video");
    const voice = gallery && gallery.filter((g) => g.type === "gallery-audio");

    if (gallery && gallery.length) {
        return (
            <div id="gallery" className="pt-16">
                <TitleItems title={"گالری"} />
                <TabGroup tabs={[{ label: "عکس" }, { label: "فیلم" }, { label: "صوت" }]}>
                    <TabGroup.Item>
                        <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4 ">
                            {/* <div className="aspect-w-16 aspect-h-10">
                                <img
                                    src="/images/Galery.jpg"
                                    className=" object-cover w-full h-full rounded-md"
                                    alt=""
                                />
                            </div> */}
                            {pictures.map((item) => {
                                return (
                                    <div className="relative">
                                        <div className="aspect-w-16 aspect-h-10">
                                            <img
                                                src={item.path}
                                                className=" hover:grayscale hover:cursor-pointer object-cover w-full h-full object-center rounded-md"
                                                alt=""
                                            />
                                        </div>
                                        <span className="flex justify-center items-center absolute bottom-0 right-0 w-full text-xs font-semibold p-1 bg-slate-800 text-white bg-opacity-80 rounded-b-md">
                                            {item.title}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </TabGroup.Item>
                    <TabGroup.Item>
                        <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4 ">
                            {video.map((item) => {
                                return (
                                    <div className="relative">
                                        <div className="aspect-w-16 aspect-h-10">
                                            <video
                                                controls
                                                className="hover:grayscale hover:cursor-pointer object-cover w-full h-full object-center rounded-md"
                                            >
                                                <source src={item.path} type="video/mp4" />
                                            </video>
                                        </div>
                                        <span className="flex justify-center items-center absolute bottom-0 right-0 w-full text-xs font-semibold p-1 bg-slate-800 text-white bg-opacity-80 rounded-b-md">
                                            {item.title}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </TabGroup.Item>
                    <TabGroup.Item>
                        <div className="grid grid-cols-1 w-full gap-4 ">
                            {voice.map((item) => {
                                return (
                                    <div className="relative">
                                        <span className="flex w-full text-xs font-semibold p-1 bg-slate-800 text-white bg-opacity-80 rounded-b-md">
                                            {item.title}
                                        </span>
                                        <div className="w-full">
                                            <audio controls className="w-full">
                                                <source src={item.path} type="audio/mpeg" />
                                                مرورگر شما پخش صوت را پشتیبانی نمی‌کند.
                                            </audio>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </TabGroup.Item>
                </TabGroup>

                {gallery.length > 10 ? <ViewMore complete={showMore} onClick={() => setShowMore(!showMore)} /> : null}
            </div>
        )
    }
}
