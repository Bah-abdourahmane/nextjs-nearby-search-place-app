import { createContext } from "react";
import { IBusinessList } from "./BusinessListContext";

export interface ISelectedBusinessListContext {
  selectedBusiness: IBusinessList | null;
  setSelectedBusiness: React.Dispatch<
    React.SetStateAction<IBusinessList | null>
  >;
}

export const SelectedBusinessContext = createContext(null);
