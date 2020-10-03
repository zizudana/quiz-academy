import Link from "next/link"
import { signIn, useSession, getSession } from "next-auth/client"
import { useRouter } from "next/router"

const IndexPage = () => {
  const [session, loading] = useSession()

  if (typeof window !== "undefined" && loading) return null

  if (session) {
    if (typeof window !== "undefined") {
      const router = useRouter()
      router.push("/pdf")
    }
    return <></>
  } else {
    return (
      <>
        <body className="color-2 h-screen">
          <div className="container mx-auto mb-5">
            <div className="text-white h-auto px-6 pt-10 flex flex-col">
              <img src="/img/DCD_logo.png" alt="logo" className="w-32 mx-auto" />
              <span className="text-5xl mb-20 font-bold text-center">DCD On</span>

              <Link href="/auth/signin">
                <a className="mx-auto mb-20 bg-indigo-100 hover:bg-indigo-300 text-gray-800 font-bold text-2xl py-1 px-4 text-center rounded-full">
                  접속하기
                </a>
              </Link>
            </div>
          </div>
        </body>
      </>
    )
  }
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: { session },
  }
}

export default IndexPage
