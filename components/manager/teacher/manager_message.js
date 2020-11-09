import { motion } from "framer-motion"
import { useState } from "react"
const axios = require("axios")

const ManagerMessage = ({ rest_api_url }) => {
  const [message_title, set_message_title] = useState("")
  const [message_content, set_message_content] = useState("")

  const on_change_message_title = (event) => {
    set_message_title(event.target.value)
  }

  const on_change_message_content = (event) => {
    set_message_content(event.target.value)
  }

  const save_message = () => {
    axios.post(`${rest_api_url}/managermessages`, { title: message_title, content: message_content, filepath: "/tmp/binasdf/" }).then((response) => {
      console.log(response)
    })
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

        {/* panel title */}
        <div className="mb-3 text-center">
          <span className="text-2xl text-gray-800">관리자 메세지</span>
        </div>

        {/* panel description */}
        <div className="mb-6 text-center">
          <span className="text-sm text-gray-600">
            문제가 발생했거나 개선이 필요한 부분의 스크린샷을 첨부해주시면 더 빠르게 도와드릴 수 있습니다.
          </span>
        </div>

        {/* 제목 */}
        <input
          className="w-full px-3 py-2 mb-3 text-gray-800 bg-gray-200 outline-none"
          type="text"
          placeholder="제목"
          value={message_title}
          onChange={on_change_message_title}
        />

        {/* 내용 */}
        <textarea
          className="w-full px-3 py-2 mb-3 text-gray-800 bg-gray-200 outline-none resize-none keep-all"
          rows="5"
          placeholder="내용"
          value={message_content}
          onChange={on_change_message_content}
        />

        {/* 스크린샷 첨부 */}
        <input type="file" multiple className="w-full px-4 py-2 mb-3 bg-indigo-300 text-gray-100 text-sm rounded focus:outline-none" />

        {/* save button */}
        <button
          className="w-full bg-indigo-600 hover:bg-indigo-300 text-white font-bold py-3 px-4 mb-12 rounded focus:outline-none"
          onClick={save_message}
        >
          보내기
        </button>
      </motion.div>
    </>
  )
}

export default ManagerMessage
