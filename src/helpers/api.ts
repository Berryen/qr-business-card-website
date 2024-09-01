import * as qs from "qs";
import { size, isEmpty } from "lodash";
import {
  API_ENDPOINT,
  serviceNowPassword,
  serviceNowUsername,
} from "config/constant";
// import { localeTranslation } from "helpers/locale";
// import { putLogEvents } from "./cloudwatch";

// compose & get strapi url with path
export const getStrapiURL = (path = "") => {
  return `${API_ENDPOINT}${path}`;
};

// compose url with query string
export const composeUrlWithQueryString = (path: string, params: {} = {}) => {
  const queryString = qs.stringify(params);
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`
  )}`;
  return requestUrl;
};

// fetch strapi API with path & params
export const fetchStrapiAPI = async (
  path: string,
  params: { [key: string]: any } = {},
  options: RequestInit = {}
) => {
  const mergedOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  let requestUrl = composeUrlWithQueryString(path, params);
  try {
    let response = await fetch(requestUrl, mergedOptions);

    if (!response.ok) {
      if (params.locale !== "en") {
        params.locale = "en";
        requestUrl = composeUrlWithQueryString(path, params);
        response = await fetch(requestUrl, mergedOptions);
      } else {
        console.error(response.statusText);
      }
    }
    return response.json();
  } catch (error) {
    // putLogEvents((error as Error).message + " || " + (error as Error).stack);
  }
};

// fetch api and get json response
export const fetchAPI = async (path: string) => {
  const response = await fetch(path);
  return response.json();
};

// fetch ServiceNow api
export const fetchServiceNowAPI = async (
  url: string,
  method = "GET",
  body: { [key: string]: any } = {}
) => {
  const response = await fetch(url, {
    method: method,
    headers: {
      Authorization: `Basic ${btoa(
        `${serviceNowUsername}:${serviceNowPassword}`
      )}`,
      "Content-Type": "application/json",
    },
    ...(method !== "GET" && {
      body: JSON.stringify(body),
    }),
  });
  return response.json();
};

/**
 *
 * @param param0
 * @returns
 * pagedata
 * @example
 ```json
 {
  id: 1,
  attributes: {
    createdAt: '2022-08-02T16:02:27.758Z',
    updatedAt: '2022-09-23T02:45:00.555Z',
    publishedAt: '2022-08-02T16:02:30.141Z',
    blocks: [ [Object], [Object], [Object], [Object], [Object], [Object] ],
    seo: {
      id: 30,
      metaTitle: 'Sustainability',
      metaDescription: 'Malaysia is a developing and relatively young nation with a high urbanisation rate, factors which we believe will drive the demand for housing and thus infrastructure requirements. Cement and concrete, the world’s most used building material, naturally plays a crucial role in meeting these construction needs.\n' +
        '\n' +
        'As the country’s first and largest producer of cement and concrete, YTL Cement wants to lead the way in supporting the nation’s growing urbanisation and construction needs. We aspire to help build better and more sustainably together by firstly ensuring our progress in the environment, social, and governance fronts. Sustainability is at the heart of our strategy and operations. We will continue to focus and invest in product development, working with experts and our customers to develop products and solutions that are greener.',
      metaImage: [Object]
    },
  }
  ```
 */
export const initiateStrapiAPI = async ({
  pageTitle,
  singleTypeApi,
  collectionTypeApi,
  singleTypeApiOptions,
  collectionTypeApiOptions,
  locale,
  params,
}: any) => {
  const populateFunc = (args: any) => {
    return args?.populate ?? "deep";
  };
  const filterFunc = (params: any, pageTitle: string) => {
    const cond = pageTitle ? { title: { $eq: pageTitle } } : {};
    if (size(params?.page) >= 1) {
      switch (params?.page?.[0]) {
        case "job":
        case "product":
        case "media":
          return {
            slug: {
              $eq: params?.page?.[1],
            },
          };

        default:
          return cond;
      }
    }
    return {};
  };
  let pageData = null,
    contentData = null;
  if (singleTypeApi) {
    const { data } = await fetchStrapiAPI(`/${singleTypeApi}`, {
      // locale: localeTranslation(locale),
      populate: populateFunc(singleTypeApiOptions),
      headers: [
        {
          key: "Cache-Control",
          value: "public, s-maxage=31536000, stale-while-revalidate=10",
        },
      ],
    });

    if (!isEmpty(data)) pageData = data;
  }

  if (collectionTypeApi) {
    const { data } = await fetchStrapiAPI(`/${collectionTypeApi}`, {
      // locale: localeTranslation(locale),
      populate: populateFunc(collectionTypeApiOptions),
      filters: filterFunc(params, pageTitle),
      headers: [
        {
          key: "Cache-Control",
          value: "public, s-maxage=31536000, stale-while-revalidate=10",
        },
      ],
    });

    if (!isEmpty(data)) contentData = data;
  }

  return { pageData, contentData };
};
