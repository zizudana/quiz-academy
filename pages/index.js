import Layout from "../components/layout/layout_guest"

import Link from "next/link"
import { getSession } from "next-auth/client"
import AwesomeSlider from "react-awesome-slider"

const IndexPage = () => {
  return (
    <Layout>
      <style jsx global>{`
        body {
          background-color: #1e1651;
        }
      `}</style>

      <div className="h-auto px-6 pt-10 flex flex-col">
        <img src="/img/DCD_logo_full_white.png" alt="logo" className="md:w-2/3 w-full mx-auto" />

        <Link href="/guest/signin">
          <a className="mx-auto mb-20 bg-indigo-100 hover:bg-indigo-300 text-gray-800 font-bold text-2xl py-1 px-4 text-center rounded-full">
            접속하기
          </a>
        </Link>
      </div>
      <AwesomeSlider
        bullets={false}
        selected={0}
        onFirstMount={() => {
          document.querySelector(".awssld").setAttribute("style", `--slider-height-percentage:${60000 / 1140}%`)
        }}
      >
        <div data-src="/img/banner_test_1.jpg" />
        <div data-src="/img/banner_test_2.jpg" />
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
