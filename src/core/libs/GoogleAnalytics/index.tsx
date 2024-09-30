import React from "react";
import Script from "next/script";

export const GoogleAnalytics: React.FC<{ appId: string }> = ({ appId }) => {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${appId}`}
      />
      <Script strategy="lazyOnload" id="gtag-website">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          gtag('config', "${appId}");
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
