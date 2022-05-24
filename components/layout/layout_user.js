import Nav from "./nav"

import Head from "next/head"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { useSession } from "next-auth/client"
import { useRouter } from "next/router"

const Layout = ({ children }) => {
  const [session, loading] = useSession()

  const router = useRouter()

  useEffect(() => {
    if (!session) {
      // guest 계정
      router.push("/guest/signin")
    } else if (session.user.email !== "student") {
      // student가 아닌 다른 계정
      router.push("/")
    }
  }, [session])

  if (loading) {
    return <main></main>
  }

  if (!session) {
    return <main></main>
  }

  // student 계정
  return (
    <>
      <Head>
        <title>위드 스터디</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav session={session} />

      <main className="container mx-auto mb-5 select-none">
        <motion.div
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
          {children}
        </motion.div>
      </main>
    </>
  )
}

export default Layout
