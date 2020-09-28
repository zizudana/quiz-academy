import { motion } from "framer-motion"
import Link from "next/link"

const IndexPage = () => {
  return (
    <motion.div
      animate={{
        y: [300, -50, 0],
        opacity: [0, 1],
        transition: { duration: 1 },
      }}
    >
      <div className="w-full mx-auto mt-24 max-w-sm rounded border border-opacity-50 border-indigo-700">
        <form className="bg-white shadow-xl rounded px-8 pt-6 pb-8">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="user-email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              id="user-email"
              type="text"
              placeholder="example@naver.com"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="user-password">
              Password
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none placeholder-red-300 placeholder-opacity-75"
              id="user-password"
              type="password"
              placeholder="•••••••••••••••"
            />
          </div>
          <div className="flex items-center justify-between mt-20">
            <button
              className="color-2 hover:bg-indigo-700 hover:shadow-md text-white font-bold text-sm py-2 px-4 rounded focus:outline-none"
              type="button"
            >
              로그인
            </button>
            <Link href="/signup">
              <a className="bg-indigo-500 hover:bg-indigo-800 hover:shadow-md text-white font-bold text-sm  py-2 px-4 rounded focus:outline-none">
                회원가입
              </a>
            </Link>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

export default IndexPage
