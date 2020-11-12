import LockedSVG from "../svg/lock"
import UnlockedSVG from "../svg/unlock"

import Link from "next/link"

const QnaPanel = ({ qna_object }) => {
  // default state : closed
  let card_opacity = "0.6"
  let message_color = "text-red-600"
  let message_content = "Closed"
  let pointer_events = "none"

  // changed state : open
  if (qna_object.isopen === "true") {
    card_opacity = "1.0"
    message_color = "text-green-600"
    message_content = "Open"
    pointer_events = ""
  }

  const LockSVG = () => {
    if (qna_object.isopen === "true") {
      return <UnlockedSVG className="fill-current w-4 h-4 mr-2" />
    }
    return <LockedSVG className="fill-current w-4 h-4 mr-2" />
  }
  return (
    <>
      {/* Horizontal Card */}
      <div
        className="mx-auto mt-8 flex shadow-lg rounded-lg"
        style={{ width: "650px", opacity: card_opacity, height: "18rem", pointerEvents: pointer_events }}
      >
        {/* 왼쪽 사진 */}
        <div
          className="border border-r-0 border-gray-400 h-auto flex-none bg-cover bg-no-repeat bg-center rounded-l-lg overflow-hidden"
          style={{ width: "12rem", backgroundImage: 'url("/img/card_image_test_1.jpg")' }}
          title="실시간 질의응답 썸네일"
        />

        {/* 오른쪽 패널 */}
        <div className="w-full border border-l-0 border-gray-400 rounded-r-lg pl-8 flex items-center">
          <div className="flex flex-col justify-between leading-normal">
            <p className={`${message_color} flex items-center mb-3`}>
              <LockSVG />
              {message_content}
            </p>
            <Link href={qna_object.zoomlink}>
              <a className="text-gray-900 font-bold text-xl hover:text-green-600">{qna_object.title.replaceAll("_", " ")}</a>
            </Link>
            <p className="text-gray-900 mb-2">{`${qna_object.teachername} 선생님`}</p>
            <p className="text-gray-700 text-base mb-2">{qna_object.content}</p>
            <p className="text-gray-700 text-base">{qna_object.operatingtime}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default QnaPanel
