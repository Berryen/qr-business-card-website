import getConfig from "next/config";
const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

// ================== URL
const apiBaseUrl = publicRuntimeConfig.apiBaseUrl;
const absoluteUrl = "http://localhost:1337";

// API ENDPOINT
export const API_ENDPOINT = apiBaseUrl || absoluteUrl;

// SERVER API ENDPOINT
export const SERVER_API_ENDPOINT =
  serverRuntimeConfig.apiBaseUrl || "http://127.0.0.1:1337";

// ================== SERVICE
// Facebook App ID
export const facebookAppId = publicRuntimeConfig.facebookAppId || "FB_APP_ID";

// Google Map key
export const googleMapKey =
  publicRuntimeConfig.googleMapKey || "GOOGLE_MAP_KEY";

// Google Analytics Tracking ID
export const gaTrackingId = publicRuntimeConfig.gtagId || "GA_TRACKING_ID";

// Instragram API Key
export const instagramApiKey = publicRuntimeConfig.instagramApiKey || "";

// Youtube API Key
export const youtubeApiKey = publicRuntimeConfig.youtubeApiKey || "";

// AZURE APPLICATION INSIGHT
export const aiConnectionString =
  publicRuntimeConfig.azureApplicationInsight || "";

// ================== INTEGRATION
// SERVICE NOW
export const serviceNowUsername = publicRuntimeConfig.serviceNowUsername || "";
export const serviceNowPassword = publicRuntimeConfig.serviceNowPassword || "";
export const serviceNowChatUrl = publicRuntimeConfig.serviceNowChatUrl || "";
export const serviceNowUrl = publicRuntimeConfig.serviceNowUrl || "";

// ================== MISCELLANEOUS
// default icon url

// ================== MISCELLANEOUS
export const cloudwatchGroupName = publicRuntimeConfig.cloudwatchGroupName;
export const cloudwatchStreamName = publicRuntimeConfig.cloudwatchStreamName;
export const cloudwatchAccessKey = publicRuntimeConfig.cloudwatchAccessKey;
export const cloudwatchSecretKey = publicRuntimeConfig.cloudwatchSecretKey;
export const cloudwatchRegion = publicRuntimeConfig.cloudwatchRegion;
