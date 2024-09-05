import React from "react";
import { useYTLStrapiDataHook } from "core/context/YTLStrapiContext";
import { useRouter } from "next/router";

export const ErrorStatus: React.FC = () => {
  const router = useRouter();
  const { global } = useYTLStrapiDataHook();
  const globalAttr = global?.attributes;
  const translationAttr = globalAttr?.globalTranslation;

  const getTranslation = (key: string) => {
    const translations = {
      en: translationAttr?.englishTranslation || {},
      bm: translationAttr?.bahasaMelayuTranslation || {},
      vi: translationAttr?.vietnameseTranslation || {},
    };

    const currentTranslation =
      translations[router.locale as keyof typeof translations] ||
      translations.en;

    // If translation is not found, fallback to the key
    return currentTranslation?.[key] || key;
  };
  // ================== VIEWS
  return (
    <div className="min-h-screen sm:bg-primary sm:pb-12 sm:pt-36 justify-center">
      <div className="relative min-h-full min-width max-w-screen md:max-w-2xl mx-5 md:m-auto sm:p-10 bg-secondary border border-stroke sm:rounded-3xl">
        <div className="gap-5 flex flex-col h-96 justify-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-sm  sm:text-lg text-offgray font-bold">404</h1>
            <p className="text-2xl text-offwhite sm:text-3xl font-bold">
              {getTranslation("Page not found")}
            </p>
            <p className="text-sm text-offwhite sm:text-lg">
              {getTranslation(
                "Sorry, something went wrong, please try again later."
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorStatus;
