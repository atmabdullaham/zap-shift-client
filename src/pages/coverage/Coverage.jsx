import "leaflet/dist/leaflet.css";
import { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const serviceCenters = useLoaderData();
  const mapRaf = useRef(null);

  const position = [23.685, 90.3563];
  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );
    if (district) {
      const coord = [district.latitude, district.longitude];
      console.log(coord, district);
      mapRaf.current.flyTo(coord, 14);
    }
  };
  return (
    <div className="bg-white dark:bg-gray-800 p-10 rounded-xl space-y-6">
      <h2 className="text-2xl md:text-3xl text-secondary font-bold">
        We are available in 64 districts
      </h2>
      {/* search */}
      <div>
        <form onSubmit={handleSearch}>
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              name="location"
              type="search"
              required
              placeholder="Search"
            />
          </label>
        </form>
      </div>
      {/* map container */}
      <div className="border w-full h-[800px]">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="h-[800px]"
          ref={mapRaf}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {serviceCenters.map((center) => (
            <Marker
              key={center.id}
              position={[center.latitude, center.longitude]}
            >
              <Popup>
                <strong>{center.district}</strong> <br /> service area:{" "}
                {center.covered_area.join(",")}.
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
