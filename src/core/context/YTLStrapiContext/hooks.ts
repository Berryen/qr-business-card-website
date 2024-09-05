import { useContext } from "react";
import { YTLStrapiDataProps } from "./@types";
import { YTLStrapiDataContext } from "./context";
import { putLogEvents } from "helpers/cloudwatch";

export const useYTLStrapiDataHook = <P = any, C = any>(): YTLStrapiDataProps<
  P,
  C
> => {
  const context = useContext(YTLStrapiDataContext);

  if (!context) {
    //putLogEvents(`useYTLStrapiDataHook must be used inside a YTLStrapiDataProvider. ` + contextName);
    throw new Error(
      `useYTLStrapiDataHook must be used inside a YTLStrapiDataProvider.`
    );
  }

  return context;
};

export default useYTLStrapiDataHook;
