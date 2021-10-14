import Link from "next/link"

import Layout from "../../components/layout/layout_guest"
import { ButtonNormal } from "../../components/common/button"

const IndexPage = () => {
  return (
    <Layout>
      <div className="flex justify-center content-center flex-wrap min-h-screen select-none">
        <div
          className="flex flex-col px-10 py-12 bg-white shadow-md"
          style={{ width: "400px", height: "fit-content" }}
        >
          {/* 로고 */}
          <img
            src="/img/dco_vertical.png"
            className="mx-auto mb-8"
            style={{ width: "10rem" }}
            alt="dco logo"
          />

          <div className="w-full text-center">
            <div className="mb-4">죄송합니다. 미완성 기능입니다.</div>
            <Link href="/guest/signin">
              <div>
                <ButtonNormal className="px-4 py-2">돌아가기</ButtonNormal>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
