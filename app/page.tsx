"use client";

import {
  BusinessListContext,
  IBusinessList,
} from "@/context/BusinessListContext";
import { SelectedBusinessContext } from "@/context/SelectedBusinessContext";
import { UserLocationContext } from "@/context/UserLocationContext";
import { fetchNearbyPlaces } from "@/lib/api-calls";
import { useEffect, useState } from "react";
import { useContext } from "react";
import SideNavBar from "./_components/SideNavBar";
import SearchBar from "./_components/SearchBar";
import CategoryList from "./_components/CategoryList";
import BusinessList from "./_components/BusinessList";
import GoogleMap_ from "./_components/GoogleMap_";
import BusinessToast from "./_components/BusinessToast";

export default function Home() {
  const userLocationContext = useContext(UserLocationContext);

  const [businessList, setBusinessList] = useState<Array<IBusinessList>>([]);
  const [selectedBusiness, setSelectedBusiness] = useState([]);

  if (!userLocationContext) {
    throw new Error("UserLocationContext must be used within a Provider");
  }
  const { userLocation } = userLocationContext;

  useEffect(() => {
    if (userLocation) {
      handleGetNearByPlaces("restaurant");
    }
  }, [userLocation]);

  const handleGetNearByPlaces = (category: string) => {
    if (!userLocation) return;

    fetchNearbyPlaces(category, userLocation.lat, userLocation.lng)
      .then((data) => {
        setBusinessList(data.results);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <SelectedBusinessContext.Provider
        value={{ selectedBusiness, setSelectedBusiness }}
      >
        <BusinessListContext.Provider value={{ businessList, setBusinessList }}>
          <div className="grid grid-cols-[80px_1fr] h-full">
            <SideNavBar />
            <div
              className="grid grid-cols-1
      md:grid-cols-2 w-full lg:h-screen lg:overflow-hidden"
            >
              {/* left side */}
              <div className="h-screen bg-white p-5 flex flex-col">
                <SearchBar />
                <CategoryList
                  setSelectedCategory={(category: string) =>
                    handleGetNearByPlaces(category)
                  }
                />
                <BusinessList businessListData={businessList} />
              </div>
              {/* right side google map */}
              <div className="order-first md:order-last ">
                <GoogleMap_ />
                <BusinessToast userLocation={userLocation} />
              </div>
            </div>
          </div>
        </BusinessListContext.Provider>
      </SelectedBusinessContext.Provider>
    </div>
  );
}
