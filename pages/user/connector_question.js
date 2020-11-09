import Layout from "../../components/layout/layout_user"
import React, { Component } from "react"
import Select from "react-select"

const options = [
  { value: "고등화학화1", label: "화1" },
  { value: "고등화학화2", label: "화2" },
  { value: "기타", label: "기타" },
]
const kinds = [
  { value: "모의고사", label: "모의고사" },
  { value: "교내시험", label: "교내시험" },
  { value: "강의교재", label: "강의교재" },
  { value: "기타", label: "기타" },
]

const ConnectorQuestionPage = () => {
  function onSubmit(event) {
    event.preventDefault()

    const body = new FormData()

    for (let index = 0; index <= files.length; index++) {
      const element = files[index]
      body.append("file", element)
    }

    fetch("/api/upload", {
      method: "POST",
      body,
    })
  }

  const QuestionSubmit = () => {
    var QuestionDict = {}

    QuestionDict["title"] = document.getElementById("question-title").value
    QuestionDict["content"] = document.getElementById("question-content").value

    var files = document.getElementById("question-file").files
    var file

    for (var i = 0; i < files.length; i++) {
      file = files[i]
      console.log(file.name)
    }
    QuestionDict["file"] = files

    console.log(QuestionDict)
  }

  return (
    <Layout>
      <div className="mx-auto mt-8 flex rounded-lg" style={{ width: "650px" }}>
        <div className="w-full keep-all">
          <div className="h-10" />
          <div className="mx-auto p-4 border shadow-lg rounded-lg mb-4">
            <div className="mb-3 flex items-center rounded-sm">
              <span className="mx-auto mt-3 text-2xl flex text-gray-800">오렌지 화학 김철수 선생님 질문방</span>
            </div>
            <div className="mb-3 flex items-center rounded-sm">
              <span className="mx-auto text-sm flex mb-3 text-gray-600">
                수업을 듣던 중 생긴, 또는 각자 문제풀이 중 생긴 질문 등을 보내주시면 답변해드립니다.
              </span>
            </div>
            <input className="w-full px-3 py-2 mb-3 text-gray-800 bg-gray-200 outline-none" type="text" id="question-title" placeholder="제목" />
            <textarea
              className="w-full px-3 py-2 mb-3 text-gray-800 bg-gray-200 outline-none resize-none"
              id="question-content"
              rows="5"
              placeholder="내용"
            />

            <form onSubmit={onSubmit}>
              <input
                type="file"
                id="question-file"
                multiple
                className="w-full bg-indigo-300 text-gray-100 font-bold py-3 px-4 rounded focus:outline-none mb-3"
              />
            </form>
            <div className="flex items-center">
              <Select isMulti placeholder="종류" options={options} id="kind-tag" className="w-full mr-2" />
              <Select isMulti placeholder="출제장소" options={kinds} id="place-tag" className="w-full" />
            </div>
            <div className="grid justify-items-end mt-3">
              <button
                id="qusetion-submit-btn"
                className="w-full bg-indigo-700 hover:bg-indigo-300 text-white font-bold py-3 px-4 mb-12 rounded focus:outline-none"
                type="submit"
                onClick={QuestionSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ConnectorQuestionPage
