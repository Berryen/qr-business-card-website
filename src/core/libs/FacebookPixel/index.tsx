/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Script from "next/script";
import Router from "next/router";

export const FacebookPixel: React.FC<{ appId: string }> = ({ appId }) => {
  // ================== EFFECTS
  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(appId!);
        ReactPixel.pageView();
        Router.events.on("routeChangeComplete", () => ReactPixel.pageView());
      });
  }, []);

  // ================== VIEWS
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.facebook.com/tr?id=${appId}&ev=PageView&noscript=1`}
      />
      <Script strategy="lazyOnload" id="facebook-website">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${appId}');
          fbq('track', 'PageView');
        `}
      </Script>
    </>
  );
};

export default FacebookPixel;
