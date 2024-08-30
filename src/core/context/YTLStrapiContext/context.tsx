import React, { createContext } from "react";
import get from "lodash/get";
import find from "lodash/find";
import { YTLStrapiDataProps, YTLStrapiDataProviderProps } from "./@types";
// ============== CONTEXT
export const YTLStrapiDataContext = createContext<YTLStrapiDataProps>(
  null as unknown as YTLStrapiDataProps
);

// consumer
export const YTLStrapiDataConsumer = YTLStrapiDataContext.Consumer;

// provider
export const YTLStrapiDataProvider: React.FC<YTLStrapiDataProviderProps> = (
  props
) => {
  const {
    global,
    pageData,
    contentData,
    children,
    customComponent,
    currentPage
  } = props || {};
  // ================== HELPERS
  const getContentDataBlocks = () =>
    get({ contentData }, "contentData[0].attributes.blocks", null);

  const getMetaDataFromContentData = () => {
    const blocks = getContentDataBlocks();
    const seo = blocks?.find?.((block) => block?.__component === "shared.seo");
    const og = blocks?.find?.(
      (block) => block?.__component === "shared.opengraph"
    );
    if (seo && og) return { attributes: { seo, opengraph: og } };
    return null;
  };

  const getMetaData = () => {
    const { siteName, siteURL } = global?.attributes || {};
    const { opengraph } =
      pageData?.attributes || getMetaDataFromContentData()?.attributes || {};
    const canonicalURL = `${siteURL}${opengraph?.url}`;
    return {
      siteName,
      siteURL,
      canonicalURL
    };
  };

  const getBlocks = (
    type: "page" | "content" | "custom",
    customComponent: any
  ) => {
    if (type === "page") return pageData?.attributes?.blocks;
    if (type === "content") return contentData?.attributes?.blocks;
    return customComponent?.attributes?.blocks;
  };

  const getConditionalBlocks = () => {
    if (pageData?.attributes?.blocks) return pageData?.attributes?.blocks;
    return getContentDataBlocks();
  };

  // ================== VIEWS
  return (
    <YTLStrapiDataContext.Provider
      value={{
        global,
        pageData,
        contentData,
        customComponent,
        getMetaData,
        getBlocks,
        getContentDataBlocks,
        getConditionalBlocks,
        getMetaDataFromContentData,
        currentPage
      }}
    >
      {children}
    </YTLStrapiDataContext.Provider>
  );
};
