import Document, { Html, Head, Main, NextScript } from "next/document";
export default class CustomDeocument extends Document {
  render() {
    return (<Html lang="en">
      <Head></Head>
      <body className="antialiased">
        <Main />
      </body>

      <NextScript />

    </Html>
    )
  }
}

