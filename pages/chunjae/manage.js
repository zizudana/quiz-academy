import Chart from "../../components/chunjae/chart"
import Log from "../../components/chunjae/log"
import get_money_log from "../../utils/money_log"

import Head from "next/head"
import { useState } from "react"
import { motion } from "framer-motion"
import { Line } from "react-chartjs-2"

const timestamp_to_date = (timestamp) => {
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

const ManagePage = ({ rest_api_url, user_log_arr, money_log_data, money_chart_options }) => {
  const [isChecked, setIsChecked] = useState(false)
  const [errorMessage, setErrorMessage] = useState(undefined)
  const [detailComponent, setDetailComponent] = useState("main")

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
  } else if (detailComponent == "main") {
    return (
      <Layout>
        <div className="mt-3 mb-5 text-center font-semibold text-2xl text-gray-800">천재교육 관리자</div>
        <div className="mb-4 p-4 border-solid border-2 border-indigo-400">
          <div className="mb-4">
            <button
              onClick={() => setDetailComponent("chart")}
              className="text-indigo-900 text-base font-semibold hover:text-white hover:bg-indigo-500 py-1 px-2 border border-blue-500 hover:border-transparent rounded"
            >
              수수료 자세히보기
            </button>
          </div>
          <Line data={money_log_data} options={money_chart_options} />
        </div>
        <div className="p-4 border-solid border-2 border-indigo-400">
          <div>
            <button
              onClick={() => setDetailComponent("log")}
              className="text-indigo-900 text-base font-semibold hover:text-white hover:bg-indigo-500 py-1 px-2 border border-blue-500 hover:border-transparent rounded"
            >
              문제 기록 자세히보기
            </button>
          </div>
          <table className="w-full table-fixed keep-all">
            <thead>
              <tr className="text-xl">
                <th className="w-1/4 px-2 py-2">일시</th>
                <th className="w-1/4 px-2 py-2">학생 이름</th>
                <th className="w-1/2 px-2 py-2">문제 정보</th>
              </tr>
            </thead>
            <tbody>
              {user_log_arr.map((user_log, index) => {
                return (
                  <tr key={index}>
                    <td className="border border-indigo-200 px-2 py-2 text-center text-sm">{timestamp_to_date(user_log.timestamp)}</td>
                    <td className="border border-indigo-200 px-2 py-2 text-center text-base">{user_log.username}</td>
                    <td className="border border-indigo-200 px-5 py-2 text-base">{user_log.logcontent}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Layout>
    )
  } else if (detailComponent == "chart") {
    return <Chart rest_api_url={rest_api_url} setDetail={(detail) => setDetailComponent(detail)} />
  } else if (detailComponent == "log") {
    return <Log rest_api_url={rest_api_url} setDetail={(detail) => setDetailComponent(detail)} />
  } else {
    return <></>
  }
}

const getServerSideProps = async () => {
  const rest_api_url = process.env.REST_API_URL
  const user_log_res = await fetch(rest_api_url + "/user-logs/10")
  const user_log_json = await user_log_res.json()
  const user_log_arr = user_log_json.user_log_arr

  user_log_arr.sort(function (a, b) {
    return a.timestamp < b.timestamp ? 1 : a.timestamp > b.timestamp ? -1 : 0
  })

  const { money_log_data, money_chart_options } = await get_money_log()

  return { props: { rest_api_url, user_log_arr, money_log_data, money_chart_options } }
}

export { getServerSideProps, Layout }
export default ManagePage
