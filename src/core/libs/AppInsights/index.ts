import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { ReactPlugin } from "@microsoft/applicationinsights-react-js";
import { aiConnectionString } from "config/constant";

const defaultBrowserHistory: any = {
  url: "/",
  location: { pathname: "" },
  listen: () => {}
};

let browserHistory = defaultBrowserHistory;
if (typeof window !== "undefined") {
  browserHistory = { ...browserHistory, ...window?.history };
  browserHistory.location.pathname = browserHistory?.state?.url;
}
export const reactPlugin = new ReactPlugin();
export const appInsights = new ApplicationInsights({
  config: {
    connectionString: aiConnectionString,
    extensionConfig: {
      extensions: [reactPlugin],
      [reactPlugin.identifier]: { history: browserHistory }
    }
  }
});

// server side
if (typeof window !== "undefined") {
  appInsights.loadAppInsights();
  appInsights.trackPageView();
}

export default appInsights;
