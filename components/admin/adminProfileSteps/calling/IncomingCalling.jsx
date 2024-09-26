import CallingItem from "./CallingItem";

export default function IncomingCalling() {
    return (
        <div className="w-full grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <CallingItem />
            <CallingItem />
            <CallingItem />
        </div>
    )
}
