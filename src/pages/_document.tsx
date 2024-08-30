import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@200;300;400;600;700&display=swap"
            rel="stylesheet"
            media="screen"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Exo+2:wght@200;300;400;600;700&display=swap"
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
