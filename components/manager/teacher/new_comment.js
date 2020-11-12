import { useState } from "react"
const axios = require("axios")

const NewComment = ({ qna_student_id, rest_api_url, set_is_new_comment }) => {
  const [message_content, set_message_content] = useState("") // 관리자 메세지 내용

  const on_change_message_content = (event) => {
    set_message_content(event.target.value)
  }

  const save_message = () => {
    if (message_content === "") {
      alert("내용을 작성해주세요.")
    } else {
      axios
        .post(`${rest_api_url}/qnacomments`, { qnastudentid: qna_student_id, content: message_content })
        .then((response) => {
          // 코멘트 저장 성공
          console.log(response)
        })
        .catch((error) => {
          alert(error)
        })

      // 코멘트 저장 후 제목과 내용 초기화
      set_message_content("")
      set_is_new_comment(false)
    }
  }

  return (
    <>
      <div>
        {/* 내용 */}
        <textarea
          className="w-full px-3 py-2 mb-3 text-gray-800 bg-gray-200 outline-none resize-none keep-all"
          rows="3"
          placeholder="내용"
          value={message_content}
          onChange={on_change_message_content}
        />

        {/* save button */}
        <button
          className="w-full bg-indigo-600 hover:bg-indigo-300 text-white font-bold py-3 px-4 mb-12 rounded focus:outline-none"
          onClick={save_message}
        >
          보내기
        </button>
      </div>
    </>
  )
}

export default NewComment
