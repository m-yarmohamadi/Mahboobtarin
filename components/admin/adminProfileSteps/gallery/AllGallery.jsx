import useGetExpertiseUser from "@/hooks/useExpertiseUser";
import GalleryItem from "./GalleryItem";

export default function AllGallery({ user }) {
    const { data, isLoading: isGetGallery } = useGetExpertiseUser(user?.unique_url_id);
    const { gallery } = data?.user || {};

    if (isGetGallery) return null;

    return (
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-4'>
            {gallery?.map((item, index) => (
                <GalleryItem
                    key={index}
                    data={item}
                />
            ))}
        </div>

    )
}
