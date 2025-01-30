import { useGetProvinces } from "@/hooks/useCity";
import Select from "@/tools/Select";

export default function Address({ filter, setFilter }) {
    const { transformProvinces, isLoading } = useGetProvinces();

    return (
        <Select
            options={!isLoading ? [{ value: "", label: "محل" }, ...transformProvinces] : [{ value: "", label: "محل" }]}
            value={filter}
            name="location"
            onChange={(e) => setFilter(e.target.name, e.target.value)}
        />
    )
}
