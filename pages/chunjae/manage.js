import { useState } from "react"
import { motion } from "framer-motion"
import Head from "next/head"

const timestamp_to_date = (timestamp) => {
  timestamp = 1575529680
  let d = new Date(timestamp * 1000)
  let year = d.getFullYear()
  let month = "" + (d.getMonth() + 1)
  let day = "" + d.getDate()
  let hour = "" + d.getHours()
  let minute = "" + d.getMinutes()
  let second = "" + d.getSeconds()

  if (month.length < 2) month = "0" + month
  if (day.length < 2) day = "0" + day
  if (hour.length < 2) hour = "0" + hour
  if (minute.length < 2) minute = "0" + minute
  if (second.length < 2) second = "0" + second

  return `${year}.${month}.${day} ${hour}:${minute}:${second}`
}

const Layout = ({ children }) => (
  <>
    <Head>
      <title>DCD On : 천재교육 관리자</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="container mx-auto mb-5">
      <motion.div
        initial="pageInitial"
        animate="pageAnimate"
        variants={{
          pageInitial: {
            opacity: 0,
          },
          pageAnimate: {
            opacity: 1,
          },
        }}
      >
        {children}
      </motion.div>
    </main>
  </>
)

const ManagePage = ({ rest_api_url }) => {
  const [isChecked, setIsChecked] = useState(false)
  const [errorMessage, setErrorMessage] = useState(undefined)

  const check_manager = async () => {
    const manager_password = document.getElementById("manager-password").value
    const res = await fetch(rest_api_url + "/managers/" + manager_password)
    const json = await res.json()
    setIsChecked(json.isChecked)
    setErrorMessage("비밀번호를 확인해주세요")
  }

  if (isChecked) {
    return (
      <Layout>
        <div className="w-full max-w-xs mt-12 m-auto bg-indigo-100 rounded p-5">
          <img src="/img/DCD_logo.png" alt="logo" className="w-32 mx-auto" />

          <div className="w-full text-center font-bold my-5 text-gray-800 text-xl">천재교육 관리자</div>

          <label className="block mb-2 text-indigo-500" htmlFor="password">
            비밀번호
          </label>
          <input
            id="manager-password"
            className="w-full p-2 mb-6 text-indigo-700 border-b-2 bg-indigo-100 border-indigo-500 outline-none"
            type="password"
            name="password"
          />

          <div>
            <p className="mb-1 text-red-600 text-base text-center">{errorMessage}</p>
            <button
              className="w-full bg-indigo-700 hover:bg-yellow-500 text-white font-bold py-2 px-2 mb-6 rounded focus:outline-none"
              onClick={check_manager}
            >
              접속
            </button>
          </div>

          <style jsx>{`
            input:-webkit-autofill {
              -webkit-box-shadow: 0 0 0 1000px #ebf4ff inset;
            }
          `}</style>
        </div>
      </Layout>
    )
  } else {
    return (
      <Layout>
        <div className="mb-4"></div>
        <div className="p-4 border-solid border-2 border-indigo-400">
          <table className="w-full table-fixed keep-all">
            <thead>
              <tr className="text-xl">
                <th className="w-1/4 px-2 py-2">일시</th>
                <th className="w-1/4 px-2 py-2">학생 이름</th>
                <th className="w-1/2 px-2 py-2">문제 정보</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-indigo-200 px-2 py-2 text-center text-sm">{timestamp_to_date(1575529680)}</td>
                <td className="border border-indigo-200 px-2 py-2 text-center text-base">Adam</td>
                <td className="border border-indigo-200 px-5 py-2 text-base">천재교육 1번 교과서 문제집 9주차 3번 문제</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Layout>
    )
  }
}

const getServerSideProps = async () => {
  const rest_api_url = process.env.REST_API_URL

  return { props: { rest_api_url } }
}

export { getServerSideProps, Layout }
export default ManagePage
