import Link from "next/link"
import axios from "axios"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/client"

import Layout from "../../../components/layout/layout_user"

const QuizIndexPage = ({ quiz_info_arr }) => {
  const [session, _] = useSession()
  const [quiz_info_list, set_quiz_info_list] = useState([]) // 현재 풀고 있는 문제 번호

  useEffect(() => {
    if (session) {
      const student_id = session.user.image
      quiz_info_arr.forEach((quiz_info) => {
        axios
          .get(
            `https://editor-api.daechi-on.com/quiz-solving/${student_id}/${quiz_info._id}`
          )
          .then((response) => {
            const status_code = response.status
            if (status_code == 200) {
              set_quiz_info_list((prev_state) => [
                ...prev_state,
                { ...quiz_info, is_solved: true },
              ])
            } else if (status_code == 204) {
              set_quiz_info_list((prev_state) => [
                ...prev_state,
                { ...quiz_info, is_solved: false },
              ])
            }
          })
          .catch((error) => {
            console.log(error)
          })
      })
      set_quiz_info_list((prev_state) => {
        prev_state.sort((a, b) => (a._id > b._id ? 1 : -1))
        return prev_state
      })
    }
  }, [])

  return (
    <Layout>
      {/* 신규 문제집 신청 */}
      <div className="flex justify-center">
        <Link href="/user/new_quiz_set">
          <a className="inline-flex items-center my-6 px-6 py-2 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white focus:outline-none cursor-pointer">
            신규 문제집
          </a>
        </Link>
      </div>

      {/* 기존에 받은 문제집 */}
      <table className="min-w-full divide-y divide-gray-200 select-none">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-light text-gray-500 uppercase tracking-wider"
            >
              index
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-light text-gray-500 uppercase tracking-wider"
            >
              Title
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-light text-gray-500 uppercase tracking-wider"
            >
              Count
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-light text-gray-500 uppercase tracking-wider"
            >
              Solved
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 text-center">
          {quiz_info_list &&
            quiz_info_list
              .sort((a, b) => (a._id > b._id ? 1 : -1))
              .map((quiz_info, index) => (
                <Link
                  key={`${quiz_info.title}`}
                  href={`/user/${quiz_info.is_solved ? "solve" : "quiz"}/${
                    quiz_info._id
                  }`}
                >
                  <tr className="cursor-pointer hover:bg-gray-100">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4 text-left">
                      <a className="text-lg text-gray-800">{quiz_info.title}</a>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-base font-semibold text-indigo-500">
                        {quiz_info.count}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {quiz_info.is_solved ? (
                        <div className="text-base font-semibold text-indigo-500">
                          SOLVED
                        </div>
                      ) : (
                        <div className="text-base font-semibold text-red-500">
                          NOT YET
                        </div>
                      )}
                    </td>
                  </tr>
                </Link>
              ))}
        </tbody>
      </table>
    </Layout>
  )
}

export async function getServerSideProps() {
  const quiz_info_all_response = await axios.get(
    `https://editor-api.daechi-on.com/quizinfos/all`
  )
  const quiz_info_all_data = quiz_info_all_response.data
  const quiz_info_arr = quiz_info_all_data.quiz_info_arr

  return {
    props: {
      quiz_info_arr: quiz_info_arr,
    },
  }
}

export default QuizIndexPage
