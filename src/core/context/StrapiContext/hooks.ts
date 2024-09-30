import { useContext } from "react";
import { StrapiDataProps } from "./@types";
import { StrapiDataContext } from "./context";
// import { putLogEvents } from "helpers/cloudwatch";

export const useStrapiDataHook = <P = any, C = any>(): StrapiDataProps<
  P,
  C
> => {
  const context = useContext(StrapiDataContext);

  if (!context) {
    throw new Error(
      `useStrapiDataHook must be used inside a StrapiDataProvider.`
    );
  }

  return context;
};

export default useStrapiDataHook;
