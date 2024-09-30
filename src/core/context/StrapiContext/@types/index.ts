// data for context
export type StrapiData<P = any, C = any> = {
  global: any;
  pageData: P;
  contentData: C;
  customComponent?: string;
  currentPage?: any;
};

// context props
export type StrapiDataProps<P = any, C = any> = StrapiData<P, C> & {
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
export type StrapiDataProviderProps = Pick<
  StrapiDataProps,
  "global" | "pageData" | "contentData" | "customComponent" | "currentPage"
> & {
  children?: React.ReactNode;
};
