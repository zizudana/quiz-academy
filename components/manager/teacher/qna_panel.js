import LockedSVG from "../../svg/lock"
import UnlockedSVG from "../../svg/unlock"
import CheckSVG from "../../svg/check"
import RefreshSVG from "../../svg/refresh"
import NewStudent from "./new_student"
import StudentPanel from "./student_panel"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import ReactStars from "react-rating-stars-component"
const axios = require("axios")

/**
 * @param {Object} props
 * * @param {Object} qna_object
 * * * @param {String} teacherid (부모) 교사 ID
 * * * @param {String} title 제목
 * * * @param {String} content 소개
 * * * @param {String} operatingtime 운영 시간
 * * * @param {Bool} isopen 운영 여부
 * * * @param {String} zoomlink zoom url
 * * * @param {Array} qnastudentlist 질의응답+학생 목록
 * * * @param {Array} qnafeedbacklist 질의응답+피드백 목록
 * * @param {String} rest_api_url
 */
const QnaPanel = (props) => {
  if (!props) {
    return <div>loading QnaPanel props ...</div>
  }

  if (!props.qna_object) {
    return null
  }

  const router = useRouter()
  let current_panel = router.query.panel
  let current_student = router.query.student

  const [refresh, set_refresh] = useState(0) // 새로고침
  const [qnastudent_list, set_qnastudent_list] = useState([]) // 질의응답+학생 목록
  const [qnaquery_unchecked_list, set_qnaquery_unchecked_list] = useState([]) // 미확인 질문 목록
  const [qnafeedback_list, set_qnafeedback_list] = useState([]) // 피드백 목록

  useEffect(() => {
    let tmp_qnastudent_list = []
    let tmp_qnaquery_unchecked_list = []
    let tmp_qnafeedback_list = []

    props.qna_object.qnastudentlist.forEach((qnastudent_id) => {
      axios
        .get(`${props.rest_api_url}/qnastudents/${qnastudent_id}`)
        .then(function (response) {
          // handle success
          const qnastudent_object = response.data

          // 미확인 질문 목록에 추가
          qnastudent_object.qnaquerylist.forEach((qnaquery_id) => {
            axios
              .get(`${props.rest_api_url}/qnaquerys/${qnaquery_id}`)
              .then(function (response) {
                // handle success
                const qnaquery_object = response.data

                if (qnaquery_object.ischecked === "false") {
                  tmp_qnaquery_unchecked_list.push(qnaquery_object)
                }
              })
              .catch(function (error) {
                // handle error
                console.log(error)
              })
              .then(function () {})
          })

          // 질의응답+학생 목록에 추가
          tmp_qnastudent_list.push(qnastudent_object)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    })

    props.qna_object.qnafeedbacklist.forEach((qnafeedback_id) => {
      axios
        .get(`${props.rest_api_url}/qnafeedbacks/${qnafeedback_id}`)
        .then(function (response) {
          // handle success
          const qnafeedback_object = response.data

          tmp_qnafeedback_list.push(qnafeedback_object)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    })

    setTimeout(() => {
      // 미확인 질문 목록을 timestamp 기준으로 정렬
      tmp_qnaquery_unchecked_list.sort((a, b) => a.timestamp - b.timestamp)

      set_qnastudent_list(tmp_qnastudent_list)
      set_qnaquery_unchecked_list(tmp_qnaquery_unchecked_list)
      set_qnafeedback_list(tmp_qnafeedback_list)
    }, 500)
  }, [refresh])

  const [zoom_link, set_zoom_link] = useState(props.qna_object.zoomlink)
  const [lock_object, set_lock_object] = useState(props.qna_object.isopen === "true" ? open_state.unlocked : open_state.locked)

  const on_change_zoom_link = (event) => {
    set_zoom_link(event.target.value)
  }

  const save_zoom_link = () => {
    axios.put(`${props.rest_api_url}/qnas`, { title: props.qna_object.title, zoomlink: zoom_link }).then((response) => {
      console.log(response)
    })
  }

  const save_qnaquery_check = (qnaquery_title) => {
    axios.put(`${props.rest_api_url}/qnaquerys`, { title: qnaquery_title, ischecked: "true" }).then((response) => {
      console.log(response)
    })
    setTimeout(() => {
      set_refresh(refresh + 1)
    }, 500)
  }

  const toggle_is_open = () => {
    if (lock_object.is_open) {
      set_lock_object(open_state.locked)
      axios.put(`${props.rest_api_url}/qnas`, { title: props.qna_object.title, isopen: "false" }).then((response) => {
        console.log(response)
      })
    } else {
      set_lock_object(open_state.unlocked)
      axios.put(`${props.rest_api_url}/qnas`, { title: props.qna_object.title, isopen: "true" }).then((response) => {
        console.log(response)
      })
    }
  }

  const main_panel = (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
    >
      {/* 새로고침 */}
      <div className="flex flex-row-reverse">
        <button className="w-6 h-6 rounded-full p-1 outline-none border border-green-500" onClick={() => set_refresh(refresh + 1)}>
          <RefreshSVG fill="#48bb78" />
        </button>
      </div>

      {/* OPEN or CLOSED */}
      <div className="flex items-center justify-center mb-8">
        <div
          className={`w-full md:w-1/2 h-10 pt-2 ${lock_object.lock_color} cursor-pointer rounded-full text-lg text-white uppercase select-none`}
          onClick={toggle_is_open}
        >
          <div className="mx-auto" style={{ width: "fit-content" }}>
            <span className="mr-2">
              {lock_object.is_open && <UnlockedSVG className={`inline fill-current w-6 h-6 pb-1 text-white`} />}
              {!lock_object.is_open && <LockedSVG className={`inline fill-current w-6 h-6 pb-1 text-white`} />}
            </span>
            <span>{lock_object.open_message}</span>
          </div>
        </div>
      </div>

      {/* Zoom 수정 */}
      <div className="flex items-center justify-center mb-8">
        <img src="/img/zoom_icon.png" alt="zoom_icon" className="w-8 h-8 mr-2" />

        <input className="w-1/2 bg-gray-100 px-2 outline-none border text-sm text-center mr-2" value={zoom_link} onChange={on_change_zoom_link} />
        <button className="bg-indigo-600 hover:bg-indigo-400 text-white px-2 py-1 rounded outline-none" onClick={save_zoom_link}>
          저장
        </button>
      </div>

      {/* 학생 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {/* 새로운 학생 추가 */}
        <Link href={`/manager/teacher?panel=${current_panel}&student=new_student`}>
          <div className="flex justify-between items-center cursor-pointer bg-gray-100 rounded-lg pl-4 pr-3 py-1">
            <div>학생 추가</div>
            <div className="bg-indigo-600 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center">+</div>
          </div>
        </Link>

        {/* DB에서 불러온 학생 목록 */}
        {qnastudent_list.map((qnastudent_object, index) => {
          return (
            <div key={index}>
              <Link href={`/manager/teacher?panel=${current_panel}&student=${qnastudent_object.studentname}`}>
                <div className="flex justify-between items-center cursor-pointer bg-gray-100 rounded-lg pl-4 pr-3 py-1">
                  <div>{qnastudent_object.studentname}</div>
                  <div className="bg-indigo-600 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center">4</div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>

      {/* 구분선 */}
      <div className="my-8 border-b border-gray-600" />

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
      </div>

      {/* 구분선 */}
      <div className="my-8 border-b border-gray-600" />

      {/*  피드백 */}
      <div className="text-center text-lg mb-4 uppercase">feedback</div>
      <div className="flex-col space-y-4 max-w-md mx-auto">
        {qnafeedback_list.map((value, index) => {
          return (
            <div key={index} className="bg-gray-100 rounded p-4">
              <div className="md:flex md:justify-between items-center mb-1">
                <div className="text-sm">{value.title}</div>
                <div>
                  <ReactStars count={5} value={value.score} size={15} isHalf={true} activeColor="#ffb700" edit={false} />
                </div>
              </div>
              <div className="keep-all">{value.content}</div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )

  return (
    <>
      {!current_student && main_panel}

      {qnastudent_list.map((qnastudent_object, index) => {
        const student_name = qnastudent_object.studentname

        if (current_student === student_name) {
          return <StudentPanel key={index} qnastudent_object={qnastudent_object} rest_api_url={props.rest_api_url} />
        }
      })}
      {current_student === "new_student" && <NewStudent rest_api_url={props.rest_api_url} qna_id={props.qna_object._id} />}
    </>
  )
}

const open_state = {
  locked: {
    is_open: false,
    lock_color: "bg-red-600",
    open_message: "closed",
  },
  unlocked: {
    is_open: true,
    lock_color: "bg-indigo-600",
    open_message: "open",
  },
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

export default QnaPanel
