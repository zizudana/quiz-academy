import Layout from "../../components/layout/layout_user"
import TailSpinSVG from "../../components/svg/tail-spin"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/client"
import axios from "axios"

const NewQuizSetPage = () => {
  const [session, _] = useSession()
  const [is_loading, set_is_loading] = useState(true)
  const [is_timeover, set_is_timeover] = useState(false)

  const num_quiz = 15

  const post_quiz_set = () => {
    const new_quiz_set = {
      student_id: session.user.image,
      num_quiz: num_quiz,
    }

    axios
      .post(`https://editor-api.daechi-on.com/quiz-sets`, new_quiz_set, {
        timeout: 5000,
      })
      .then((response) => {
        console.log(response)
        set_is_loading(false)
      })
      .catch((error) => {
        alert(error)
      })
  }

  useEffect(() => {
    if (session) {
      post_quiz_set()
    }

    setTimeout(() => {
      set_is_timeover(true)
    }, 1500)
  }, [])

  const Loading = () => (
    <Layout>
      <div className="flex flex-col flex-wrap content-center justify-center h-screen">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">문제집 생성 중</h1>
        </div>

        {/* Loading */}
        <div className="mx-auto">
          <TailSpinSVG className="w-20" fill="#000" />
        </div>
      </div>
    </Layout>
  )

  const RedirectMessage = () => (
    <Layout>
      <div className="flex flex-col flex-wrap content-center justify-center h-screen">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">문제집 생성 완료</h1>
        </div>

        {/* Redirect Button */}
        <div className="mx-auto">
          {/* TODO /user/quiz_set/[new_quiz_set_id]로 바로 가도록 수정 */}
          <Link href="/user/quiz-set">
            <a className="inline-flex items-center my-6 px-6 py-2 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white focus:outline-none cursor-pointer">
              신규 문제집 바로가기
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  )

  return (
    <div>{is_loading || !is_timeover ? <Loading /> : <RedirectMessage />}</div>
  )
}

export function getServerSideProps() {
  const rest_api_url = process.env.REST_API_URL

  return { props: { rest_api_url } }
}

export default NewQuizSetPage
