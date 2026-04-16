import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Latlong_ApiKey } from "../utils/constants";

const statuses = ["Placed", "Preparing", "On the way", "Delivered"];

const Tracking = () => {
  const mapRef = useRef(null);

  const location = useLocation();
  const userDetails = useSelector((appStore) => appStore.user.user);
  const customerPostalcode = userDetails.user.postalcode;
  const { restaurantDetails } = location.state || {};

  const [statusIndex, setStatusIndex] = useState(0);
  const [customerCoords, setCustomerCoords] = useState(null);

  useEffect(() => {
    getCustomerLatLong();

    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => (prev < statuses.length - 1 ? prev + 1 : prev));
    }, 4000);

    return () => clearInterval(statusInterval);
  }, []);

// 1. Setup map once
useEffect(() => {
  if (!restaurantDetails?.location || !customerCoords) return;

  const [lon, lat] = restaurantDetails.location;
  const restaurantCoords = [lat, lon];

  if (mapRef.current) {
    mapRef.current.remove();
    mapRef.current = null;
  }

  const map = L.map("map").setView([lat, lon], 14);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  mapRef.current = map;

  // Restaurant marker
  L.marker(restaurantCoords).addTo(map).bindPopup("Restaurant").openPopup();

  // Customer marker
  L.marker([customerCoords.lat, customerCoords.lng])
    .addTo(map)
    .bindPopup("Customer");

  // Polyline route
  L.polyline([restaurantCoords, [customerCoords.lat, customerCoords.lng]], {
    color: "red",
  }).addTo(map);

  // Bike icon
  const bikeIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3681/3681701.png",
    iconSize: [48, 48],
    iconAnchor: [24, 24],
  });

  // Save bike marker reference
  const bikeMarker = L.marker(restaurantCoords, { icon: bikeIcon }).addTo(map);
  mapRef.current.bikeMarker = bikeMarker;
}, [restaurantDetails, customerCoords]);

// 2. Animate bike when status changes
useEffect(() => {
  if (!mapRef.current?.bikeMarker || !customerCoords || !restaurantDetails?.location) return;

  const bikeMarker = mapRef.current.bikeMarker;
  const [lon, lat] = restaurantDetails.location;
  const restaurantCoords = [lat, lon];

  let interval;

  if (statuses[statusIndex] === "On the way") {
    let step = 0;
    const totalSteps = 15;
    interval = setInterval(() => {
      step++;
      const latStep =
        restaurantCoords[0] +
        (customerCoords.lat - restaurantCoords[0]) * (step / totalSteps);
      const lngStep =
        restaurantCoords[1] +
        (customerCoords.lng - restaurantCoords[1]) * (step / totalSteps);

      bikeMarker.setLatLng([latStep, lngStep]);

      if (step === totalSteps) clearInterval(interval);
    }, 1000);
  }

  if (statuses[statusIndex] === "Delivered") {
    // Snap bike to customer location
    bikeMarker.setLatLng([customerCoords.lat, customerCoords.lng]);
      }

      return () => clearInterval(interval);
    }, [statusIndex, restaurantDetails, customerCoords]);

  // getting lat long based on postalcode
  const getCustomerLatLong = async () => {
    const apiKey = Latlong_ApiKey;
    try {
      const response = await fetch(
        `https://us1.locationiq.com/v1/search?key=${apiKey}&q=${encodeURIComponent(
          customerPostalcode
        )}&format=json`
      );
      const result = await response.json();
      if (result.length > 0) {
        const { lat, lon } = result[0];
        setCustomerCoords({ lat: parseFloat(lat), lng: parseFloat(lon) });
      }
    } catch (err) {
      console.error("Geocoding failed:", err.message);
    }
  };

  return (
    <div className="pt-16 ml-64 p-8 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Track Your Order</h1>
      <div id="map" style={{ width: "100%", height: "400px" }} />

      {/* Status Progress */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Order Status</h2>
        <div className="flex justify-between mt-2">
          {statuses.map((s, idx) => (
            <div
              key={idx}
              className={`flex-1 text-center ${
                idx <= statusIndex ? "text-green-600 font-bold" : "text-gray-400"
              }`}
            >
              {s}
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 h-2 mt-2 rounded">
          <div
            className="bg-green-600 h-2 rounded"
            style={{ width: `${(statusIndex / (statuses.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;