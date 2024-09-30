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
