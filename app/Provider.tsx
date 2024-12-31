"use client";
import {
  IUserLocation,
  UserLocationContext,
} from "@/context/UserLocationContext";
import { useEffect, useState } from "react";
import React from "react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [userLocation, setUserLocation] = useState<IUserLocation | null>({
    lat: 45.429471,
    lng: -75.805918,
  });

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  };
  return (
    <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
      {children}
    </UserLocationContext.Provider>
  );
};

export default Provider;
