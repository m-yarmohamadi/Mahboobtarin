import GroupUserItem from "./GroupUserItem";

export default function GroupsList({ users }) {
    return (
        <div className="w-full flex flex-col gap-4 pt-6">
            {
                users && users.length ?
                    users.map((user, index) => (
                        <GroupUserItem key={index} user={user} />
                    ))
                    :
                    <div className="w-full py-28 flex flex-col gap-4 items-center justify-center">
                        <img src="/images/emptyList.png" alt="" />
                        <div className="text-slate-800 font-medium">
                            متخصصی یافت نشد!
                        </div>
                    </div>
            }
        </div>
    )
}

