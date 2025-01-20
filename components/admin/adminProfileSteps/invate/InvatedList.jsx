import { useGetInvatedFriends } from "@/hooks/expertHooks/useInvates"
import { toPersianDateLong } from "@/utils/toPersianDate";

export default function InvatedList() {
    const { invateds, isLoading } = useGetInvatedFriends();

    if (isLoading) return null

    return (
        <div>
            <h2 className="text-textDefault font-medium pb-3">
                کاربران دعوت شده از طرف شما
            </h2>
            {
                invateds.length > 0 ?

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {invateds?.map((item, index) => (
                            <div key={index} className="w-full flex items-center gap-2 p-4 bg-slate-300 dark:bg-slate-400 rounded-lg">
                                <div className="text-slate-800">
                                    {item.name} {item.lastname}
                                </div>
                                <div className="text-slate-800">
                                    -
                                </div>
                                <div className="text-slate-700 text-sm">
                                    {toPersianDateLong(item.created_at)}
                                </div>
                            </div>
                        ))}
                    </div>
                    :
                    <div className="text-slate-700 font-medium text-sm text-center py-8">
                        کاربری دعوت نکرده اید!
                    </div>
            }
        </div>
    )
}
