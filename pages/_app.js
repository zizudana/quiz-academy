import App from "next/app"
import { Provider } from "next-auth/client"
import "../styles/index.css"
import "react-awesome-slider/dist/styles.css"

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Provider
        session={pageProps.session}
        options={{
          clientMaxAge: 60, // Re-fetch session if cache is older than 60 seconds
          keepAlive: 5 * 60, // Send keepAlive message every 5 minutes
        }}
      >
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)

  return { ...appProps }
}

export default MyApp
