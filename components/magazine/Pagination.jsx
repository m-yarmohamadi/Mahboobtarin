import { generatePagination } from "@/utils/generatePagination";
import classNames from "classnames";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export default function Pagination({ totalPages }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const itemsPerPage = Number(searchParams.get("limit")) || 6;

    const createPageURL = (pageNumber) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        params.set("limit", itemsPerPage.toString());
        return `${pathname}?${params.toString()}`;
    };

    const allPages = generatePagination(currentPage, totalPages);

    return (
        <div className="inline-flex">
            <PaginationArrow
                direction="right"
                href={createPageURL(currentPage - 1)}
                isDisabled={currentPage <= 1}
            />

            <div className="flex -space-x-px flex-row-reverse">
                {allPages.map((page, index) => {
                    let position;
                    if (index === 0) position = "first";
                    if (index === allPages.length - 1) position = "last";
                    if (allPages.length === 1) position = "single";
                    if (page === "...") position = "middle";

                    return (
                        <PaginationNumber
                            key={`${page}-${index}`}
                            href={createPageURL(page)}
                            page={page}
                            position={position}
                            isActive={currentPage === page}
                        />
                    );
                })}
            </div>

            <PaginationArrow
                direction="left"
                href={createPageURL(currentPage + 1)}
                isDisabled={currentPage >= totalPages}
            />
        </div>
    );
}

function PaginationNumber({ page, href, isActive, position }) {
    const className = classNames(
        "flex h-8 w-8 items-center justify-center text-slate-100",
        {
            "z-10 bg-indigo-200/60 text-white": isActive,
            "hover:bg-secondary-900/10": !isActive && position !== "middle",
            "text-secondary-900": position === "middle",
        }
    );

    return isActive || position === "middle" ? (
        <div className={className}>{page}</div>
    ) : (
        <Link href={href} className={className}>
            {page}
        </Link>
    );
}

function PaginationArrow({ href, direction, isDisabled }) {
    const className = classNames(
        "flex items-center justify-center text-slate-100",
        {
            "pointer-events-none hidden": isDisabled,
            "mr-2 md:mr-4": direction === "left",
            "ml-2 md:ml-4": direction === "right",
        }
    );

    const icon =
        direction === "left" ? (
            <FaAngleLeft className="w-6 h-6" />
        ) : (
            <FaAngleRight className="w-6 h-6" />
        );

    return isDisabled ? (
        <div className={className}>{icon}</div>
    ) : (
        <Link className={className} href={href}>
            {icon}
        </Link>
    );
}
