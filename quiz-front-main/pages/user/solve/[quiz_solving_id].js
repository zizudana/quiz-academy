import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import Link from "next/link"
import Layout from "../../../components/layout/layout_user"
import Preview from "../../../components/quiz/solve-preview"
import TailSpinSVG from "../../../components/svg/tail-spin"
import CircleLeftSVG from "../../../components/svg/circle-left"
import CircleRightSVG from "../../../components/svg/circle-right"
import { ButtonNormal } from "../../../components/common/button"
import { session } from "next-auth/client"
import { useSession } from "next-auth/client"

const SolvePage = ({ rest_api_url }) => {
  const router = useRouter()
  const [session, _] = useSession()
  const { quiz_solving_id } = router.query
  const [is_loading, set_is_loading] = useState(true)
  const [quiz_solving, set_quiz_solving] = useState(null)

  const post_wrong_content = (quiz_id,number,chapter) =>{
	const new_wrong_content = {
		student_id: session.user.image,
		chapter: chapter,
		quiz_id: quiz_id,
		number: number,
	}
	console.log("오답노트:",new_wrong_content)
	axios
      .post(`${rest_api_url}/wrongcontents`, new_wrong_content, {
        timeout: 5000,
      })
      .then((response) => {
        set_is_loading(false)
      })
      .catch((error) => {
        alert(error)
      })
 }


  useEffect(() => {
    axios
      .get(`${rest_api_url}/quiz-solving/id/${quiz_solving_id}`)
      .then((response) => {
        set_quiz_solving(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const Loading = () => (
    <div className="flex flex-col flex-wrap content-center justify-center h-screen">
      <div className="mx-auto">
        <TailSpinSVG className="w-20" fill="#000" />
      </div>
    </div>
  )

  const Loaded = () => {
    const [checking_number, set_checking_number] = useState(0) // 현재 확인하고 있는 문제 번호
    const [quiz_content, set_quiz_content] = useState(null)
    const [quiz_set, set_quiz_set] = useState(null)
    const [solution_content_array, set_solution_content_array] = useState(null)


    useEffect(() => {
      get_quiz_set(quiz_solving.quiz_set_id)
      get_solution_content_array(quiz_solving.quiz_set_id)
    }, [])

    useEffect(() => {
      if (quiz_set) {
        get_quiz_content(0)
      }
    }, [quiz_set])

	 const check_unique_id = (index) => {
		const wrong_content_id = quiz_set.quiz_content_id_arr[index]
		axios
		  .get(`${rest_api_url}/wrongcontents/is-exist/${wrong_content_id}`)
		  .then(function (response) {
			 let is_exist = response.data.is_exist
			 if (!is_exist) {
				get_num_chapter(wrong_content_id)
			 } 
			 
		  })
		  .catch(function (error) {
			 console.error(error)
		  })
	 
  }

  const get_num_chapter = (wrong_content_id) => {
		axios
		  .get(`${rest_api_url}/quizcontents/id/${wrong_content_id}`)
		  .then(function (response) {
			const quiz_data = response.data
				post_wrong_content(wrong_content_id,quiz_data.number,quiz_data.chapter)
		  }
		  )
		  .catch(function (error) {
			console.error(error)
		  })
  }

    useEffect(() => {
      if (solution_content_array) {
        let correct_count = 0
        let updated_quiz_set = {}

        quiz_solving.answer_array.map((answer_number, index) => {
          if (answer_number === solution_content_array[index].answer) {
            correct_count += 1
          }else if(answer_number !== solution_content_array[index].answer){
				check_unique_id(index)
			 }
          updated_quiz_set = {
            ...quiz_set,
            num_correct: correct_count,
          }
        })

        set_quiz_set(updated_quiz_set)
        put_quiz_set(updated_quiz_set)
      }
    }, [solution_content_array])

    const get_quiz_set = (quiz_set_id) => {
      axios
        .get(`${rest_api_url}/quiz-sets/id/${quiz_set_id}`)
        .then((response) => {
          set_quiz_set(response.data)
        })
        .catch((error) => {
          console.error(error)
        })
    }

    const get_solution_content_array = (quiz_set_id) => {
      axios
        .get(`${rest_api_url}/solution-contents/quiz-set-id/${quiz_set_id}`)
        .then((response) => {
          set_solution_content_array(response.data)
        })
        .catch((error) => {
          console.error(error)
        })
    }

    const get_quiz_content = (quiz_number) => {
      const quiz_content_id = quiz_set.quiz_content_id_arr[quiz_number]
      axios
        .get(`${rest_api_url}/quizcontents/id/${quiz_content_id}`)
        .then(function (response) {
          set_quiz_content(response.data) 
			
        })
        .catch(function (error) {
          if (error.response) {
            // 응답이 2xx가 아닌 경우
            console.error("FAIL axios quizcontents : not 2xx", error.response)

            if (error.response.status === 500) {
              // 요청한 quiz_id, number가 없는 경우
              set_quiz_content({
                number: checking_number + 1,
                content: "<p>아직 없음</p>",
              })
            }
          } else if (error.request) {
            // 응답을 받지 못한 경우
            console.error(
              "FAIL axios quizcontents : no response",
              error.request
            )
          } else {
            // 요청에서 에러 발생
            console.error(
              "FAIL axios quizcontents : request error",
              error.message
            )
          }
        })
    }

    const put_quiz_set = (updated_quiz_set) => {
      axios
        .put(`${rest_api_url}/quiz-sets`, updated_quiz_set)
        .then(function (response) {
          console.log(response.data)
        })
        .catch(function (error) {
          console.error(error)
        })
    }

    const move_to_previous_number = () => {
      if (0 < checking_number) {
        set_checking_number((previous_state) => {
          get_quiz_content(previous_state - 1)
          return previous_state - 1
        })
      }
    }

    const move_to_next_number = () => {
      if (checking_number < quiz_set.num_quiz - 1) {
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

    return (
      <>
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
        <div className="mx-auto pt-6">
          <h2 className="text-center text-color-black-1 mb-4">
            {checking_number + 1}번 문제
          </h2>
        </div>

        <div className="flex mb-32 px-4 justify-between">
          {/* 풀이 - 큰 화면 */}
          <div className="hidden xl:block px-8 py-6 bg-white shadow">
            {solution_content_array && (
              <p className="mb-3 text-color-main-1">
                정답 : {solution_content_array[checking_number].answer}
              </p>
            )}

            {solution_content_array && (
              <Preview
                rest_api_url={rest_api_url}
                quiz_content={solution_content_array[checking_number]}
              />
            )}
          </div>

          {/* 여백 - 작은 화면 */}
          <div className="block xl:hidden w-24" />

          {/* 문제 & 풀이 */}
          <div className="px-8 py-6 bg-white shadow">
            {/* 문제 */}
            {quiz_content && (
              <Preview rest_api_url={rest_api_url} quiz_content={quiz_content}/>
            )}

            {/* 구분선 */}
            <hr className="block xl:hidden my-6 border-color-black-1 w-full" />

            {solution_content_array && (
              <p className="block xl:hidden mb-3 text-color-main-1">
                정답 : {solution_content_array[checking_number].answer}
              </p>
            )}

            {/* 풀이 */}
            {solution_content_array && (
              <div className="block xl:hidden">
                <Preview
                  rest_api_url={rest_api_url}
                  quiz_content={solution_content_array[checking_number]}
                />
              </div>
            )}
          </div>
{/* /////////////////////////////////////////////////////////////////////////////////////////////////// */ }
			{/* <div className="flex items-center justify-between mt-8 mb-4"> */}
				{/* {quiz_set &&(
					<p> 아이디 : {quiz_set.quiz_content_id_arr[checking_number]}</p>
					
				)} */}
		  		{/* <Link href="/user/wrong"> */}
				 {/* <Link onclick="location.href='/user/wrong'"> */}
            	{/* <ButtonNormal className="px-4 py-2" onclick="location.href='/user/wrong'">오답노트로 가기</ButtonNormal>  */}
        		{/* </Link> */}
      	{/* </div> */}
{/* ////////////////////////////////////quiz_solving_id는 quiz_set_id /////////////////////////////////////////////////////////// */ }

          {/* 답지 */}
          <div className="w-24">
            {quiz_set && (
              <p className="mb-2 text-center">
                {quiz_set.num_correct} / {quiz_set.num_quiz}
              </p>
            )}
            <table className="mb-4 border w-full bg-white shadow">
              <thead>
                <tr className="text-center">
                  <th>문제</th>
                  <th>선택</th>
                  <th>정답</th>
                </tr>
              </thead>
              <tbody>
                {solution_content_array &&
                  quiz_solving.answer_array.map((answer_number, index) => {
                    const correct_number = solution_content_array[index].answer
                    const is_correct = answer_number === correct_number
                    return (
                      <tr
                        key={index}
                        className="text-center"
                        onClick={() => {
                          move_to_number(index)
                        }}
                      >
                        <td
                          className={`border px-2 cursor-pointer ${
                            is_correct ? "bg-color-others-3" : "bg-red-400"
                          }`}
                        >
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
				  {checking_number != 0?
              <ButtonNormal
                className="flex px-4 h-12 items-center"
                onClick={move_to_previous_number}
              >
                <span className="hidden sm:block keep-all">이전 문제</span>
                <CircleLeftSVG className="fill-current w-6 h-6 ml-1" />
              </ButtonNormal> : null
  					}	
            </div>

            <div className="col-span-1 flex justify-end items-center">
              {/* button : 다음 문제 */}
				  {checking_number < 19?
              <ButtonNormal
                className="flex px-4 h-12 items-center"
                onClick={move_to_next_number}
              >
                <CircleRightSVG className="fill-current w-6 h-6 mr-1" />
                <span className="hidden sm:block keep-all">다음 문제</span>
              </ButtonNormal> : null
  					}
            </div>
          </div>
        </div>
      </>
    )
  }

  return <Layout>{quiz_solving ? <Loaded /> : <Loading />}</Layout>
}

const getServerSideProps = () => {
  const rest_api_url = process.env.REST_API_URL

  return { props: { rest_api_url } }
}

export { getServerSideProps }

export default SolvePage
