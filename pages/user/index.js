import Link from "next/link"
import axios from "axios"
import { getSession } from "next-auth/client"

import Layout from "../../components/layout/layout_user"

const QuizSetIndexPage = ({ quiz_set_arr }) => {
  return (
    <Layout>
      {/* 신규 문제집 신청 */}
      <div className="flex justify-center">
        <Link href="/user/new-quiz-set">
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
              className="px-6 py-3 text-xs font-light text-gray-500 uppercase tracking-wider"
            >
              Solved
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-light text-gray-500 uppercase tracking-wider"
            >
              Score
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 text-center">
          {quiz_set_arr &&
            quiz_set_arr
              .sort((a, b) => (a._id > b._id ? 1 : -1))
              .map((quiz_set_info, index) => (
                <Link
                  key={`quiz-set-${index}`}
                  href={`/user/${
                    quiz_set_info.is_solved ? "solve" : "quiz-set"
                  }/${quiz_set_info._id}`}
                >
                  <tr className="cursor-pointer hover:bg-gray-100">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">
                      {quiz_set_info.is_solved ? (
                        <div className="text-base font-semibold text-indigo-500">
                          SOLVED
                        </div>
                      ) : (
                        <div className="text-base font-semibold text-red-500">
                          NOT YET
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {quiz_set_info.is_solved ? (
                        <div className="text-base font-semibold text-indigo-500">
                          {quiz_set_info.num_correct} / {quiz_set_info.num_quiz}
                        </div>
                      ) : (
                        <div className="text-base font-semibold text-red-500">
                          {quiz_set_info.num_quiz}
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

export async function getServerSideProps(context) {
  const session = await getSession(context)
  const student_id = session.user.image
  const quiz_set_res = await axios.get(
    `https://editor-api.daechi-on.com/quiz-sets/all/${student_id}`
  )
  const quiz_set_all_data = quiz_set_res.data
  const quiz_set_arr = quiz_set_all_data.quiz_set_arr

  return {
    props: {
      student_id: student_id,
      quiz_set_arr: quiz_set_arr,
    },
  }
}

export default QuizSetIndexPage
