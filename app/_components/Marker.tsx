"use client";
import { BusinessListContext } from "@/context/BusinessListContext";
import { IUserLocation } from "@/context/UserLocationContext";
import { InfoBox, MarkerF } from "@react-google-maps/api";
import React, { useContext } from "react";

function Marker({ userLocation }: { userLocation: IUserLocation }) {
  const { businessList } = useContext(BusinessListContext);
  return (
    <div>
      {businessList &&
        businessList.map(
          (business, index) =>
            index <= 4 && (
              <MarkerF
                key={index}
                position={business.geometry.location}
                icon={{
                  url: "/location-pin.png",
                  scaledSize: {
                    width: 30,
                    height: 30,
                  },
                }}
              >
                <InfoBox position={business.geometry.location}>
                  <div
                    style={{
                      backgroundColor: "white",
                      backgroundColor: "#c084fc",
                      opacity: 1,
                      padding: 7,
                      color: "white",
                      borderRadius: 10,
                      width: 100,
                    }}
                  >
                    <div style={{ fontSize: 10, fontColor: `#08233B` }}>
                      {business.name}
                    </div>
                  </div>
                </InfoBox>
              </MarkerF>
            )
        )}
      <MarkerF
        position={userLocation}
        icon={{
          url: "/user-location.png",
          scaledSize: {
            width: 55,
            height: 55,
          },
        }}
      ></MarkerF>
    </div>
  );
}

export default Marker;
