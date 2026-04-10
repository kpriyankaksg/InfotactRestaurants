
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";




  // const userDetails= useSelector((appStore)=> appStore.user.user);
  // const postalcode= userDetails.user.postalcode;
  // console.log("Customer Postal Code", postalcode);
  // const location=useLocation();
  // const restaurantDetails= location.state?.restaurantDetails;
  // console.log(restaurantDetails)



const statuses = ["Placed", "Preparing", "On the way", "Delivered"];

const Tracking = () => {
  const location = useLocation();
  const { restaurantDetails } = location.state || {};

  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    // Status updates every 2 seconds
    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => (prev < statuses.length - 1 ? prev + 1 : prev));
    }, 2000);

    // Google Maps setup
    const [lon, lat] = restaurantDetails?.location || [];
    const restaurantCoords = { lat, lng: lon };
    const customerCoords = { lat: lat + 0.01, lng: lon + 0.01 }; // simulate customer nearby

    const map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: restaurantCoords,
    });

    const bikeMarker = new window.google.maps.Marker({
      position: restaurantCoords,
      map,
      icon: "https://img.icons8.com/color/48/delivery-scooter.png",
    });

    // Animate bike every 1 second
    let step = 0;
    const totalSteps = 5; // reach in 5 seconds
    const bikeInterval = setInterval(() => {
      step++;
      const latStep =
        restaurantCoords.lat +
        (customerCoords.lat - restaurantCoords.lat) * (step / totalSteps);
      const lngStep =
        restaurantCoords.lng +
        (customerCoords.lng - restaurantCoords.lng) * (step / totalSteps);
      bikeMarker.setPosition({ lat: latStep, lng: lngStep });

      if (step === totalSteps) clearInterval(bikeInterval);
    }, 1000);

    return () => {
      clearInterval(statusInterval);
      clearInterval(bikeInterval);
    };
  }, [restaurantDetails]);

  return (
    <div className="pt-24 ml-64 p-8 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Track Your Order</h1>

      {/* Map */}
      <div id="map" style={{ width: "100%", height: "300px" }} />

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

      {/* Delivery Info */}
      {statusIndex === statuses.length - 1 && (
        <div className="mt-6 p-4 border rounded bg-white shadow">
          <h3 className="font-semibold text-red-600">Order delivered!</h3>
          <p className="text-gray-600">Left at front door.</p>
          <div className="flex items-center mt-2">
            <img
              src="https://img.icons8.com/ios-filled/50/user.png"
              alt="Driver"
              className="w-10 h-10 mr-2"
            />
            <span className="font-medium">Driver: Delicia</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tracking;