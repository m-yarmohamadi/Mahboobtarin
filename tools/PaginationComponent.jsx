import { Pagination, PaginationItem } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export default function PaginationComponent({ totalPages, page, searchName }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createQueryString = useCallback((name, value) => {
        const params = new URLSearchParams(searchParams);
        params.set(name, value);
        return params.toString()
    },
        [searchParams]
    )

    const paginationHandler = (e, page) => {
        router.push(`${pathname}?${createQueryString(searchName || "page", page)}`, { scroll: false })
    }

    if (totalPages < 1) return null;

    return (
        <Pagination
            count={totalPages}
            page={page}
            onChange={paginationHandler}
            renderItem={(item) => (
                <PaginationItem
                    slots={{ previous: FaAngleRight, next: FaAngleLeft }}
                    {...item}
                />
            )}
        />
    )
}
