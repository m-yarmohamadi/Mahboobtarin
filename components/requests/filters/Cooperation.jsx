import Select from "@/tools/Select";

const options = [
    { value: "", label: "نوع همکاری" },
    { value: "تمام‌وقت", label: "تمام‌وقت" },
    { value: "پاره‌وقت", label: "پاره‌وقت" },
    { value: "پروژه‌ای", label: "پروژه‌ای" },
    { value: "کارآموزی", label: "کارآموزی" },
    { value: "دورکاری", label: "دورکاری" },
]

export default function Cooperation({ filter, setFilter }) {
    return (
        <Select
            options={options}
            value={filter}
            name="collaboration"
            onChange={(e) => setFilter(e.target.name, e.target.value)}
        />
    )
}
