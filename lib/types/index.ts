import { IBusinessList } from "@/context/BusinessListContext";

export interface IPlace {
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

export interface NearbyPlaceResponse {
  results: IBusinessList[]; // Liste des lieux trouvés
  status: string; // Statut de la réponse (OK, ZERO_RESULTS, etc.)
  error_message?: string; // Optionnel en cas d'erreur
}
// =============================================================================
export interface SearchPlaceParams {
  searchtext: string; // Texte de recherche (nom du lieu)
  lat: number; // Latitude
  lng: number; // Longitude
}
export interface SearchPlaceResponse {
  candidates: IPlace[]; // Liste des résultats possibles
  status: string; // Statut de la réponse (OK, ZERO_RESULTS, etc.)
  error_message?: string; // Message d'erreur si applicable
}
