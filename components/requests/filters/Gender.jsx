import Select from "@/tools/Select";

export default function Gender({ filter, setFilter }) {
    return (
        <Select
            options={[{ value: "", label: "جنسیت" }, { value: "مرد", label: "مرد" }, { value: "زن", label: "زن" }]}
            value={filter}
            name="gender"
            onChange={(e) => setFilter(e.target.name, e.target.value)}
        />
    )
}
