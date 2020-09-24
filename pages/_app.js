import Head from "next/head"
import Nav from "../components/nav"
import "../styles/index.css"

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>대치동 온라인</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto px-5 mb-5">
        {/* START : container */}

        {/* Navigation Bar */}
        <Nav />

        <Component {...pageProps} />

        {/* END : container */}
      </div>
    </>
  )
}

export default MyApp
