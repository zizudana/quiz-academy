import Layout from "../../components/layout/layout_user"

import Link from "next/link"

const UserIndexPage = () => {
  const elements = [1, 2, 3]

  return (
    <Layout>
      {/* <div className="my-40" /> */}
      <div className="lg:flex lg:justify-around items-center" style={{ height: "80vh" }}>
        {/* 문제 풀이 */}
        <div
          className="flex flex-col items-center rounded overflow-hidden shadow-custom border border-gray-300 p-4 mb-6 mx-auto text-center"
          style={{ width: "18rem", height: "fit-content" }}
        >
          <Link href="/user/pdf">
            <div className="cursor-pointer">
              <svg className="w-32 h-32 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <g>
                  <path d="M78 10H22c-1.1 0-2 .9-2 2v76c0 1.1.9 2 2 2h56c1.1 0 2-.9 2-2V12c0-1.1-.9-2-2-2zm-2 76H24V72h8.3c.8 2.3 3 4 5.7 4 3.3 0 6-2.7 6-6s-2.7-6-6-6c-2.6 0-4.8 1.7-5.7 4H24V52h8.3c.8 2.3 3 4 5.7 4 3.3 0 6-2.7 6-6s-2.7-6-6-6c-2.6 0-4.8 1.7-5.7 4H24V32h8.3c.8 2.3 3 4 5.7 4 3.3 0 6-2.7 6-6s-2.7-6-6-6c-2.6 0-4.8 1.7-5.7 4H24V14h52v72zM36 70c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm0-20c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm0-20c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z" />
                </g>
                <g>
                  <path fill="#00F" d="M384-930V754h-1784V-930H384m8-8h-1800V762H392V-938z" id="BORDER" />
                </g>
              </svg>
              <a className="font-bold text-lg mb-2">문제 풀이</a>
            </div>
          </Link>
        </div>
        {/* 동영상 강의 */}
        <div
          className="flex flex-col items-center rounded overflow-hidden shadow-custom border border-gray-300 p-4 mb-6 mx-auto text-center"
          style={{ width: "18rem", height: "fit-content" }}
        >
          <Link href="/user/video">
            <div className="cursor-pointer">
              <svg className="w-32 h-32 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <g
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                >
                  <path d="M14.862 4.463c-.407-.702-.848-.831-1.747-.88-.898-.059-3.157-.083-5.113-.083-1.96 0-4.22.024-5.117.083-.897.05-1.339.178-1.75.88C.716 5.165.5 6.372.5 8.498v.008c0 2.117.216 3.333.635 4.026.41.701.852.829 1.75.888.897.05 3.156.08 5.117.08 1.956 0 4.215-.03 5.114-.08.899-.059 1.34-.187 1.747-.888.424-.694.638-1.91.638-4.026v-.005-.003c-.001-2.126-.214-3.333-.639-4.035z" />
                  <path d="M6.5 11V6l4 2.5z" />
                </g>
              </svg>
              <a className="font-bold text-lg mb-2">동영상 강의</a>
            </div>
          </Link>
        </div>
        {/* 질의응답 */}
        <div
          className="flex flex-col items-center rounded overflow-hidden shadow-custom border border-gray-300 p-4 mb-6 mx-auto text-center"
          style={{ width: "18rem", height: "fit-content" }}
        >
          <Link href="/user/connector">
            <div className="cursor-pointer">
              <svg className="w-32 h-32 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M14.55,12.22a4.92,4.92,0,0,0,1.7-3.72,5,5,0,0,0-10,0A4.92,4.92,0,0,0,8,12.22a8,8,0,0,0-4.7,7.28,1,1,0,0,0,2,0,6,6,0,0,1,12,0,1,1,0,0,0,2,0A8,8,0,0,0,14.55,12.22Zm-3.3-.72a3,3,0,1,1,3-3A3,3,0,0,1,11.25,11.5Zm8.5-5a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0v-2A1,1,0,0,0,19.75,6.5ZM19,11.79a1.05,1.05,0,0,0-.29.71,1,1,0,0,0,.29.71,1.15,1.15,0,0,0,.33.21.94.94,0,0,0,.76,0,.9.9,0,0,0,.54-.54.84.84,0,0,0,.08-.38A1,1,0,0,0,19,11.79Z" />
              </svg>
              <a className="font-bold text-lg mb-2">질의응답</a>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default UserIndexPage
