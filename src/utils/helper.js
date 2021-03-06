import { useLocation } from "react-router-dom";

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function blobToFile(theBlob, fileName) {
  //A Blob() is almost a File() - it's just missing the two properties below which we will add
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;
  return theBlob;
}

export const renameKeys = (keysMap, obj) => {
  debugger;
  return Object.keys(obj).reduce((acc, key) => {
    debugger;
    const renamedObject = {
      [keysMap[key] || key]: obj[key]
    };
    debugger;
    return {
      ...acc,
      ...renamedObject
    };
  }, {});
};

export const capitalizeFirstChar = s => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
