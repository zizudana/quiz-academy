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

      <div className="my-8" />
      <div className="flex flex-col">
        <img src="/img/DCD_logo_full_white.png" alt="DCD_logo_full_white" className="w-full sm:w-4/5 lg:w-1/2 px-2 md:px-0 mx-auto" />

        <Link href="/guest/signin">
          <a className="mx-auto mb-8 bg-indigo-100 hover:bg-indigo-300 text-gray-800 font-bold text-xl px-4 py-1 text-center rounded-full">
            접속하기
          </a>
        </Link>

        <AwesomeSlider
          bullets={false}
          selected={0}
          className="w-full md:w-4/5 mx-auto"
          onFirstMount={() => {
            document.querySelector(".awssld").setAttribute("style", `--slider-height-percentage : ${60000 / 1140}%;`)
          }}
        >
          <div data-src="/img/banner_test_1.jpg" />
          <div data-src="/img/banner_test_2.jpg" />
          <div>3</div>
          <div>4</div>
        </AwesomeSlider>
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
