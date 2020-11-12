import Layout from "../../components/layout/layout_user"

import { useRouter } from "next/router"
import { useState } from "react"
const axios = require("axios")
// import Select from "react-select"

// const options = [
//   { value: "고등화학화1", label: "화1" },
//   { value: "고등화학화2", label: "화2" },
//   { value: "기타", label: "기타" },
// ]
// const kinds = [
//   { value: "모의고사", label: "모의고사" },
//   { value: "교내시험", label: "교내시험" },
//   { value: "강의교재", label: "강의교재" },
//   { value: "기타", label: "기타" },
// ]

const ConnectorQuestionPage = ({ rest_api_url }) => {
  const router = useRouter()
  let qna_student_id = router.query.qna_student_id

  const [message_title, set_message_title] = useState("") // 질문 제목
  const [message_content, set_message_content] = useState("") // 질문 내용

  const on_change_message_title = (event) => {
    set_message_title(event.target.value)
  }

  const on_change_message_content = (event) => {
    set_message_content(event.target.value)
  }

  const save_message = () => {
    if (message_title === "" || message_content === "") {
      alert("제목과 내용을 모두 작성해주세요.")
    } else {
      axios
        .post(`${rest_api_url}/qnaquerys`, { qnastudentid: qna_student_id, title: message_title, content: message_content })
        .then((response) => {
          // 관리자 메세지 제목, 내용 저장 성공

          console.log(response)

          var screenshot_array = document.querySelector("#screenshot-input").files

          // screenshot_array file post
          if (0 < screenshot_array.length) {
            // screenshot 저장 경로 : /files/qnaquerys/[관리자 메세지 ObjectID]
            let filepath = `qnaquerys/${response.data.InsertedID}/`

            // path 마지막은 slash(/)로 통일
            if (filepath.slice(-1) !== "/") {
              filepath += "/"
            }

            // 파일 전송을 그대로 하기 위해 formData 사용
            var formData = new FormData()
            formData.append("filepath", filepath)
            Array.from(screenshot_array).forEach((file) => {
              formData.append("files", file)
            })

            // content-type 설정으로 file 전송 가능
            axios
              .post(`${rest_api_url}/qnaquerys/files`, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((response) => {
                console.log(response)
              })
          }
        })
        .catch((error) => {
          alert(error)
        })

      // 관리자 메세지 저장 후 제목과 내용 초기화
      set_message_title("")
      set_message_content("")
    }
  }

  // function onSubmit(event) {
  //   event.preventDefault()

  //   const body = new FormData()

  //   for (let index = 0; index <= files.length; index++) {
  //     const element = files[index]
  //     body.append("file", element)
  //   }

  //   fetch("/api/upload", {
  //     method: "POST",
  //     body,
  //   })
  // }

  // const QuestionSubmit = () => {
  //   var QuestionDict = {}

  //   QuestionDict["title"] = document.getElementById("question-title").value
  //   QuestionDict["content"] = document.getElementById("question-content").value

  //   var files = document.getElementById("question-file").files
  //   var file

  //   for (var i = 0; i < files.length; i++) {
  //     file = files[i]
  //     console.log(file.name)
  //   }
  //   QuestionDict["file"] = files

  //   console.log(QuestionDict)
  // }

  return (
    <Layout>
      <div className="mx-auto mt-8 p-4 border shadow-lg rounded-lg" style={{ width: "650px" }}>
        {/* 상단 여백 */}
        <div className="py-3" />

        {/* panel title */}
        <div className="mb-3 text-center">
          <span className="text-2xl text-gray-800">질문방</span>
        </div>

        {/* panel description */}
        <div className="mb-6 text-center">
          <span className="text-sm text-gray-600">수업을 듣던 중 생긴, 또는 각자 문제풀이 중 생긴 질문 등을 보내주시면 답변해드립니다.</span>
        </div>

        {/* 질문 제목 */}
        <input
          className="w-full px-3 py-2 mb-3 text-gray-800 bg-gray-200 outline-none"
          type="text"
          placeholder="제목"
          value={message_title}
          onChange={on_change_message_title}
        />

        {/* 질문 내용 */}
        <textarea
          className="w-full px-3 py-2 mb-3 text-gray-800 bg-gray-200 outline-none resize-none keep-all"
          rows="5"
          placeholder="내용"
          value={message_content}
          onChange={on_change_message_content}
        />

        {/* 스크린샷 첨부 */}
        <input
          id="screenshot-input"
          type="file"
          multiple
          accept=".jpg,.jpeg,.gif,.png"
          className="w-full px-4 py-2 mb-3 bg-indigo-300 text-gray-100 text-sm rounded focus:outline-none"
        />

        {/* 질문 tag */}
        {/* <div className="flex items-center mb-3">
          <Select isMulti placeholder="종류" options={options} id="kind-tag" className="w-full mr-2" />
          <Select isMulti placeholder="출제장소" options={kinds} id="place-tag" className="w-full" />
        </div> */}

        {/* save button */}
        <button
          className="w-full bg-indigo-600 hover:bg-indigo-300 text-white font-bold py-3 px-4 mb-12 rounded focus:outline-none"
          onClick={save_message}
        >
          보내기
        </button>
      </div>
    </Layout>
  )
}

const getServerSideProps = () => {
  const rest_api_url = process.env.REST_API_URL

  return { props: { rest_api_url } }
}

export { getServerSideProps }

export default ConnectorQuestionPage
