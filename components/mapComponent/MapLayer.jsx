import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from "react-leaflet";
import { useState, useEffect } from "react";
import 'leaflet/dist/leaflet.css';
import { MdMyLocation } from "react-icons/md";
import useGeoLocation from "@/hooks/useGeoLocation";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";


const BASE_GEOCODING_URL =
    "https://api.bigdatacloud.net/data/reverse-geocode-client";


export default function MapLayer({ open, onClose, title = "انتخاب آدرس", setCoord }) {
    const [mapCenter, setMapCenter] = useState([35.6892, 51.3890]);
    const [addressData, setAddressData] = useState();
    const {
        isLoading: isLoadingPosition,
        position: geoLocationPosition,
        getPosition,
    } = useGeoLocation();

    const customIcon = new L.Icon({
        iconUrl: "/images/marker-icon.png",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
    });

    const submitMapHandler = () => {
        if (!mapCenter || !mapCenter.length) return;
        setCoord(mapCenter);
        onClose();
    }

    useEffect(() => {
        if (!mapCenter || !mapCenter.length) return;

        async function fetchLocationData() {
            try {
                const { data } = await axios.get(
                    `${BASE_GEOCODING_URL}?latitude=${mapCenter[0]}&longitude=${mapCenter[1]}&localityLanguage=fa`
                );

                if (!data.countryCode) {
                    toast.error("این مکان شهر یا استان نیست! لطفا جای دیگری را انتخاب کنید");
                    return;
                }

                setAddressData(data.city || data.locality || "");
            } catch (error) {

            } finally {

            }
        }
        fetchLocationData();
    }, [mapCenter]);

    useEffect(() => {
        if (geoLocationPosition?.lat && geoLocationPosition?.lng)
            setMapCenter([geoLocationPosition.lat, geoLocationPosition.lng]);
    }, [geoLocationPosition]);

    if (open) {
        return (
            <>
                <div onClick={onClose} className="w-full h-full fixed top-0 right-0 bg-slate-900/60 z-50"></div>
                <div className="w-full h-[calc(100%-48px)] flex flex-col gap-6 max-w-[650px] bg-white shadow-lg dark:shadow-darkLg rounded-xl p-6 fixed top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 z-50">
                    <div className="w-full flex items-center justify-between font-bold text-slate-800 border-b border-slate-300 pb-4">
                        <div>
                            {title}
                        </div>
                        <button type="button" onClick={onClose}>
                            <IoMdClose className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="w-full flex-1 relative">
                        {!isLoadingPosition && (
                            <div className="w-full h-full">
                                <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={true} className="w-full h-full">
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={mapCenter} icon={customIcon}>
                                    </Marker>
                                    <ChangeCenter position={mapCenter} />
                                    <DetectClick setMapCenter={setMapCenter} />
                                </MapContainer>
                            </div>
                        )}
                        <div className="absolute bottom-4 left-4 z-[99999]">
                            <button type="button" onClick={getPosition} className="btn btn--primary !p-2 !text-[10px] !gap-1">
                                دریافت موقعیت فعلی شما
                                <MdMyLocation className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <div className="w-full">
                        <button type="button" onClick={submitMapHandler} disabled={!mapCenter || !mapCenter.length} className="btn btn--primary w-full disabled:bg-opacity-40">
                            تایید
                        </button>
                    </div>
                </div>
            </>
        );
    }
}


function ChangeCenter({ position }) {
    const map = useMap();

    useEffect(() => {
        if (position) {
            map.setView(position);
        }
    }, [position, map]);

    return null;
}

function DetectClick({ setMapCenter }) {
    const map = useMap();
    useMapEvent({
        click: (e) => {
            const newCenter = [e.latlng.lat, e.latlng.lng];
            map.setView(newCenter);

            setMapCenter(newCenter);
        },
    });
    return null;
}
