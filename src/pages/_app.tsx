import Link  from 'next/link';
import { AppProps }  from 'next/app';
import { PageConfig } from 'next/types';
import Head from 'next/head';
import "../styles.css";

export const config: PageConfig = {
  unstable_runtimeJS: false,
}

function MyApp({ Component, pageProps }: AppProps) {
  return ( 
    <>
      <header className="header">
      </header>

      <main className="content-container">
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default MyApp
