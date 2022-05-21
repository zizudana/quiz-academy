import { useState, useEffect } from "react"
import Link from "next/link"
import axios from "axios"
import { useSession } from "next-auth/client"

import Layout from "../../components/layout/layout_user"
import { ButtonNormal } from "../../components/common/button"

const QuizSetIndexPage = () => {
  const [quiz_set_arr, set_quiz_set_arr] = useState([])
  const [session, loading] = useSession()
/*
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
*/
  return (
    <Layout>
      {/* 신규 문제집 신청 */}
      <div className="flex items-center justify-between mt-8 mb-4">
        <h1 className="flex">
          <img src="/img/ic_subject_big.svg" className="mr-2" alt="book" />
          문제집 목록
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
      </table>
    </Layout>
  )
}
/*
const getStaticProps = () => {
  const rest_api_url = process.env.REST_API_URL

  return { props: { rest_api_url } }
}

export { getStaticProps }
*/
export default QuizSetIndexPage
