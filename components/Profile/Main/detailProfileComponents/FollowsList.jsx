import { useFollow, useGetFollowers, useGetFollowings } from "@/hooks/expertHooks/useFollow";
import { usePathname, useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa6";

export default function FollowsList({ children, stepFollow, onChangeStep, userData }) {
    const { followers, isGetFollowers } = useGetFollowers(userData.id);
    const { followings, isGetFollowings } = useGetFollowings(userData.id);

    if (isGetFollowers || isGetFollowings) return null

    return (
        <div className="w-full">
            <div className="flex items-center gap-6">
                <button onClick={() => onChangeStep(0)}>
                    <FaArrowRight className="w-6 h-6 text-slate-900" />
                </button>
                {children}
            </div>

            <div className="w-full flex flex-col gap-6 mt-7">
                <div className="w-full flex items-center gap-6 pb-2 overflow-x-auto no-scrollbar border-b border-slate-300 dark:border-slate-400">
                    {[{ label: "دنبال کنندگان", step: 1 }, { label: "دنبال شدگان", step: 2 }].map((tab, index) => (
                        <div key={index} className="w-full flex justify-center">
                            <button
                                type="button"
                                onClick={() => onChangeStep(tab.step)}
                                className={`${tab.step === stepFollow ? " before:h-1 text-primary-01" : " before:h-0 text-slate-900"} whitespace-nowrap px-1 relative before:w-full before:absolute before:-bottom-2 before:right-0 before:rounded-t-full before:duration-100 before:bg-primary-01`}
                            >
                                {tab.label}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="w-full flex flex-col gap-4">
                    {
                        stepFollow === 1 ?
                            followers?.map((user) => (
                                user.user &&
                                <UserItem
                                    key={user.id}
                                    userId={user.user.id}
                                    userName={`${user.user.name} ${user.user.lastname}`}
                                    userUrl={user.user.unique_url_id}
                                    userAvatar={user.user.avatar}
                                    userExpert={user.user.expertises}
                                    onChangeStep={onChangeStep}
                                />
                            ))
                            :
                            followings?.map((user) => (
                                user.follower &&
                                <UserItem
                                    key={user.id}
                                    userId={user.id}
                                    userName={`${user.follower?.name} ${user.follower?.lastname}`}
                                    userUrl={user.follower.unique_url_id}
                                    userAvatar={user.follower.avatar}
                                    userExpert={user.follower.expertises || []}
                                    onChangeStep={onChangeStep}
                                />
                            ))
                    }
                </div>
            </div>
        </div>
    )
}

function UserItem({ userName, userUrl, userExpert, userAvatar, userId, onChangeStep }) {
    const router = useRouter();
    const pathname = usePathname();
    const { followHandler } = useFollow();

    const expertFollowHandler = () => {
        followHandler(userId, userName);
        router.replace(pathname, { scroll: false });
    };

    const handleLinks = (link) => {
        // router.push(`/${link}`);
        // onChangeStep(0);
    };

    return (
        <div className="w-full flex items-center justify-between">
            <div onClick={() => handleLinks(userUrl)} className="flex items-center gap-2 cursor-pointer">
                <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center border border-slate-400">
                    <img
                        className={"object-cover w-full h-full object-center"}
                        src={userAvatar.length > 0 ? userAvatar[0].path : "/images/user.png"}
                        alt={userName}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-slate-900">
                        {userName}
                    </span>
                    <span className="text-sm text-slate-800">
                        @{userUrl}
                    </span>
                    <span className="text-xs text-slate-800">
                        {userExpert.length > 0 ? userExpert[0].subject : ""}
                    </span>
                </div>
            </div>
            <div>
                <button onClick={expertFollowHandler} className={`btn whitespace-nowrap !py-1.5 !px-4 !rounded-full !text-xs sm:!text-sm bg-slate-900 !text-slate-100`}>
                    دنبال کردن
                </button>
            </div>
        </div>
    )
}