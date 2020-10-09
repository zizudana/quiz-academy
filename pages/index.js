import Link from "next/link"
import { getSession } from "next-auth/client"
import Layout from "../components/layout_guest"

const IndexPage = () => {
  return (
    <Layout>
      <style global jsx>{`
        body {
          background-color: #1e1651;
        }
      `}</style>
      <div className="text-white h-auto px-6 pt-10 flex flex-col">
        <img src="/img/DCD_logo.png" alt="logo" className="w-32 mx-auto" />
        <span className="text-5xl mb-20 font-bold text-center">DCD On</span>

        <Link href="/auth/signin">
          <a className="mx-auto mb-20 bg-indigo-100 hover:bg-indigo-300 text-gray-800 font-bold text-2xl py-1 px-4 text-center rounded-full">
            접속하기
          </a>
        </Link>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: { session },
  }
}

export default IndexPage
