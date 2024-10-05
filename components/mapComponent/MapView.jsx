import dynamic from "next/dynamic";

const MapView = dynamic(() => import("./MapViewComponent"), {
    ssr: false,
})

export default MapView;