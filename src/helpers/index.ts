import { isArray, isNil, isString, size, isNumber } from "lodash";

// to fixed number
export const toFixedNumber = (num: number) => parseFloat(num?.toFixed(2)) || 0;

// export const splitRoutes = (router: any, pos?: number) => {
//   const splitedRoutes = isNumber(pos)
//     ? router?.asPath.split("#")?.[pos]
//     : router?.asPath.split("#");

//   return splitedRoutes;
// };

/**
 *
 * @param params
 * @example production /infrastructure/airport
 * params : ['infrastructure', 'airport']
 * @returns url
 * can be product/slug, media/slug, or just infrastructure/airport
 */
export const detectParams = (params: any) => {
  if (isNil(params)) return "";
  if (isString(params)) return params;
  if (isArray(params)) {
    const type = params?.[0];
    if (size(params) > 1) {
      if (type === "product") return "product/slug";
      if (type === "media") return "media/slug";
      if (type === "job") return "job/slug";
    }
  }

  return params.join("/");
};

/**
 * @param data 
 * @example 
 ```json 
 [
    {
      id: 20,
      attributes: {
        url: '/',
        createdAt: '2022-10-27T02:25:20.988Z',
        updatedAt: '2022-10-27T02:55:26.204Z',
        publishedAt: '2022-10-27T02:25:22.037Z',
        singleTypeApi: 'landing-page',
        singleTypeApiOptions: null,
        collectionTypeApi: null,
        collectionTypeApiOptions: null,
        customComponentName: null
      }
    }
  ]
 ```
 * @params params
  ```json 
 ['infrastructure', 'airport']
 ```
 
 * @example  [
  {
    id: 20,
    attributes: {
      url: '/',
      createdAt: '2022-10-27T02:25:20.988Z',
      updatedAt: '2022-10-27T02:55:26.204Z',
      publishedAt: '2022-10-27T02:25:22.037Z',
      singleTypeApi: 'landing-page',
      singleTypeApiOptions: null,
      collectionTypeApi: null,
      collectionTypeApiOptions: null,
      customComponentName: null
    }
  }
  ]

 * @returns
 * singleTypeApi - singleTypeApi field from strapi
 *               - example: landing-page
 * collectionTypeApi - collectionTypeApi field from strapoi
 *                   - example: product-types
 * singleTypeApiOptions - singleTypeApiOptions field from strapi
 * @example - {
  "populate": {
    "seo": {
      "populate": "*"
    },
    "opengraph": {
      "populate": "*"
    },
  }
 * collectionTypeApiOptions - collectionTypeApiOptions field from strapi
 * @example - {
  "populate": [
    "productCategories",
    "productCategories.productAttributes",
    "productCategories.productAttributes.productAttributeOptions"
  ]
  }
 */
export const urlChecker = (data: any, params: any) => {
  let pageTitle,
    singleTypeApi,
    collectionTypeApi,
    singleTypeApiOptions,
    collectionTypeApiOptions;

  if (size(data) > 0) {
    const page = data[0]?.attributes;
    singleTypeApi = page?.singleTypeApi ?? null;
    singleTypeApiOptions = page?.singleTypeApiOptions ?? null;
    collectionTypeApi = page?.collectionTypeApi ?? null;
    collectionTypeApiOptions = page?.collectionTypeApiOptions ?? null;
    pageTitle = page?.pageTitle ?? null;
  } else {
    singleTypeApi = params?.page;
  }

  return {
    pageTitle,
    singleTypeApi,
    collectionTypeApi,
    singleTypeApiOptions,
    collectionTypeApiOptions,
  };
};

export const checkURLProtocol = (link: string) => {
  const target = link === "#" ? "" : "_blank";
  if (link === "#" || link?.startsWith("http") || link?.startsWith("https"))
    return {
      link,
      target,
    };
  return { link: `//${link}`, target };
};

export const getLabelByLink = (data, router, index = 1) => {
  const found = data?.find((link: any) => {
    const itemLink = link?.attributes?.link?.href;
    return router?.asPath?.split("#")?.[index] === itemLink;
  })?.attributes?.link?.label;
  return found;
};

export default {
  // splitRoutes,
  detectParams,
  urlChecker,
  checkURLProtocol,
  getLabelByLink,
};
