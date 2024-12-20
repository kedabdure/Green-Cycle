import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
         <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <body style={{ overflowX: 'hidden'}}>
        <Main />
        <NextScript />
        <script defer src="https://app.fastbots.ai/embed.js" data-bot-id="cm3q7vl460i4osvbmkvrnzbj5"></script>
      </body>
    </Html>
  );
}
