import Layout from "../../components/layout/layout_user"
import PdfSVG from "../../components/svg/pdf"
import VideoSVG from "../../components/svg/video"
import QnaSVG from "../../components/svg/qna"

import Link from "next/link"

const UserIndexPage = () => {
  return (
    <Layout>
      <div className="mb-12 md:-mb-12" />
      <div
        className="md:flex md:justify-around items-center"
        style={{ height: "80vh" }}
      >
        {/* 문제 풀이 */}
        <div
          className="flex flex-col items-center rounded overflow-hidden shadow-custom border border-gray-300 p-4 mb-6 mx-auto text-center"
          style={{ width: "15rem", height: "fit-content" }}
        >
          <Link href="/user/quiz-set">
            <div className="cursor-pointer">
              <PdfSVG className="w-32 h-32 mx-auto mb-4" />
              <a className="font-bold text-lg mb-2">문제 풀이</a>
            </div>
          </Link>
        </div>

        {/* 동영상 강의 */}
        <div
          className="flex flex-col items-center rounded overflow-hidden shadow-custom border border-gray-300 p-4 mb-6 mx-auto text-center"
          style={{ width: "15rem", height: "fit-content" }}
        >
          <Link href="/user/video">
            <div className="cursor-pointer">
              <VideoSVG className="w-32 h-32 mx-auto mb-4" />
              <a className="font-bold text-lg mb-2">동영상 강의</a>
            </div>
          </Link>
        </div>

        {/* 질의응답 */}
        <div
          className="flex flex-col items-center rounded overflow-hidden shadow-custom border border-gray-300 p-4 mb-6 mx-auto text-center"
          style={{ width: "15rem", height: "fit-content" }}
        >
          <Link href="/user/connector">
            <div className="cursor-pointer">
              <QnaSVG className="w-32 h-32 mx-auto mb-4" />
              <a className="font-bold text-lg mb-2">질의응답</a>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default UserIndexPage
