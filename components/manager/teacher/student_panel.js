import XSVG from "../../svg/x"
import CheckSVG from "../../svg/check"
import RefreshSVG from "../../svg/refresh"
import NewComment from "./new_comment"

import Link from "next/link"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
const axios = require("axios")

/**
 * @param {Object} qnastudent_object
 * * @param {String} _id (본인) 질의응답+학생 ID
 * * @param {String} qnaid (부모) 질의응답 ID
 * * @param {String} studentid (부모) 학생 ID
 * * @param {String} studentname 학생 이름
 * * @param {Array} qnaquerylist 상시 질문 목록
 * * @param {Array} qnacommentlist 코멘트 목록
 */
const StudentPanel = ({ qnastudent_object, rest_api_url }) => {
  const router = useRouter()
  let current_panel = router.query.panel

  const [refresh, set_refresh] = useState(0) // 새로고침
  const [qnaquery_unchecked_list, set_qnaquery_unchecked_list] = useState([]) // 미확인 질문 목록
  const [qnaquery_checked_list, set_qnaquery_checked_list] = useState([]) // 확인 질문 목록
  const [qnacomment_list, set_qnacomment_list] = useState([]) // 코멘트 목록
  const [is_new_comment, set_is_new_comment] = useState(false) // 새로운 코멘트 작성 여부

  const toggle_is_new_comment = () => {
    is_new_comment ? set_is_new_comment(false) : set_is_new_comment(true)
  }

  useEffect(() => {
    let tmp_qnaquery_unchecked_list = []
    let tmp_qnaquery_checked_list = []
    let tmp_qnacomment_list = []

    qnastudent_object.qnaquerylist.forEach((qnaquery_id) => {
      axios
        .get(`${rest_api_url}/qnaquerys/${qnaquery_id}`)
        .then(function (response) {
          // handle success
          const qnaquery_object = response.data

          if (qnaquery_object) {
            if (qnaquery_object.ischecked === "true") {
              tmp_qnaquery_checked_list.push(qnaquery_object)
            } else if (qnaquery_object.ischecked === "false") {
              tmp_qnaquery_unchecked_list.push(qnaquery_object)
            }
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    })

    qnastudent_object.qnacommentlist.forEach((qnacomment_id) => {
      axios
        .get(`${rest_api_url}/qnacomments/${qnacomment_id}`)
        .then(function (response) {
          // handle success
          const qnacomment_object = response.data

          tmp_qnacomment_list.push(qnacomment_object)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    })

    setTimeout(() => {
      // 코멘트 목록을 timestamp 기준으로 정렬
      tmp_qnacomment_list.sort((a, b) => a.timestamp - b.timestamp)

      set_qnaquery_checked_list(tmp_qnaquery_checked_list)
      set_qnaquery_unchecked_list(tmp_qnaquery_unchecked_list)
      set_qnacomment_list(tmp_qnacomment_list)
    }, 500)
  }, [refresh])

  const save_qnaquery_check = (qnaquery_title) => {
    axios.put(`${rest_api_url}/qnaquerys`, { title: qnaquery_title, ischecked: "true" }).then((response) => {
      console.log(response)
    })
    setTimeout(() => {
      set_refresh(refresh + 1)
    }, 500)
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
        <div className="flex flex-row-reverse gap-2">
          {/* 나가기 */}
          <Link href={`/manager/teacher?panel=${current_panel}`}>
            <button className="w-6 h-6 border border-red-500 rounded-full p-1 outline-none">
              <XSVG />
            </button>
          </Link>

          {/* 새로고침 */}
          <button className="w-6 h-6 border border-green-500 rounded-full p-1 outline-none" onClick={() => set_refresh(refresh + 1)}>
            <RefreshSVG fill="#48bb78" />
          </button>
        </div>

        <div className="text-center text-xl mb-4">{qnastudent_object.studentname}</div>

        {/*  질문 */}
        <div className="text-center text-lg mb-4">질문</div>
        <div className="flex-col space-y-4 max-w-md mx-auto">
          {/* 미확인 질문 목록 */}
          {qnaquery_unchecked_list.map((qnaquery_object, index) => {
            return (
              <div key={index} className="bg-gray-100 rounded p-4">
                <div className="md:flex md:justify-between items-center mb-1">
                  <div className="flex items-center">
                    <div className="bg-red-600 mx-2" style={{ width: "5px", height: "5px", borderRadius: "50%" }} />
                    <span className="text-sm">{qnaquery_object.title}</span>
                  </div>
                  <div className="text-xs">
                    <span className="mr-1">{timestamp_to_date(qnaquery_object.timestamp)}</span>
                    <span
                      onClick={() => {
                        save_qnaquery_check(qnaquery_object.title)
                      }}
                    >
                      <CheckSVG className={`inline fill-current w-5 h-5 pb-1 text-green-500 hover:text-green-600 cursor-pointer`} />
                    </span>
                  </div>
                </div>
                <div className="keep-all">{qnaquery_object.content}</div>
              </div>
            )
          })}

          {/* 확인한 질문 목록 */}
          {qnaquery_checked_list.map((qnaquery_object, index) => {
            return (
              <div key={index} className="bg-gray-100 rounded p-4">
                <div className="md:flex md:justify-between items-center mb-1">
                  <div className="flex items-center">
                    <span className="text-sm">{qnaquery_object.title}</span>
                  </div>
                  <div className="text-xs">{timestamp_to_date(qnaquery_object.timestamp)}</div>
                </div>
                <div className="keep-all">{qnaquery_object.content}</div>
              </div>
            )
          })}
        </div>

        {/* 구분선 */}
        <div className="my-8 border-b border-gray-600" />

        {/*  코멘트 */}
        <div className="text-center text-lg mb-4 cursor-pointer select-none hover:text-indigo-600" onClick={toggle_is_new_comment}>
          코멘트
        </div>
        {is_new_comment && <NewComment qna_student_id={qnastudent_object._id} rest_api_url={rest_api_url} set_is_new_comment={set_is_new_comment} />}
        <div className="flex-col space-y-4 max-w-md mx-auto">
          {qnacomment_list.map((qnacomment_object, index) => {
            return (
              <div key={index} className="bg-gray-100 rounded p-4">
                <div className="md:flex md:justify-between items-center mb-1">
                  <div className="text-sm">{qnacomment_object.title}</div>
                  <div className="text-xs">{timestamp_to_date(qnacomment_object.timestamp)}</div>
                </div>
                <div className="keep-all">{qnacomment_object.content}</div>
              </div>
            )
          })}
        </div>
      </motion.div>
    </>
  )
}

const timestamp_to_date = (timestamp) => {
  let date = new Date(timestamp * 1000)
  let year = date.getFullYear()
  let month = "" + (date.getMonth() + 1)
  let day = "" + date.getDate()

  if (month.length < 2) month = "0" + month
  if (day.length < 2) day = "0" + day
  return `${year}.${month}.${day}`
}

export default StudentPanel
