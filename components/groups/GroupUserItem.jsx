import { useGetProvinces } from '@/hooks/useCity';
import { useGetServicesProfile } from '@/hooks/expertHooks/useServices';
import copyToClipboard from '@/utils/copyToClipboard';
import Link from 'next/link';
import { FaCalendar, FaRegBookmark, FaSave, FaShareAlt } from 'react-icons/fa';
import {
	FaAngleLeft,
	FaBattleNet,
	FaBookmark,
	FaLocationDot,
	FaPhoneFlip,
	FaRegHeart,
	FaStar,
	FaStethoscope,
} from 'react-icons/fa6';
import {
	MdCastForEducation,
	MdInsertInvitation,
	MdOutlineTextsms,
	MdWifiProtectedSetup,
} from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { toPersianDateLong } from '@/utils/toPersianDate';
import { useBookmark } from '@/hooks/expertHooks/useBookmark';
import { useFollow } from '@/hooks/expertHooks/useFollow';

export default function GroupUserItem({ user }) {
	const router = useRouter();
	const { provinces, isLoading } = useGetProvinces();
	const { followHandler } = useFollow();
	const { bookmarkHandler, isBookmarking } = useBookmark();
	const { isLoadingServices, servicesData } = useGetServicesProfile(user?.id);
	const getProvinceLabel =
		!isLoading && provinces.filter((p) => Number(p.id) === Number(user?.province_id))[0]?.name;

	const expertFollowHandler = () => {
		followHandler(user.id, `${user?.name} ${user?.lastname}`);
	};

	console.log(user);


	return (
		<div className="w-full flex flex-col p-4 rounded-lg border border-slate-300">
			<div className="w-full lg:grid grid-cols-12  gap-4">
				<div className="w-full col-span-6 lg:col-span-4 flex lg-flex-col flex-row items-start justify-between gap-2">
					<div
						onClick={() => router.push(`/${user.unique_url_id}`)}
						className="cursor-pointer flex lg:flex-col gap-2 pb-2"
					>
						<div className="w-20 h-20 relative">
							<img
								src={user.avatar.length ? user.avatar[0].path : '/images/user.png'}
								alt={`${user.name} ${user.lastname}`}
								className="w-full h-full object-cover object-center rounded-full"
							/>
							{user?.is_online === 1 && <div className="absolute w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-green-600 bottom-1.5 left-1.5 lg:bottom-1 lg:left-1"></div>}
						</div>
						<div className="flex flex-col gap-1">
							<h2 className="font-black text-textDefault text-sm">
								{user.name} {user.lastname}
							</h2>
							<span className="text-[10px] text-slate-700">
								{user.unique_url_id}@
							</span>
							<span className="text-[10px] text-slate-700">
								{user.expertises.length ? user.expertises[0].subject : null}
							</span>
						</div>
					</div>
					<button
						onClick={expertFollowHandler}
						className="flex w-fit items-start justify-between  py-2 px-4 rounded-lg bg-primary-01"
					>
						<span className="w-full text-xs text-slate-100 font-bold ">
							{user.is_follow ? "لغو دنبال کردن" : "دنبال کردن"}
						</span>
					</button>
				</div>
				<div className="w-full flex flex-col col-span-4 lg:col-span-8 justify-start items-start gap-2">
					<div className="w-full grid grid-cols-3 md:grid-cols-6  items-center gap-2">
						<div className="w-full truncate flex items-center justify-center gap-2 p-2 rounded-lg bg-primary-02">
							<FaCalendar className="w-4 h-4 text-slate-700" />
							<span className="text-xs text-slate-700">
								{toPersianDateLong(user.created_at)}
							</span>
						</div>
						<div className="w-full truncate flex items-center justify-center py-2 px-4 rounded-lg bg-primary-02">
							<span className="text-xs text-slate-700">
								{`${user.folloing_count} دنبال شده` || ''}
							</span>
						</div>
						<div className="w-full truncate flex items-center justify-center py-2 px-4 rounded-lg bg-primary-02">
							<span className="text-xs text-slate-700">
								{`${user.follower_count} دنبال کننده` || ''}
							</span>
						</div>
					</div>
					<div className="w-full grid grid-cols-3 md:grid-cols-6 items-center gap-2">
						<button
							onClick={() => bookmarkHandler(user.id)}
							className=" px-2 h-10  flex items-center justify-center gap-1 rounded-lg bg-slate-200"
						>
							{user.is_mark ? <FaBookmark className="w-5 h-5 text-slate-700" /> : <FaRegBookmark className="w-5 h-5 text-slate-700" />}
						</button>
						<button
							onClick={() =>
								copyToClipboard(
									`${window.location.origin}/${user?.unique_url_id}`,
									'لینک اشتراک گذاری کپی شد'
								)
							}
							className=" px-2 h-10  flex items-center justify-center gap-1 rounded-lg bg-slate-200"
						>
							<FaShareAlt className="w-5 h-5 text-slate-700" />
						</button>
						<button className="px-2 h-10 flex items-center justify-center gap-1 rounded-lg bg-slate-200">
							<FaLocationDot className="w-4 h-4 text-slate-700" />
							<span className="text-xs text-slate-700">{getProvinceLabel || ''}</span>
						</button>
						{
							user.service_count > 0 &&

							<div className="px-2 text-xs h-10 flex flex-col items-center justify-center gap-1 rounded-lg bg-slate-200">
								<div className="flex justify-center items-center gap-1 text-primary-01">
									<span className="flex justify-center items-center">
										{user.service_count}
									</span>
									<span className="flex justify-center items-center">
										<FaStethoscope />
									</span>
								</div>

								<span className="w-full flex justify-center items-center text-slate-700">
									خدمت موفق{' '}
								</span>
							</div>
						}
						<div className="px-2 text-xs h-10 flex flex-col items-center justify-center gap-1 rounded-lg bg-slate-200">
							<div className="flex justify-center items-center gap-1 text-primary-01">
								<span className="flex justify-center items-center">
									{user.stars}
								</span>
								<span className="flex justify-center items-center">
									<FaStar className="text-yellow-500" />
								</span>
							</div>

							<span className="w-full flex justify-center items-center text-slate-700">
								از {user.comments_count} نظر
							</span>
						</div>
						{user.amount_experience_year && (
							<div className="px-2 h-10 text-xs text-slate-700 flex items-center justify-center gap-1 rounded-lg bg-slate-200">
								{user.amount_experience_year} سال تجربه
							</div>
						)}
					</div>
				</div>
			</div>

			<div className="w-full flex flex-col lg:flex-row gap-4">
				<div className="w-full flex flex-wrap items-center gap-2 text-xs text-slate-700">
					{!isLoadingServices &&
						servicesData?.map((service) => (
							<div
								key={service.id}
								className="flex justify-center items-center gap-1 p-1 bg-slate-200 rounded-md "
							>
								<span>
									<FaPhoneFlip />
								</span>
								<span>{service.type}</span>
							</div>
						))}
				</div>

				<Link
					href={`/${user.unique_url_id}`}
					className=" flex justify-center items-center gap-1 text-primary-01 text-sm whitespace-nowrap"
				>
					<span>مشاهده پروفایل</span>
					<span>
						<FaAngleLeft />
					</span>
				</Link>
			</div>
		</div>
	);
}
