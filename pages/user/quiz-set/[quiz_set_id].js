import { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/router"

import Layout from "../../../components/layout/layout_user"
import Preview from "../../../components/quiz/preview"
import TailSpinSVG from "../../../components/svg/tail-spin"
import CircleLeftSVG from "../../../components/svg/circle-left"
import CircleRightSVG from "../../../components/svg/circle-right"
import { ButtonNormal, DisabledButton } from "../../../components/common/button"

const QuizSetPage = ({ rest_api_url }) => {
  const router = useRouter()
  const { quiz_set_id } = router.query

  const [quiz_set_data, set_quiz_set_data] = useState(null)

  useEffect(() => {
    axios
      .get(`${rest_api_url}/quiz-sets/id/${quiz_set_id}`)
      .then(function (response) {
        set_quiz_set_data(response.data)
      })
      .catch(function (error) {
        console.error(error)
      })
  }, [])

  const Loading = () => (
    <div className="flex flex-col flex-wrap content-center justify-center h-screen">
      {/* Loading */}
      <div className="mx-auto">
        <TailSpinSVG className="w-20" fill="#000" />
      </div>
    </div>
  )

  const Loaded = () => {
    const answer_button_array = Array.from(Array(5), (_, i) => i + 1)
    const [solving_number, set_solving_number] = useState(0) // 현재 풀고 있는 문제 번호
    const [quiz_content, set_quiz_content] = useState({
      number: 0,
      content: "<p>Loading contents ...</p>",
    })
    const [selected_answer_list, set_selected_answer_list] = useState(
      Array(quiz_set_data.num_quiz).fill(0)
    ) // 사용자가 선택한 답 목록

    useEffect(() => {
      get_quiz_content(0)
    }, [])

    const move_to_previous_number = () => {
      if (0 < solving_number) {
        set_solving_number((previous_state) => {
          get_quiz_content(previous_state - 1)
          return previous_state - 1
        })
      }
    }

    const move_to_next_number = () => {
      if (solving_number < quiz_set_data.num_quiz - 1) {
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

    const select_answer = (answer_number) => {
      set_selected_answer_list((previous_state) => {
        let new_answer_list = [...previous_state]
        new_answer_list[solving_number] = answer_number
        return new_answer_list
      })
    }

    const get_quiz_content = (quiz_content_index) => {
      const quiz_content_id =
        quiz_set_data.quiz_content_id_arr[quiz_content_index]

      axios
        .get(`${rest_api_url}/quizcontents/id/${quiz_content_id}`)
        .then(function (response) {
          set_quiz_content(response.data)
        })
        .catch(function (error) {
          if (error.response) {
            // 응답이 2xx가 아닌 경우
            console.log("FAIL axios quizcontents : not 2xx", error.response)

            if (error.response.status === 500) {
              // 요청한 number가 없는 경우
              set_quiz_content({
                number: solving_number + 1,
                content: `
                  <p>${quiz_content_id} - 문제를 불러오지 못했습니다.</p>
                  <p>관리자에게 문의해주세요.</p>
                `,
              })
            }
          } else if (error.request) {
            // 응답을 받지 못한 경우
            console.log("FAIL axios quizcontents : no response", error.request)
          } else {
            // 요청에서 에러 발생
            console.log(
              "FAIL axios quizcontents : request error",
              error.message
            )
          }
        })
    }

    const is_solved = () => {
      const not_solved_index = selected_answer_list.indexOf(0)
      if (not_solved_index == -1) {
        return true
      }
      return false
    }

    const post_solving_info = () => {
      // 풀지 않은 문제가 있으면 경고하고 post 취소
      const not_solved_index = selected_answer_list.indexOf(0)
      if (not_solved_index !== -1) {
        alert(`아직 ${not_solved_index + 1}번 문제를 풀지 않았습니다.`)
        return
      }

      const solving_info = {
        quiz_set_id: quiz_set_data._id,
        answer_array: selected_answer_list,
      }

      axios
        .post(`${rest_api_url}/quiz-solving`, solving_info)
        .then((response) => {
          console.log(response)

          router.push(`/user/solve/${quiz_set_data._id}`)
        })
        .catch((error) => {
          console.error(error)
          alert(
            "제출에 문제가 발생했습니다.\n" +
              "관리자에게 문의해주세요.\n" +
              `[ Quiz Set ID : ${quiz_set_data._id} ]`
          )
        })
    }

    return (
      <>
        <style jsx>
          {`
            @media print {
              p {
                display: none;
              }
            }
          `}
        </style>

        {/* 문제 제목 */}
        <div className="mx-auto pt-6">
          <h2 className="text-center text-color-black-1 mb-4">
            {solving_number + 1}번 문제
          </h2>
        </div>

        <div className="flex mb-32 px-4 justify-between">
          <div className="w-24" />

          {/* 문제 */}
          <div className="px-8 py-6 bg-white shadow">
            <Preview rest_api_url={rest_api_url} quiz_content={quiz_content} />
          </div>

          {/* 답지 */}
          <div className="w-24">
            <table className="mb-4 border w-full bg-white shadow">
              <tbody>
                {selected_answer_list.map((answer_number, index) => (
                  <tr
                    key={index}
                    onClick={() => {
                      move_to_number(index)
                    }}
                  >
                    <td className="border px-2 cursor-pointer">
                      {index + 1}번
                    </td>
                    {answer_number === 0 ? (
                      <td className="border px-2 text-center bg-color-main-3">
                        &nbsp;&nbsp;
                      </td>
                    ) : (
                      <td className="border px-2 text-center">
                        {answer_number}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 제출 버튼 */}
            {is_solved() ? (
              <ButtonNormal className="w-full" onClick={post_solving_info}>
                제출
              </ButtonNormal>
            ) : (
              <DisabledButton className="w-full">제출</DisabledButton>
            )}
          </div>
        </div>

        <div className="container h-16 mb-5 fixed bottom-0">
          <div className="grid grid-cols-4 gap-3 px-5 h-full">
            <div className="col-span-1 flex justify-start items-center">
              {/* button : 이전 문제 */}
              <ButtonNormal
                className="flex px-4 h-12 items-center"
                onClick={move_to_previous_number}
              >
                <span className="hidden sm:block keep-all">이전 문제</span>
                <CircleLeftSVG className="fill-current w-6 h-6 ml-1" />
              </ButtonNormal>
            </div>

            <div className="col-span-2 flex justify-center items-center gap-4">
              {answer_button_array.map((button_index, index) => (
                <ButtonNormal
                  key={index}
                  className="px-4"
                  onClick={() => select_answer(button_index)}
                >
                  {button_index}
                </ButtonNormal>
              ))}
            </div>

            <div className="col-span-1 flex justify-end items-center">
              {/* button : 다음 문제 */}
              <ButtonNormal
                className="flex px-4 h-12 items-center"
                onClick={move_to_next_number}
              >
                <CircleRightSVG className="fill-current w-6 h-6 mr-1" />
                <span className="hidden sm:block keep-all">다음 문제</span>
              </ButtonNormal>
            </div>
          </div>
        </div>
      </>
    )
  }

  return <Layout>{quiz_set_data ? <Loaded /> : <Loading />}</Layout>
}

const getServerSideProps = () => {
  const rest_api_url = process.env.REST_API_URL

  return { props: { rest_api_url } }
}

export { getServerSideProps }

export default QuizSetPage
