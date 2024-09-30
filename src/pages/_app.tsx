import "../styles/globals.css";
import type { AppProps } from "next/app";
import Meta from "components/Meta";
import {
  withStrapiDataServerSideProps,
  StrapiDataProvider,
} from "core/context";
import { fetchStrapiAPI } from "helpers/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { gaTrackingId } from "config/constant";
import { GoogleAnalytics } from "core/libs";

async function fetchGlobalData(locale: string) {
  // Fetch global data from /global
  const globalData = await fetchStrapiAPI("/global", {
    populate: "deep",
    locale: locale,
  });

  return globalData.data;
}

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [globalData, setGlobalData] = useState(null);

  useEffect(() => {
    const fetchGlobal = async () => {
      const data = await fetchGlobalData(router.locale || "en");
      setGlobalData(data);
    };

    fetchGlobal();
  }, [router.locale]);

  // ================== VIEWS
  return (
    <StrapiDataProvider global={globalData} {...pageProps}>
      <GoogleAnalytics appId={gaTrackingId} />
      <Component {...pageProps} />
    </StrapiDataProvider>
  );
}

export default App;
