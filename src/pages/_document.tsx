import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.cdnfonts.com/css/sf-pro-display"
            rel="stylesheet"
            media="screen"
          />
          <link
            href="https://fonts.cdnfonts.com/css/sf-pro-display"
            rel="stylesheet"
            media="screen"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
