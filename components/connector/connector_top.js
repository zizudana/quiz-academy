import Link from "next/link"
import { useState } from "react"
import LockedSVG from "../svg/lock"
import UnlockedSVG from "../svg/unlock"

const ConnectorTop = () => {
  const [is_open, set_is_open] = useState(false)

  const toggle_is_open = () => {
    if (is_open) {
      set_is_open(false)
    } else {
      set_is_open(true)
    }
  }

  // default state : closed
  let card_opacity = "0.6"
  let message_color = "text-red-600"
  let message_content = "Closed"

  // changed state : open
  if (is_open) {
    card_opacity = "1.0"
    message_color = "text-green-600"
    message_content = "Open"
  }

  const LockSVG = () => {
    if (is_open) {
      return <UnlockedSVG className="fill-current w-4 h-4 mr-2" />
    }
    return <LockedSVG className="fill-current w-4 h-4 mr-2" />
  }

  return (
    <>
      {/* Horizontal Card */}
      <div className="mx-auto mt-8 flex shadow-lg rounded-lg" style={{ width: "650px", opacity: card_opacity, height: "18rem" }}>
        {/* 왼쪽 사진 */}
        <div
          className="border border-r-0 border-gray-400 h-auto flex-none bg-cover bg-no-repeat bg-center rounded-l-lg overflow-hidden"
          style={{ width: "12rem", backgroundImage: 'url("/img/card_image_test_1.jpg")' }}
          title="실시간 질의응답 썸네일"
          onClick={toggle_is_open}
        />

        {/* 오른쪽 패널 */}
        <div className="w-full border border-l-0 border-gray-400 rounded-r-lg pl-8 flex items-center">
          <div className="flex flex-col justify-between leading-normal">
            <p className={`${message_color} flex items-center mb-3`}>
              <LockSVG />
              {message_content}
            </p>
            <Link href="https://us02web.zoom.us/j/5015530171?pwd=aDg2MFZEdzU4YnNYYjVHazBGd1BBUT09">
              <a className="text-gray-900 font-bold text-xl hover:text-green-600">{"오렌지 화학 Q&A"}</a>
            </Link>
            <p className="text-gray-900 mb-2">김철수 선생님</p>
            <p className="text-gray-700 text-base mb-2">내용 미정</p>
            <p className="text-gray-700 text-base">매주 금요일 PM 09 : 00 ~ PM 10 : 30</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConnectorTop
