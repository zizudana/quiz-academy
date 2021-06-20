import Layout from "../../../components/layout/layout_user"
import Preview from "../../../components/quiz/solve-preview"
import CircleLeftSVG from "../../../components/svg/circle-left"
import CircleRightSVG from "../../../components/svg/circle-right"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"

const SolvePage = () => {
  const router = useRouter()
  const { quiz_solving_id } = router.query

  const [quiz_count, set_quiz_count] = useState(15) // 문제 개수
  const [checking_number, set_checking_number] = useState(0) // 현재 확인하고 있는 문제 번호
  const [quiz_content, set_quiz_content] = useState({
    number: checking_number,
    content: "<p>Loading contents ...</p>",
  })
  const [quiz_solving, set_quiz_solving] = useState({
    quiz_set_id: "",
    answer_array: Array(quiz_count).fill(0),
  })
  const [quiz_set, set_quiz_set] = useState({
    num_correct: 0,
    num_quiz: 0,
    quiz_content_id_arr: Array(quiz_count).fill(0),
  })
  const [solution_content_array, set_solution_content_array] = useState(
    Array(quiz_count).fill({
      content: "<p>Loading contents ...</p>",
    })
  )

  const move_to_previous_number = () => {
    if (0 < checking_number) {
      set_checking_number((previous_state) => {
        get_quiz_content(previous_state - 1)
        return previous_state - 1
      })
    }
  }

  const move_to_next_number = () => {
    if (checking_number < quiz_count - 1) {
      set_checking_number((previous_state) => {
        get_quiz_content(previous_state + 1)
        return previous_state + 1
      })
    }
  }

  const move_to_number = (index) => {
    set_checking_number(() => {
      get_quiz_content(index)
      return index
    })
  }

  const get_quiz_content = (quiz_number) => {
    const quiz_content_id = quiz_set.quiz_content_id_arr[quiz_number]
    axios
      .get(
        `https://editor-api.daechi-on.com/quizcontents/id/${quiz_content_id}`
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
              number: checking_number + 1,
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

  const get_solution_content_array = (quiz_set_id) => {
    axios
      .get(
        `https://editor-api.daechi-on.com/solution-contents/quiz-set-id/${quiz_set_id}`
      )
      .then((response) => {
        set_solution_content_array(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    let correct_count = 0
    let updated_quiz_set = {}

    quiz_solving.answer_array.map((answer_number, index) => {
      if (answer_number === solution_content_array[index].answer) {
        correct_count += 1
      }
      updated_quiz_set = {
        ...quiz_set,
        num_correct: correct_count,
      }
    })

    set_quiz_set(updated_quiz_set)
    put_quiz_set(updated_quiz_set)
  }, [solution_content_array])

  const get_quiz_set = (quiz_set_id) => {
    axios
      .get(`https://editor-api.daechi-on.com/quiz-sets/id/${quiz_set_id}`)
      .then((response) => {
        set_quiz_set(response.data)
        set_quiz_count(response.data.num_quiz)
        get_solution_content_array(quiz_set_id)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const put_quiz_set = (updated_quiz_set) => {
    axios
      .put(`https://editor-api.daechi-on.com/quiz-sets`, updated_quiz_set)
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  useEffect(() => {
    get_quiz_content(0)
  }, [quiz_set])

  const get_quiz_solving = () => {
    axios
      .get(
        `https://editor-api.daechi-on.com/quiz-solving/id/${quiz_solving_id}`
      )
      .then((response) => {
        set_quiz_solving(response.data)
        get_quiz_set(response.data.quiz_set_id)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    get_quiz_solving()
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
            {checking_number + 1}번 문제
          </span>
        </div>
      </div>

      <div className="flex justify-between pt-8">
        <div className="w-24" />

        {/* 문제 & 풀이 */}
        <div>
          {/* 문제 */}
          <Preview quiz_content={quiz_content} />

          {/* 구분선 */}
          <hr className="my-6 border-gray-800 w-full" />

          <p className="mb-3 text-red-600">
            정답 : {solution_content_array[checking_number].answer}
          </p>

          {/* 풀이 */}
          <Preview quiz_content={solution_content_array[checking_number]} />
        </div>

        {/* 답지 */}
        <div className="w-40">
          <p className="mb-2 text-center">
            {quiz_set.num_correct} / {quiz_set.num_quiz}
          </p>
          <table className="mb-2 border-collapse border w-full">
            <thead>
              <tr>
                <th>문제</th>
                <th>선택</th>
                <th>정답</th>
              </tr>
            </thead>
            <tbody>
              {quiz_solving.answer_array.map((answer_number, index) => {
                const correct_number = solution_content_array[index].answer
                const is_correct = answer_number === correct_number
                return (
                  <tr
                    key={index}
                    className={`text-center ${
                      is_correct ? "bg-green-200" : "bg-red-200"
                    }`}
                    onClick={() => {
                      move_to_number(index)
                    }}
                  >
                    <td className="border px-2 cursor-pointer">
                      {index + 1}번
                    </td>
                    <td className="border px-2">{answer_number}</td>
                    <td className="border px-2">{correct_number}</td>
                  </tr>
                )
              })}
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
              <CircleLeftSVG className="fill-current w-6 h-6 ml-1" />
            </button>
          </div>

          <div className="col-span-1 flex justify-end items-center">
            {/* button : 다음 문제 */}
            <button
              className="bg-gray-300 hover:bg-gray-400 h-12 text-gray-800 px-4 rounded flex items-center"
              onClick={move_to_next_number}
            >
              <CircleRightSVG className="fill-current w-6 h-6 mr-1" />
              <span className="hidden sm:block keep-all">다음 문제</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SolvePage
