import React from "react"
import { csrfToken } from "next-auth/client"

export default function SignIn({ csrfToken }) {
  return (
    <div className="w-full max-w-xs mt-12 m-auto bg-indigo-100 rounded p-5">
      <img src="/img/DCD_logo.png" alt="logo" className="w-32 mx-auto" />
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
          <button className="w-full bg-indigo-700 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none" type="submit">
            Sign in
          </button>
          <a href="/auth/signup" className="text-center text-gray-500 text-xs">
            Sign up
          </a>
        </div>
        <style jsx>{`
          input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0 1000px #ebf4ff inset;
          }
        `}</style>
      </form>
    </div>
  )
}

SignIn.getInitialProps = async (context) => {
  return {
    csrfToken: await csrfToken(context),
  }
}
