// data for context
export type YTLStrapiData<P = any, C = any> = {
  global: any;
  pageData: P;
  contentData: C;
  customComponent?: string;
  currentPage?: any;
};

// context props
export type YTLStrapiDataProps<P = any, C = any> = YTLStrapiData<P, C> & {
  getMetaData: () => any;
  getBlocks: (
    type: "page" | "content" | "custom",
    customComponent?: any
  ) => any;
  getContentDataBlocks: () => any;
  getConditionalBlocks: () => any;
  getMetaDataFromContentData: () => any;
};

// component props for provider
export type YTLStrapiDataProviderProps = Pick<
  YTLStrapiDataProps,
  "global" | "pageData" | "contentData" | "customComponent" | "currentPage"
> & {
  children?: React.ReactNode;
};
