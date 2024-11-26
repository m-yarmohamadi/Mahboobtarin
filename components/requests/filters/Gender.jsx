import Select from "@/tools/Select";

export default function Gender() {
    return (
        <Select
            options={[{ value: "", label: "جنسیت" }, { value: "man", label: "مرد" }, { value: "woman", label: "زن" }]}
        />
    )
}
