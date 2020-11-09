import Nav from "./nav"

import Head from "next/head"
import { motion } from "framer-motion"
import { useSession } from "next-auth/client"
import { useRouter } from "next/router"

const Layout = ({ children }) => {
  const [session, loading] = useSession()

  if (loading) {
    return null
  }

  // session 있으면
  if (session) {
    const router = useRouter()
    if (typeof window !== "undefined") {
      const user_type = session.user.email

      if (user_type == "manager") {
        // 관리자 계정
        router.push("/manager")
        return null
      } else if (user_type == "teacher") {
        // 교사 계정
        router.push("/manager/teacher")
        return null
      } else {
        // 학생 계정
        router.push("/user")
        return <Nav />
      }
    }
  } else {
    return (
      <>
        <Head>
          <title>대치동 온라인</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="container mx-auto mb-5">
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
}

export default Layout
