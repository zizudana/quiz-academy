import Comment from "./comment"
import QuestionHistory from "./question_history"

import { useState, useEffect } from "react"
const axios = require("axios")

const ConnectorBottom = ({ qna_student_id, rest_api_url, refresh }) => {
  const [qna_query_list, set_qna_query_list] = useState([]) // 상시 질문 목록
  const [qna_comment_list, set_qna_comment_list] = useState([]) // 코멘트 목록

  useEffect(() => {
    let tmp_qna_query_list = []
    let tmp_qna_comment_list = []

    // 상시 질문 목록 불러오기
    axios
      .get(`${rest_api_url}/qnaquerys/all/qnastudentid/${qna_student_id}`)
      .then(function (response) {
        // handle success

        /**
         * @param {Object} qna_query_object
         * * @param {String} qnastudentid (부모) 질의응답+학생 ID
         * * @param {String} title 제목
         * * @param {String} content 내용
         * * @param {int64} timestamp 작성시간
         * * @param {String} ischecked 확인 여부
         */
        tmp_qna_query_list = response.data
        tmp_qna_query_list.sort((a, b) => b.timestamp - a.timestamp)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })

    // 코멘트 목록 불러오기
    axios
      .get(`${rest_api_url}/qnacomments/all/qnastudentid/${qna_student_id}`)
      .then(function (response) {
        // handle success

        /**
         * @param {Object} qna_comment_object
         * * @param {String} qnastudentid (부모) 질의응답+학생 ID
         * * @param {String} title 제목
         * * @param {String} content 내용
         * * @param {int64} timestamp 작성시간
         */
        tmp_qna_comment_list = response.data
        tmp_qna_comment_list.sort((a, b) => b.timestamp - a.timestamp)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })

    setTimeout(() => {
      set_qna_query_list(tmp_qna_query_list)
      set_qna_comment_list(tmp_qna_comment_list)
    }, 500)
  }, [])

  return (
    <>
      <div className="hidden">{refresh}</div>
      <div className="mx-auto mt-8 flex rounded-lg" style={{ width: "650px" }}>
        <div className="w-full keep-all">
          <Comment qna_comment_list={qna_comment_list} />
          <QuestionHistory qna_query_list={qna_query_list} />
        </div>
      </div>
    </>
  )
}

export default ConnectorBottom
