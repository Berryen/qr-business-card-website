import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { detectParams, urlChecker } from "helpers";
import { initiateStrapiAPI } from "helpers/api";
import { fetchStrapiAPI } from "helpers/api";
import { StrapiData } from "./@types";
import { localeTranslation } from "helpers/locale";

// custom getServerSideProps function
export const withStrapiDataServerSideProps = (
  callback?: (data: StrapiData) => GetServerSideProps
): GetServerSideProps => {
  const getServerSideProps: GetServerSideProps = async (
    ctx: GetServerSidePropsContext
  ) => {
    let results: any = {};
    const { res, params, locale } = ctx;

    // fetch global site settings from Strapi
    const globalConfig = await fetchStrapiAPI("/global", {
      populate: "deep",
      locale: localeTranslation(locale),
    });
    // fetch pages info
    const url = detectParams(params?.page);
    const filters = { url: { $eq: "/" + url } };
    const { data: pageUrl } = await fetchStrapiAPI(`/page-names`, {
      populate: "deep",
      locale: localeTranslation(locale),
      filters,
    });

    const statusCode = res?.statusCode;
    const pageAttr = pageUrl?.[0]?.attributes;

    const {
      pageTitle,
      singleTypeApi,
      collectionTypeApi,
      singleTypeApiOptions,
      collectionTypeApiOptions,
    } = urlChecker(pageUrl, params);

    // fetch page & content data
    const { pageData, contentData } = await initiateStrapiAPI({
      singleTypeApi,
      collectionTypeApi,
      singleTypeApiOptions,
      collectionTypeApiOptions,
      pageTitle,
      locale,
      params,
    });

    const global = globalConfig?.data;
    const customComponent = pageAttr?.customComponentName ?? null;
    const dataContext: StrapiData = {
      global,
      pageData,
      contentData,
      customComponent,
      currentPage: params?.page ?? null,
    };

    // callback method
    if (callback) {
      results = await callback(dataContext)(ctx);
    }

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=31536000, stale-while-revalidate=10"
    );

    return {
      props: {
        ...dataContext,
        ...results,
        statusCode,
      },
    };
  };
  return getServerSideProps;
};

export default withStrapiDataServerSideProps;
