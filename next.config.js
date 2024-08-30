const withNextTranslate = require("next-translate");

/** @type {import("next").NextConfig} */
let nextConfig = {
  reactStrictMode: true,
  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, stale-while-revalidate",
          },
        ],
      },
    ];
  },
  images: {
    minimumCacheTTL: 50,
    loader: "default",
    domains: [
      "localhost",
      "127.0.0.1",
      "qrcontact-strapi.uat4ytlcement.com",
      "avatars0.githubusercontent.com",
      "scontent.cdninstagram.com",
      "i.ytimg.com",
      "picsum.photos",
      "ytlwebsitestorage.blob.core.windows.net",
      "stpwsstgjapaneast001.blob.core.windows.net",
      "stpwsprdjapaneast001.blob.core.windows.net",
      "stpwsstgjapaneast002.blob.core.windows.net",
      "stpwsstgjapaneast003.blob.core.windows.net",
      "cdn.ytlcement.com",
      "cdn.uat4ytlcement.com",
      "cdn-sg.uat4ytlcement.com",
      "cdn-vn.uat4ytlcement.com",
      "scontent.fkul15-1.fna.fbcdn.net",
      "aws-cdn-my.uat4ytlcement.com",
      "aws-cdn-sg.uat4ytlcement.com",
      "aws-cdn-vn.uat4ytlcement.com",
      "via.placeholder.com",
    ],
  },
  i18n: {
    locales: ["en", "bm", "vi"],
    defaultLocale: process.env.DEFAULT_LOCALE,
    localeDetection: false,
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    apiBaseUrl: process.env.NEXT_PUBLIC_STRAPI_ARI_URL, // Pass through env variables
  },
  publicRuntimeConfig: {
    apiBaseUrl: process.env.NEXT_PUBLIC_STRAPI_ARI_URL,
    facebookAppId: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID,
    gtagId: process.env.NEXT_PUBLIC_GTAG_ID,
    instagramApiKey: process.env.NEXT_PUBLIC_INSTAGRAM_API_KEY,
    youtubeApiKey: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
    serviceNowUsername: process.env.NEXT_PUBLIC_SERVICENOW_USERNAME,
    serviceNowPassword: process.env.NEXT_PUBLIC_SERVICENOW_PASSWORD,
    // azureApplicationInsight: process.env.NEXT_PUBLIC_APPLICATION_INSIGHTS,
    serviceNowChatUrl: process.env.NEXT_SERVICENOW_CHAT_URL,
    serviceNowUrl: process.env.NEXT_SERVICENOW_URL,
    cloudwatchGroupName: process.env.CLOUDWATCH_GROUP_NAME,
    cloudwatchStreamName: process.env.CLOUDWATCH_STREAM_NAME,
    cloudwatchAccessKey: process.env.CLOUDWATCH_ACCESS_KEY,
    cloudwatchSecretKey: process.env.CLOUDWATCH_SECRET_KEY,
    cloudwatchRegion: process.env.CLOUDWATCH_REGION,
  },
};

const plugins = [withNextTranslate];
/**
 * =================================
 * initialize plugins
 * =================================
 **/
module.exports = () => {
  for (const plugin of plugins) {
    nextConfig = {
      ...nextConfig,
      ...plugin(nextConfig),
    };
  }
  return nextConfig;
};
