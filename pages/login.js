import Head from "next/head"
import { motion } from "framer-motion"
import React from "react"
import { signIn, signOut, useSession } from "next-auth/client"

const TestPage = () => {
  const [session, loading] = useSession()

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
          {!session && (
            <>
              Not signed in <br />
              <button onClick={signIn}>Sign in</button>
            </>
          )}
          {session && (
            <>
              Signed in as {session.user.name} <br />
              <button onClick={signOut}>Sign out</button>
            </>
          )}
        </motion.div>
      </main>
    </>
  )
}

export default TestPage
