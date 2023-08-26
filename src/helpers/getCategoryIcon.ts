import { Icon } from "leaflet";

export const getCategoryIcon = (url?:string) => {
    return new Icon({
      iconUrl:url,
      iconSize:[25,25]
    });
  };