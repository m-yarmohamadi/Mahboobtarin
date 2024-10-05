import { MapContainer, Marker, TileLayer } from "react-leaflet";

export default function MapViewComponent({ coord = [35.6892, 51.3890] }) {
    const customIcon = new L.Icon({
        iconUrl: "/images/marker-icon.png",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
    });

    return (
        <MapContainer center={coord} zoom={13} scrollWheelZoom={true} className="w-full h-full">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={coord} icon={customIcon}>
            </Marker>
        </MapContainer>
    )
}
