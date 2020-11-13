import { motion } from "framer-motion"
import { useState } from "react"

const TeacherMessage = () => {
  const [current_message, set_current_message] = useState(-1) // 새로고침

  const toggle_message_panel = (message_number) => {
    if (message_number === current_message) {
      set_current_message(-1)
    } else {
      set_current_message(message_number)
    }
  }

  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
      >
        {/* 상단 여백 */}
        <div className="py-3" />
        <div className=" border-t-2 border-b-2 border-gray-300 rounded-b text-gray-700 px-4 py-3 mb-3 text-center" role="alert">
          교사 메세지 목록
        </div>

        {/* Navbar */}
        <div className="py-4 block">
          <div className="block text-gray-700 border-t-2 border-b-2 bg-white px-4 py-2">
            <div className="inline-block w-full mr-1 ">
              <div className="inline-block w-1/6 ">이름</div>
              <div className="inline-block w-1/6 ">담당과목</div>
              <div className="inline-block w-1/2">제목</div>
              <div className="inline-block w-1/6 text-right">일시</div>
            </div>
          </div>

          {/* 내용 부분 */}

          {/* 제목 1 */}
          <div className="block text-gray-700 border-b-2 bg-white px-4 py-2 hover:bg-gray-300 cursor-pointer" onClick={() => toggle_message_panel(0)}>
            <div className="inline-block w-full mr-1 ">
              <div className="inline-block w-1/6 text-indigo-700">김철수t</div>
              <div className="inline-block w-1/6">화학</div>
              <div className="inline-block w-1/2">10월 정산자료 확인 부탁드립니다.</div>
              <div className="inline-block w-1/6 text-right">10월 26일</div>
            </div>
          </div>
          {/* 본문 1 */}
          {current_message === 0 && (
            <div className="block text-gray-700 border-b-2 bg-gray-200 px-4 py-2">
              <div className="inline-block border-2 border-gray-400 w-full px-2 py-2">
                <div className="mb-2">
                  여기는 내용이 들어가는 자리입니다. 돈을 정산해 보냈으니 하여튼 월급달라는 그런 이야기입니다. 로렝입슘어쩌구.
                </div>
                <div>
                  <img
                    src="/img/DCD_logo_full.png"
                    alt="logo"
                    className="w-64 mx-auto cursor-pointer transition duration-500 ease-in-out transform scale-90"
                  />
                </div>
              </div>
            </div>
          )}
          {/* 제목 2 */}
          <div className="block text-gray-700 border-b-2 bg-white px-4 py-2 hover:bg-gray-300 cursor-pointer" onClick={() => toggle_message_panel(1)}>
            <div className="inline-block w-full mr-1 ">
              <div className="inline-block w-1/6 text-indigo-700">이종석t</div>
              <div className="inline-block w-1/6">수학</div>
              <div className="inline-block w-1/2">환불 요청을 받았습니다.</div>
              <div className="inline-block w-1/6 text-right">10월 24일</div>
            </div>
          </div>
          {/* 본문 2 */}
          {current_message === 1 && (
            <div className="block text-gray-700 border-b-2 bg-gray-200 px-4 py-2">
              <div className="inline-block border-2 border-gray-400 w-full px-2 py-2">
                <div className="mb-2">
                  여기는 내용이 들어가는 자리입니다. 돈을 정산해 보냈으니 하여튼 월급달라는 그런 이야기입니다. 로렝입슘어쩌구.
                </div>
                <div>
                  <img
                    src="https://api.web-academy.ml/static/qnaquerys/5fae1c35283828196ec33422/zoom_icon.png"
                    alt="logo"
                    className="w-64 mx-auto cursor-pointer transition duration-500 ease-in-out transform scale-90"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  )
}

export default TeacherMessage
