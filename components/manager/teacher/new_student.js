import XSVG from "../../svg/x"
import RefreshSVG from "../../svg/refresh"

import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
const axios = require("axios")

const NewStudent = ({ rest_api_url, qna_id }) => {
  const router = useRouter()
  let current_panel = router.query.panel

  const [refresh, set_refresh] = useState(0) // 새로고침
  const [student_list, set_student_list] = useState([]) // 학생 목록

  useEffect(() => {
    let tmp_student_list = []
    axios
      .get(`${rest_api_url}/students/all`)
      .then(function (response) {
        // handle success

        tmp_student_list = response.data.student_arr
        tmp_student_list.sort((a, b) => a.username.localeCompare(b.username))
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })

    setTimeout(() => {
      set_student_list(tmp_student_list)
    }, 500)
  }, [refresh])

  const add_new_student = (objectid) => {
    axios
      .post(`${rest_api_url}/qnastudents`, { qnaid: qna_id, studentid: objectid })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.error(error)
      })

    // 새로고침
    set_refresh(refresh + 1)
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
            <button className="w-6 h-6 border-2 border-red-500 rounded-full p-1 outline-none">
              <XSVG />
            </button>
          </Link>

          {/* 새로고침 */}
          <button className="w-6 h-6 rounded-full p-1 outline-none border border-green-500" onClick={() => set_refresh(refresh + 1)}>
            <RefreshSVG fill="#48bb78" />
          </button>
        </div>

        <div className="text-center text-xl mb-4">학생 목록</div>

        <table className="table-auto mx-auto">
          <thead>
            <tr>
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">이름</th>
              <th className="px-3 py-2">번호</th>
              <th className="px-3 py-2">+</th>
            </tr>
          </thead>
          <tbody>
            {student_list.map((student_object, index) => {
              return (
                <tr key={index}>
                  <td className="border px-3 py-2">{student_object.id}</td>
                  <td className="border px-3 py-2">{student_object.username}</td>
                  <td className="border px-3 py-2">{student_object.userphone}</td>
                  <td className="border px-3 py-2">
                    <button
                      className="bg-indigo-400 hover:bg-indigo-600 text-white px-2 py-1 rounded outline-none"
                      onClick={() => add_new_student(student_object.objectid)}
                    >
                      추가
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </motion.div>
    </>
  )
}

export default NewStudent
