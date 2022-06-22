import React, { useState, useEffect, useReducer, useContext } from "react"
import Link from "next/link"
import axios from "axios"
import { useSession } from "next-auth/client"

import Layout from "../../components/layout/layout_user"
import { ButtonNormal } from "../../components/common/button"

export const VideoContext = React.createContext(
  {
    src: "https://player.vimeo.com/video/713143205?h=db7937585c",
    is_ended: false,
    name: "Chapter1. Apple"
  }
)

/*}
function Video() {
  return (
    <VideoContext.Provider value={dispatch}>
      <CreateVideo
        src={"https://player.vimeo.com/video/713143205?h=db7937585c"}
        is_ended={true}
        name={"Chapter1. Apple"}
      />
    </VideoContext.Provider>
  )
  }

export { Video }
*/

const QuizSetIndexPage = ({ rest_api_url }) => {
  const [quiz_set_arr, set_quiz_set_arr] = useState([])
  const [session, loading] = useSession()

  useEffect(() => {
    if (session) {
      const student_id = session.user.image
      axios
        .get(`${rest_api_url}/quiz-sets/all/${student_id}`)
        .then(function (response) {
          const quiz_set_data = response.data
          set_quiz_set_arr(quiz_set_data.quiz_set_arr)
        })
        .catch(function (error) {
          console.error(error)
        })
    }
  }, [session])

  if (loading) {
    return <Layout></Layout>
  }

  if (!session) {
    return <Layout></Layout>
  }

  return (
    <Layout>
      {/*강의듣기 추가*/}
      <div className="flex items-center justify-between mt-8 mb-4">
        <h1 className="flex">
          <img src="/img/ic_subject_big.svg" className="mr-2" alt="book" />
          동영상 강의
        </h1>
      </div>
      
      {/*강의 목록 테이블*/}
      <table className="w-full divide-y divide-gray-400 border border-color-black-4">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="py-3 text-md font-bold uppercase tracking-widest"
            >
              Index
            </th>
            <th
              scope="col"
              className="py-3 text-md font-bold uppercase tracking-widest"
            >
              Chapter
            </th>
            <th
              scope="col"
              className="py-3 text-md font-bold uppercase tracking-widest"
            >
              Ended
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-400 text-center">
          {
          <Link href="/user/video">
            <tr className="cursor-pointer hover:bg-white">
              <td className="py-4">1</td>
              <td className="py-4">
                <div className="text-base text-indigo-500">
                  {useContext(VideoContext).name}
                </div>
              </td>
              <td className="py-4">
                {useContext(VideoContext).is_ended ? (
                <div className="text-base text-indigo-500">ENDED</div>) : (<div className="text-base text-red-500">NOT YET</div>)
                }
              </td>
            </tr>
          </Link>
          }
        </tbody>
      </table>
    
      {/* 신규 문제집 신청 */}
      <div className="flex items-center justify-between mt-8 mb-4">
        <h1 className="flex">
          <img src="/img/ic_subject_big.svg" className="mr-2" alt="book" />
          문제 풀이
        </h1>
        <Link href="/user/new-quiz-set">
          <div>
            <ButtonNormal className="px-4 py-2">문제집 추가</ButtonNormal>
          </div>
        </Link>
      </div>

      {/* 기존에 받은 문제집 */}
      <table className="w-full divide-y divide-gray-400 border border-color-black-4">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="py-3 text-md font-bold uppercase tracking-widest"
            >
              Index
            </th>
            <th
              scope="col"
              className="py-3 text-md font-bold uppercase tracking-widest"
            >
              Solved
            </th>
            <th
              scope="col"
              className="py-3 text-md font-bold uppercase tracking-widest"
            >
              Score
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-400 text-center">
          {quiz_set_arr
            .sort((a, b) => (a._id > b._id ? 1 : -1))
            .map((quiz_set_info, index) => (
              <Link
                key={`quiz-set-${index}`}
                href={`/user/${
                  quiz_set_info.is_solved ? "solve" : "quiz-set"
                }/${quiz_set_info._id}`}
              >
                <tr className="cursor-pointer hover:bg-white">
                  <td className="py-4">{index + 1}</td>
                  <td className="py-4">
                    {quiz_set_info.is_solved ? (
                      <div className="text-base text-indigo-500">SOLVED</div>
                    ) : (
                      <div className="text-base text-red-500">NOT YET</div>
                    )}
                  </td>
                  <td className="py-4">
                    {quiz_set_info.is_solved ? (
                      <div className="text-base text-indigo-500">
                        {quiz_set_info.num_correct} / {quiz_set_info.num_quiz}
                      </div>
                    ) : (
                      <div className="text-base text-red-500">
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



const getStaticProps = () => {
  const rest_api_url = process.env.REST_API_URL

  return { props: { rest_api_url } }
}

export { getStaticProps }
export default QuizSetIndexPage
