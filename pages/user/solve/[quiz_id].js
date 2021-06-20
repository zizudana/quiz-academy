import Layout from "../../../components/layout/layout_user"
import Preview from "../../../components/quiz/preview"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/client"
import axios from "axios"

const SolvePage = () => {
  const [session, _] = useSession()
  const router = useRouter()
  const { quiz_id } = router.query

  const quiz_count = 20

  const [solving_number, set_solving_number] = useState(0) // 현재 풀고 있는 문제 번호
  const [quiz_content, set_quiz_content] = useState({
    quiz_id: quiz_id,
    number: solving_number,
    content: "<p>Loading contents ...</p>",
  })
  const [selected_answer_list, set_selected_answer_list] = useState(
    Array(quiz_count).fill(0)
  ) // 사용자가 선택한 답 목록

  const move_to_previous_number = () => {
    if (0 < solving_number) {
      set_solving_number((previous_state) => {
        get_quiz_content(previous_state - 1)
        return previous_state - 1
      })
    }
  }

  const move_to_next_number = () => {
    if (solving_number < quiz_count - 1) {
      set_solving_number((previous_state) => {
        get_quiz_content(previous_state + 1)
        return previous_state + 1
      })
    }
  }

  const move_to_number = (index) => {
    set_solving_number(() => {
      get_quiz_content(index)
      return index
    })
  }

  const get_quiz_content = (quiz_number) => {
    axios
      .get(
        `https://editor-api.daechi-on.com/quizcontents/quizid/${quiz_id}/${
          quiz_number + 1
        }`
      )
      .then(function (response) {
        set_quiz_content(response.data)
      })
      .catch(function (error) {
        if (error.response) {
          // 응답이 2xx가 아닌 경우
          console.log("FAIL axios quizcontents : not 2xx", error.response)

          if (error.response.status === 500) {
            // 요청한 quiz_id, number가 없는 경우
            set_quiz_content({
              quiz_id: quiz_id,
              number: solving_number + 1,
              content: "<p>아직 없음</p>",
            })
          }
        } else if (error.request) {
          // 응답을 받지 못한 경우
          console.log("FAIL axios quizcontents : no response", error.request)
        } else {
          // 요청에서 에러 발생
          console.log("FAIL axios quizcontents : request error", error.message)
        }
      })
  }

  const get_quiz_solve = (student_id) => {
    axios
      .get(
        `https://editor-api.daechi-on.com/quiz-solving/${student_id}/${quiz_id}`
      )
      .then((response) => {
        set_selected_answer_list(response.data.answer_array)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    get_quiz_content(0)
    if (session) {
      const student_id = session.user.image
      get_quiz_solve(student_id)
    }
  }, [])

  return (
    <Layout>
      <style jsx>
        {`
          @media print {
            div {
              display: none;
            }
          }
        `}
      </style>

      {/* 문제 제목 */}
      <div className="w-1/2 mx-auto text-center pt-5 rounded">
        <div
          className="color-2 text-indigo-100 px-4 py-3 leading-none rounded-full"
          role="alert"
        >
          <span className="font-semibold text-center flex-auto">
            {solving_number + 1}번 문제
          </span>
        </div>
      </div>

      <div className="flex justify-between">
        {/* 문제 */}
        <div className="w-24" />

        {/* 문제 */}
        <div className="">
          <Preview quiz_id={quiz_id} quiz_content={quiz_content.content} />
        </div>

        {/* 답지 */}
        <div className="w-24">
          <table className="mb-2 border-collapse border w-full">
            <tbody>
              {selected_answer_list.map((answer_number, index) => (
                <tr
                  key={index}
                  onClick={() => {
                    move_to_number(index)
                  }}
                >
                  <td className="border px-2 cursor-pointer">{index + 1}번</td>
                  {answer_number === 0 ? (
                    <td className="border px-2 text-center bg-red-200" />
                  ) : (
                    <td className="border px-2 text-center">{answer_number}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="container h-16 mb-5 fixed bottom-0">
        <div className="grid grid-cols-2 px-5 h-full">
          <div className="col-span-1 flex justify-start items-center">
            {/* button : 이전 문제 */}
            <button
              className="bg-gray-300 hover:bg-gray-400 h-12 text-gray-800 px-4 rounded flex items-center"
              onClick={move_to_previous_number}
            >
              <span className="hidden sm:block keep-all">이전 문제</span>
              {/* previous icon svg */}
              <svg
                className="fill-current w-6 h-6 ml-1"
                enableBackground="new 0 0 64 64"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m37.394 22.567c-.791-.771-2.058-.754-2.828.037l-6.396 6.568c-1.559 1.559-1.559 4.097-.018 5.638l6.415 6.585c.39.403.911.605 1.431.605.503 0 1.007-.188 1.396-.567.791-.771.808-2.037.037-2.828l-6.415-6.623 6.415-6.586c.77-.792.754-2.058-.037-2.829z" />
                <path d="m54.507 36.979c.096.014.19.021.285.021.979 0 1.835-.721 1.978-1.718.152-1.071.229-2.175.229-3.282s-.077-2.211-.229-3.282c-.157-1.094-1.182-1.852-2.263-1.698-1.094.156-1.854 1.168-1.698 2.262.127.884.19 1.799.19 2.718s-.063 1.833-.19 2.718c-.156 1.093.604 2.105 1.698 2.261z" />
                <path d="m32.999 7.999c-13.233 0-24 10.766-24 24s10.767 24 24 24c9.061 0 17.253-5.016 21.381-13.09.502-.983.112-2.188-.871-2.691-.983-.504-2.188-.113-2.691.871-3.439 6.729-10.268 10.91-17.818 10.91-11.028 0-20-8.972-20-20s8.972-20 20-20c7.551 0 14.379 4.181 17.818 10.91.503.983 1.708 1.375 2.691.871.983-.503 1.373-1.708.871-2.691-4.128-8.074-12.32-13.09-21.381-13.09z" />
              </svg>
            </button>
          </div>

          <div className="col-span-1 flex justify-end items-center">
            {/* button : 다음 문제 */}
            <button
              className="bg-gray-300 hover:bg-gray-400 h-12 text-gray-800 px-4 rounded flex items-center"
              onClick={move_to_next_number}
            >
              {/* next icon svg */}
              <svg
                className="fill-current w-6 h-6 mr-1"
                enableBackground="new 0 0 64 64"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m28.604 41.43c.389.379.892.567 1.396.567.521 0 1.041-.202 1.433-.604l6.396-6.567c1.56-1.56 1.56-4.097.019-5.638l-6.414-6.586c-.77-.791-2.037-.808-2.828-.037s-.808 2.037-.037 2.828l6.414 6.624-6.414 6.585c-.773.792-.756 2.058.035 2.828z" />
                <path d="m9.229 28.716c-.152 1.068-.23 2.172-.23 3.283s.078 2.215.23 3.283c.143.998.999 1.718 1.978 1.718.094 0 .189-.007.286-.021 1.093-.156 1.853-1.169 1.697-2.263-.126-.881-.19-1.795-.19-2.717s.064-1.836.19-2.717c.156-1.094-.604-2.107-1.697-2.263-1.1-.16-2.108.603-2.264 1.697z" />
                <path d="m11.618 21.088c-.503.984-.113 2.188.87 2.691.983.5 2.188.113 2.691-.87 3.44-6.73 10.269-10.911 17.819-10.911 11.028 0 20 8.972 20 20s-8.972 20-20 20c-7.551 0-14.379-4.181-17.819-10.911-.503-.984-1.709-1.374-2.691-.87-.983.503-1.373 1.708-.87 2.691 4.128 8.074 12.32 13.089 21.381 13.089 13.233 0 24-10.766 24-24s-10.767-24-24-24c-9.061.002-17.253 5.018-21.381 13.091z" />
              </svg>
              <span className="hidden sm:block keep-all">다음 문제</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SolvePage
