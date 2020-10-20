import React from "react"
import Link from "next/link"
import Layout from "../../components/layout/layout_guest"

import { csrfToken } from "next-auth/client"

const SignInPage = ({ csrfToken, props }) => {
  return (
    <Layout>
      <div className="w-full max-w-lg mt-12 mx-auto bg-indigo-100 rounded p-6">
        <Link href="/">
          <img src="/img/DCD_logo.png" alt="logo" className="w-32 mx-auto mb-5 cursor-pointer" />
        </Link>
        <form method="post" action="/api/auth/callback/credentials">
          <div>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <label className="block mb-2 text-indigo-500" htmlFor="username">
              Username
            </label>
            <input className="w-full p-2 mb-6 text-indigo-700 border-b-2 bg-indigo-100 border-indigo-500 outline-none" type="text" name="username" />
          </div>
          <div>
            <label className="block mb-2 text-indigo-500" htmlFor="password">
              Password
            </label>
            <input
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 bg-indigo-100 border-indigo-500 outline-none"
              type="password"
              name="password"
            />
          </div>
          <div>
            <p className="mb-1 text-red-600 text-base text-center">{props["error_message"]}</p>
            <button className="w-full bg-indigo-700 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none mb-2" type="submit">
              로그인
            </button>
            <span className="text-gray-500 text-base">아직 회원이 아니라면?</span>
            <Link href="/guest/signup">
              <a className="text-red-400 text-base float-right">회원가입</a>
            </Link>
          </div>
          <style jsx>{`
            input:-webkit-autofill {
              -webkit-box-shadow: 0 0 0 1000px #ebf4ff inset;
            }
          `}</style>
        </form>
      </div>
    </Layout>
  )
}

SignInPage.getInitialProps = async (context) => {
  let message = ""
  if (context.query.error) {
    message = "ID와 비밀번호를 확인해주세요"
  }
  return {
    csrfToken: await csrfToken(context),
    props: { error_message: message }, // will be passed to the page component as props
  }
}

export default SignInPage
