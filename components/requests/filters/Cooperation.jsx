import Select from "@/tools/Select";

const options = [
    { value: "", label: "نوع همکاری" },
    { value: "تمام وقت", label: "تمام وقت" },
    { value: "پاره وقت", label: "پاره وقت" },
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
