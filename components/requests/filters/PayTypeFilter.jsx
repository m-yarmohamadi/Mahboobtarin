import Select from "@/tools/Select";

export default function PayTypeFilter() {
    return (
        <Select
            options={[{ value: "", label: "نحوه پرداخت" }]}
        />
    )
}
