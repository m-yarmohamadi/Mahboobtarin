import React from "react";
import PN from "persian-number";
import { FaChevronLeft } from "react-icons/fa";
import useMainPage from "@/hooks/useMainPage";

const data = [
  {
    id: 1,
    iconUrl: "/images/Adolescence.png",
    title: "نوجوانی و بلوغ",
    subtitle: "استقلال، مسئولیت پذیری، اعتماد به نفس",
    picUrl: [
      {
        id: 1,
        url: "/images/FaribaEghdami.webp",
      },
      {
        id: 2,
        url: "/images/FaribaEghdami.webp",
      },
      {
        id: 3,
        url: "/images/FaribaEghdami.webp",
      },
      {
        id: 4,
        url: "/images/FaribaEghdami.webp",
      },
    ],
    number: 315,
  },
  {
    id: 2,
    iconUrl: "/images/addiction.png",
    title: "ترک اعتیاد",
    subtitle: "سیگار، ماریجوانا، متادون، همسر معتاد",
    picUrl: [
      {
        id: 1,
        url: "/images/FaribaEghdami.webp",
      },
      {
        id: 2,
        url: "/images/FaribaEghdami.webp",
      },
      {
        id: 3,
        url: "/images/FaribaEghdami.webp",
      },
      {
        id: 4,
        url: "/images/FaribaEghdami.webp",
      },
    ],
    number: 143,
  },
  {
    id: 3,
    iconUrl: "/images/Marriage.png",
    title: "ازدواج موفق و رابطه زناشویی پایدار",
    subtitle: "انتخاب همسر، شکست عاطفی، خیانت",
    picUrl: [
      {
        id: 1,
        url: "/images/FaribaEghdami.webp",
      },
      {
        id: 2,
        url: "/images/FaribaEghdami.webp",
      },
      {
        id: 3,
        url: "/images/FaribaEghdami.webp",
      },
      {
        id: 4,
        url: "/images/FaribaEghdami.webp",
      },
    ],
    number: 26,
  },
  {
    id: 4,
    iconUrl: "/images/SexCounseling.png",
    title: "مشاوره جنسی",
    subtitle: "اختلالات، ناتوانی، اعتماد به نفس، تمایلات",
    picUrl: [
      {
        id: 1,
        url: "/images/FaribaEghdami.webp",
      },
      {
        id: 2,
        url: "/images/FaribaEghdami.webp",
      },
      {
        id: 3,
        url: "/images/FaribaEghdami.webp",
      },
      {
        id: 4,
        url: "/images/FaribaEghdami.webp",
      },
    ],
    number: 72,
  },
  {
    id: 5,
    iconUrl: "/images/jobPosition.png",
    title: "موفقیت شغلی و تحصیلی",
    subtitle: "استعدادیابی، روابط مؤثر، خلاقیت",
    picUrl: [
      {
        id: 1,
        url: "/images/FaribaEghdami.webp",
      },
      {
        id: 2,
        url: "/images/FaribaEghdami.webp",
      },
      {
        id: 3,
        url: "/images/FaribaEghdami.webp",
      },
      {
        id: 4,
        url: "/images/FaribaEghdami.webp",
      },
    ],
    number: 85,
  },
  {
    id: 6,
    iconUrl: "/images/Anxiety.png",
    title: "اضطراب، افسردگی و مسائل فردی",
    subtitle: "وسواس، کنترل خشم و هیجان، ترس، تنهایی",
    picUrl: [
      {
        id: 1,
        url: "/images/FaribaEghdami.webp",
      },
      {
        id: 2,
        url: "/images/FaribaEghdami.webp",
      },
      {
        id: 3,
        url: "/images/FaribaEghdami.webp",
      },
      {
        id: 4,
        url: "/images/FaribaEghdami.webp",
      },
    ],
    number: 315,
  },
];
const data2 = [
  {
    id: 1,
    picUrl: [
      {
        id: 1,
        url: "/images/Mansoor.zabetian.jpg",
      },
      {
        id: 2,
        url: "/images/Mansoor.zabetian.jpg",
      },
      {
        id: 3,
        url: "/images/Mansoor.zabetian.jpg",
      },
    ],
    title: "مشاهده دیگر هنرمندان",
  },
  {
    id: 2,
    picUrl: [
      {
        id: 1,
        url: "/images/Mansoor.zabetian.jpg",
      },
      {
        id: 2,
        url: "/images/Mansoor.zabetian.jpg",
      },
      {
        id: 3,
        url: "/images/Mansoor.zabetian.jpg",
      },
    ],
    title: "مشاهده دیگر ورزشکاران",
  },
  {
    id: 3,
    picUrl: [
      {
        id: 1,
        url: "/images/Mansoor.zabetian.jpg",
      },
      {
        id: 2,
        url: "/images/Mansoor.zabetian.jpg",
      },
      {
        id: 3,
        url: "/images/Mansoor.zabetian.jpg",
      },
    ],
    title: "مشاهده دیگر پزشکان",
  },
  {
    id: 4,
    picUrl: [
      {
        id: 1,
        url: "/images/Mansoor.zabetian.jpg",
      },
      {
        id: 2,
        url: "/images/Mansoor.zabetian.jpg",
      },
      {
        id: 3,
        url: "/images/Mansoor.zabetian.jpg",
      },
    ],
    title: "مشاهده دیگر شاعران",
  },
  {
    id: 5,
    picUrl: [
      {
        id: 1,
        url: "/images/Mansoor.zabetian.jpg",
      },
      {
        id: 2,
        url: "/images/Mansoor.zabetian.jpg",
      },
      {
        id: 3,
        url: "/images/Mansoor.zabetian.jpg",
      },
    ],
    title: "مشاهده دیگر شاعران",
  },
  {
    id: 6,
    picUrl: [
      {
        id: 1,
        url: "/images/Mansoor.zabetian.jpg",
      },
      {
        id: 2,
        url: "/images/Mansoor.zabetian.jpg",
      },
      {
        id: 3,
        url: "/images/Mansoor.zabetian.jpg",
      },
    ],
    title: "مشاهده دیگر شاعران",
  },
  {
    id: 7,
    picUrl: [
      {
        id: 1,
        url: "/images/Mansoor.zabetian.jpg",
      },
      {
        id: 2,
        url: "/images/Mansoor.zabetian.jpg",
      },
      {
        id: 3,
        url: "/images/Mansoor.zabetian.jpg",
      },
    ],
    title: "مشاهده دیگر شاعران",
  },
];
const FrequentSearches = () => {
  const { top_search, popular_week, isLoading } = useMainPage();

  if (isLoading) return null;

  return (
    <div className=" md:container px-0 pb-16">
      <div className="w-full lg:h-[45rem] flex flex-col lg:flex-row gap-8 lg:gap-5">
        <div className="lg:w-[65%] flex flex-col overflow-auto">
          <h4 className="text-slate-800 font-bold text-lg md:text-xl lg:text-2xl text-center mb-3">
            جستجو های پر تکرار
          </h4>
          <div className="w-full bg-white md:rounded-lg overflow-auto scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thin flex-1">
            <div className="w-full flex items-center gap-20 md:grid lg:grid-cols-1 xl:grid-cols-2 xl:gap-x-5 overflow-x-auto lg:overflow-hidden scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thin p-8">
              {top_search.map((item) => (
                <div
                  key={item.id}
                  className="flex-1 flex gap-4 md:border-b border-b-primary-02 md:pb-5"
                >
                  <div>
                    <div className="w-28 h-32 xl:w-24 xl:h-28 flex items-center justify-center border border-primary-02 rounded-lg">
                      <img
                        src={item.picture}
                        alt=""
                        className="w-[70%] object-cover object-center"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-lg text-slate-800 font-bold mb-2 whitespace-nowrap">
                      {item.title}
                    </p>
                    <span
                      className="text-sm text-slate-700 whitespace-nowrap"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    ></span>

                    <div className="flex items-center mt-6">
                      {item.metekhases.slice(0,3).map((pic) => (
                        <div key={pic.id} className="w-10 h-10 -ms-2">
                          <img
                            src={pic.avatar || "/images/user.png"}
                            alt=""
                            className="w-full h-full object-cover object-center rounded-full border border-white"
                          />
                        </div>
                      ))}
                      <div className="w-10 h-10 -ms-2 bg-white shadow-lg dark:shadow-darkLg text-slate-800 text-sm font-semibold rounded-full flex items-center justify-center">
                        {item.metekhases.length - 3 || 0} +
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full bg-slate-200 p-1 flex justify-end">
              <button className="btn gap-2 text-sm text-slate-800 font-bold">
                همه تخصص ها
                <FaChevronLeft />
              </button>
            </div>
          </div>
        </div>

        <div className="lg:w-[35%] flex flex-col overflow-auto">
          <h4 className="text-slate-800 font-bold text-lg md:text-xl lg:text-2xl text-center mb-3">
          محبوب‌ترین‌های هفته
          </h4>
          <div className="bg-white shadow-lg dark:shadow-darkLg md:rounded-lg overflow-auto flex-1">
            <div className="lg:max-h-full flex md:grid grid-cols-2 lg:grid-cols-1 overflow-x-auto lg:overflow-y-auto scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thin gap-12 p-8">
              {popular_week.map((item) => (
                <div
                  key={item.id}
                  className="flex-1 md:flex flex-col justify-center"
                >
                  <div className="flex items-center md:justify-center">
                    {item.metekhases.map((pic) => (
                      <div
                        key={pic.id}
                        className="w-12 h-12 md:w-20 md:h-20 -ms-2"
                      >
                        <img
                          src={pic.avatar || "/images/user.png"}
                          alt=""
                          className="w-full h-full border border-white object-cover object-center rounded-full"
                        />
                      </div>
                    ))}
                  </div>
                  <button className="text-sm font-bold text-primary-01 btn !px-0 gap-2 whitespace-nowrap">
                    {item.name}
                    <FaChevronLeft />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* <div className='md:grid grid-cols-3 gap-8 md:h-[45rem] md:max-h-[45rem] '>
				<div className=' col-span-2 '>
					<div className='flex justify-center items-center w-full text-2xl font-bold text-slate-800 p-2 pt-6 md:pt-2'>جستجوهای پرتکرار</div>
					<div className='xs:h-fit xs:w-full md:h-[43rem] md:max-h-[43rem] flex flex-col justify-between items-center bg-white  md:rounded-xl shadow-lg dark:shadow-darkLg'>
						<div className='xs:flex scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thin xs:overflow-x-scroll md:overflow-hidden md:grid md:grid-cols-2 gap-8 h-fit max-h-fit'>
							{data.map((item) => {
								return (
									<div
										key={item.id}
										className=' border-b border-slate-200 py-2 w-full min-w-full flex flex-col justify-center items-center'>
										<div className='w-full grid grid-cols-12'>
											<div className='p-3 w-full col-span-3  flex justify-center items-center'>
												<div className='p-3 border border-primary-02 rounded-xl'>
													<img
														src={item.iconUrl}
														alt=''
													/>
												</div>
											</div>
											<div className='w-full col-span-9 flex flex-col justify-center items-center gap-2'>
												<div className='w-full flex justify-start items-start px-4'>
													<span className='font-bold text-xl '>{item.title}</span>
												</div>
												<span>{item.subtitle}</span>
											</div>
										</div>
										<div className='w-full  flex justify-center items-center'>
											<div className='flex justify-center items-center'>
												{item.picUrl.map((pic) => {
													return (
														<div
															key={pic.id}
															className='-ms-2'>
															<img
																className='w-10 h-10 rounded-full border border-white'
																src={pic.url}
																alt=''
															/>
														</div>
													);
												})}

												<div className='-ms-2'>
													<div className=' flex justify-center items-center w-10 h-10 rounded-full border border-white bg-white shadow-md dark:shadow-darkMd text-sm font-bold hover:cursor-pointer hover:bg-primary-02'>{PN.convertEnToPe(`${item.number}`)}+</div>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
						<div className='w-full p-2 flex justify-end items-center gap-2 bg-primary-02 rounded-b-xl font-bold text-sm hover:cursor-pointer'>
							<span>همه تخصص ها</span>
							<span>
								<FaChevronLeft />
							</span>
						</div>
					</div>
				</div>
				<div className=''>
					<div className='flex justify-center items-center w-full text-2xl font-bold text-slate-800 p-2 pt-6 md:pt-2'>محبوب‌ترین‌های هفته</div>
					<div className='md:h-[43rem] max-h-[43rem] scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thin xs:overflow-x-scroll  md:overflow-y-scroll flex md:flex-col justify-between items-center bg-white  rounded-xl shadow-lg dark:shadow-darkLg min-w-full '>
						{data2.map((item) => {
							return (
								<div key={item.id} className='min-w-full  '>
									<div className='flex justify-center items-center pt-10 pb-3 w-full min-w-full'>
										{item.picUrl.map((pic) => {
											return (
												<div
													key={pic.id}
													className='-ms-2 '>
													<img
														className='w-20 h-20 rounded-full border-2 border-white'
														src={pic.url}
														alt=''
													/>
												</div>
											);
										})}
									</div>
									<div className='w-full    font-bold text-md flex xs:justify-center md:justify-end  xs:items-center gap-2'>
										<span className='w-fit text-primary-01 '>{item.title}</span>
										<span>
											<FaChevronLeft />
										</span>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div> */}
    </div>
  );
};

export default FrequentSearches;
