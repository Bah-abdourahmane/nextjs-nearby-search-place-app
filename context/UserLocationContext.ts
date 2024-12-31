import { createContext } from "react";

export interface IUserLocation {
  lat: number;
  lng: number;
}

// Typage du contexte, qui peut être null ou avoir un objet contenant userLocation et setUserLocation
export interface IUserLocationContext {
  userLocation: IUserLocation | null;
  setUserLocation: React.Dispatch<React.SetStateAction<IUserLocation | null>>;
}

export const UserLocationContext = createContext<IUserLocationContext | null>(
  null
);
