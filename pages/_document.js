import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document () {
  return (
    <Html>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="../public/icon-192x192.png"></link>
        <meta name="theme-color" content="#fff" />
        {/* eslint-disable-next-line */}
        {/*<title>Rz Group</title>*/}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
