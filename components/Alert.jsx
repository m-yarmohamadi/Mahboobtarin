export default function Alert({children}) {
    return (
        <div className="w-full p-5 bg-white shadow-md border-r-4 border-r-error rounded-xl">
            {children}
        </div>
    )
}
