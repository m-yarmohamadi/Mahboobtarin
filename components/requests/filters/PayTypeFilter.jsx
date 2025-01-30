import Select from "@/tools/Select";

const payTypeOptions = [
    { value: "", label: "نحوه پرداخت" },
    { value: "پروژه ای", label: "پروژه ای" },
    { value: "ماهانه", label: "ماهانه" },
    { value: "هفتگی", label: "هفتگی" },
    { value: "روزانه", label: "روزانه" },
]

export default function PayTypeFilter({ filter, setFilter }) {
    return (
        <Select
            options={payTypeOptions}
            value={filter}
            name="pyment_type"
            onChange={(e) => setFilter(e.target.name, e.target.value)}
        />
    )
}
