import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom green pin matching the Natours design
const greenPinIcon = L.divIcon({
  className: "custom-natours-pin",
  html: `
    <div style="
      width: 28px;
      height: 28px;
      background-color: #20bf6b;
      border: 4px solid #ffffff;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 4px 10px rgba(0,0,0,0.25);
    "></div>
  `,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -30],
});

// Helper component to auto-fit map bounds to all tour locations
function FitBounds({ locations }) {
  const map = useMap();

  useEffect(() => {
    if (!locations?.length) return;

    const bounds = L.latLngBounds(
      locations.map((loc) => [loc.coordinates[1], loc.coordinates[0]]),
    );

    map.fitBounds(bounds, {
      paddingTopLeft: L.point(50, 140),
      paddingBottomRight: L.point(50, 100),
      maxZoom: 10,
    });
  }, [locations, map]);

  return null;
}

export default function TourMap({ locations }) {
  if (!locations?.length) return null;

  // Initial center (flipped from [lng, lat] to [lat, lng])
  const initialCenter = [
    locations[0].coordinates[1],
    locations[0].coordinates[0],
  ];

  return (
    <section className="relative z-10 -mt-[9vw] h-[38rem] w-full [clip-path:polygon(0_9vw,100%_0,100%_calc(100%-9vw),0_100%)]">
      <MapContainer
        center={initialCenter}
        zoom={7}
        scrollWheelZoom={false}
        className="h-full w-full z-0"
      >
        {/* Clean, light monochrome map tiles matching Natours */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
        />

        <FitBounds locations={locations} />

        {locations.map((loc) => (
          <Marker
            key={loc._id}
            position={[loc.coordinates[1], loc.coordinates[0]]}
            icon={greenPinIcon}
            eventHandlers={{
              add: (e) => {
                // Opens popup automatically on load like the screenshot
                e.target.openPopup();
              },
            }}
          >
            <Popup closeButton={true} autoClose={false} closeOnClick={false}>
              <span className="font-sans text-xs font-medium text-gray-600">
                Day {loc.day}: {loc.description}
              </span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
}
