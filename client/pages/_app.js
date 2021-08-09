import '../styles/globals.css'
import Layout from "../components/layout"
import 'bootstrap/dist/css/bootstrap.css'
import Head from 'next/head'
import '../styles/slide.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>

  )
}

export default MyApp
