import axios from "axios";
import {
  NearbyPlaceResponse,
  SearchPlaceParams,
  SearchPlaceResponse,
} from "./types";

const fetchSearchPlace = async ({
  searchtext,
  lat,
  lng,
}: SearchPlaceParams) => {
  try {
    const response = await axios.get<SearchPlaceResponse>(
      `/api/google-search-place`,
      {
        params: { searchtext, lat, lng },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching search place:", error);
    throw error;
  }
};

const fetchNearbyPlaces = async (
  category: string,
  lat: number,
  lng: number
) => {
  try {
    const response = await axios.get(
      "/api/google-nearby-search",
      {
        params: { category, lat, lng },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching nearby places:", error);
    throw error;
  }
};

export { fetchNearbyPlaces, fetchSearchPlace };
