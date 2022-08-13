import Layout from "../../components/layout/layout_user"

import TailSpinSVG from "../../components/svg/tail-spin"
import React from 'react'
import Link from "next/link"
//import {Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/client"
import {BrowserRouter, useLocation} from "react-router-dom"
import {ReactDOM} from 'react-dom'
import axios from "axios"

import QuizSetIndexPage from "./"

// ReactDOM.render(
// 	//<React.StrictMode>
// 		<BrowserRouter>
// 		<QuizSetIndexPage />
// 		</BrowserRouter>
// 	//</React.StrictMode>
// )

const NewQuizSetPage = ({ rest_api_url }) => {
  const [session, _] = useSession()
  const [is_loading, set_is_loading] = useState(true)
  const [is_timeover, set_is_timeover] = useState(false)
  const [new_quiz_set_id, set_new_quiz_set_id] = useState("")

  const num_quiz = 20

  const post_quiz_set = () => {
    const new_quiz_set = {
      student_id: session.user.image,
      num_quiz: num_quiz,
		chapter: 1
		//quiz_set.go에 값 전달됨
		//chapter: props.name,
    }
	console.log(props.chapter)
	
	 
    axios
      .post(`${rest_api_url}/quiz-sets`, new_quiz_set, {
        timeout: 5000,
      })
      .then((response) => {
        set_new_quiz_set_id(response.data.InsertedID)
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
          <Link href={`/user/quiz-set/${new_quiz_set_id}`}>
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

const getStaticProps = () => {
  const rest_api_url = process.env.REST_API_URL

  return { props: { rest_api_url } }
}

export { getStaticProps }

export default NewQuizSetPage