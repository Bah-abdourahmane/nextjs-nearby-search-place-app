import { SelectedBusinessContext } from "@/context/SelectedBusinessContext";
import { UserLocationContext } from "@/context/UserLocationContext";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import React, { useContext } from "react";
import Marker from "./Marker";

function GoogleMap_() {
  const { userLocation } = useContext(UserLocationContext);
  const { selectedBusiness } = useContext(SelectedBusinessContext);
  const containerStyle = {
    width: "100%",
    height: "100vh",
    // borderRadius: 20,
  };

  return (
    <div>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}>
        {userLocation ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={
              !selectedBusiness.name
                ? {
                    lat: userLocation.lat,
                    lng: userLocation.lng,
                  }
                : selectedBusiness.geometry.location
            }
            zoom={selectedBusiness.name ? 18 : 10}
          >
            {/* Child components, such as markers, info windows, etc. */}
            <>
              <Marker userLocation={userLocation} />
            </>
          </GoogleMap>
        ) : null}
      </LoadScript>
    </div>
  );
}

export default GoogleMap_;
