import App from "next/app"
import Head from "next/head"
import { motion } from "framer-motion"
import Nav from "../components/nav"
import "../styles/index.css"

const MyApp = ({ Component, pageProps, router }) => {
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

        <motion.div
          key={router.route}
          initial="pageInitial"
          animate="pageAnimate"
          variants={{
            pageInitial: {
              opacity: 0,
            },
            pageAnimate: {
              opacity: 1,
            },
          }}
        >
          <Component {...pageProps} />
        </motion.div>

        {/* END : container */}
      </div>
    </>
  )
}

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)

  return { ...appProps }
}

export default MyApp
