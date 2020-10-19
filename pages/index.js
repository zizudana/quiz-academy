import Link from "next/link"
import { getSession } from "next-auth/client"
import Layout from "../components/layout_guest"
import AwesomeSlider from "react-awesome-slider"

const IndexPage = () => {
  return (
    <Layout>
      <style jsx global>{`
        body {
          background-color: #1e1651;
        }
      `}</style>

      <div className="text-white h-auto px-6 pt-10 flex flex-col">
        <img src="/img/DCD_logo.png" alt="logo" className="w-32 mx-auto" />
        <span className="text-5xl mb-1 font-bold text-center">DCD On</span>
        <span className="text-sm tracking-widest mb-20 font-bold text-center">대ㅤ치ㅤ동ㅤ온ㅤ라ㅤ인</span>

        <Link href="/auth/signin">
          <a className="mx-auto mb-20 bg-indigo-100 hover:bg-indigo-300 text-gray-800 font-bold text-2xl py-1 px-4 text-center rounded-full">
            접속하기
          </a>
        </Link>
      </div>
      <AwesomeSlider bullets={false} selected={1}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </AwesomeSlider>
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
