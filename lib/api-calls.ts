import axios from "axios";

interface NearbyPlaceParams {
  category: string; // Type de lieu (restaurant, supermarket, etc.)
  lat: number; // Latitude
  lng: number; // Longitude
}

interface Place {
  name: string;
  formatted_address: string;
  rating?: number; // Certaines propriétés peuvent être optionnelles
  opening_hours?: {
    open_now: boolean;
  };
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
  }>;
}

interface NearbyPlaceResponse {
  results: Place[]; // Liste des lieux trouvés
  status: string; // Statut de la réponse (OK, ZERO_RESULTS, etc.)
  error_message?: string; // Optionnel en cas d'erreur
}

const getNearByPlace = async ({
  category,
  lat,
  lng,
}: NearbyPlaceParams): Promise<NearbyPlaceResponse> => {
  const response = await axios.get<NearbyPlaceResponse>(
    `/api/find-place?category=${category}&lat=${lat}&lng=${lng}`
  );
  return response.data;
};

// =============================================================================
interface SearchPlaceParams {
  searchtext: string; // Texte de recherche (nom du lieu)
  lat: number; // Latitude
  lng: number; // Longitude
}
interface SearchPlaceResponse {
  candidates: Place[]; // Liste des résultats possibles
  status: string; // Statut de la réponse (OK, ZERO_RESULTS, etc.)
  error_message?: string; // Message d'erreur si applicable
}

const searchPlace = async ({
  searchtext,
  lat,
  lng,
}: SearchPlaceParams): Promise<SearchPlaceResponse> => {
  const response = await axios.get<SearchPlaceResponse>(
    `/api/google-search-place?searchtext=${searchtext}&lat=${lat}&lng=${lng}`
  );
  return response.data;
};

export { getNearByPlace, searchPlace };
