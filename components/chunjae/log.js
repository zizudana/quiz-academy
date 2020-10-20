import { useState } from "react"
import { motion } from "framer-motion"
import Head from "next/head"

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

const Log = ({ rest_api_url, setDetail }) => {
  const [user_log_arr, set_user_log_arr] = useState([])

  const get_user_log_arr = async () => {
    const res = await fetch(rest_api_url + "/user-logs/500")
    const json = await res.json()
    const user_log_arr = json.user_log_arr

    user_log_arr.sort(function (a, b) {
      return a.timestamp < b.timestamp ? 1 : a.timestamp > b.timestamp ? -1 : 0
    })

    set_user_log_arr(user_log_arr)
  }

  get_user_log_arr()

  return (
    <Layout>
      <div className="mb-4" />
      <div className="p-4 border-solid border-2 border-indigo-400">
        <div>
          <button
            onClick={() => setDetail("main")}
            className="text-indigo-900 text-base font-semibold hover:text-white hover:bg-indigo-500 py-1 px-2 border border-blue-500 hover:border-transparent rounded"
          >
            뒤로가기
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
}

const timestamp_to_date = (timestamp) => {
  let date = new Date(timestamp * 1000)
  let year = date.getFullYear()
  let month = "" + (date.getMonth() + 1)
  let day = "" + date.getDate()
  let hour = "" + date.getHours()
  let minute = "" + date.getMinutes()
  let second = "" + date.getSeconds()

  if (month.length < 2) month = "0" + month
  if (day.length < 2) day = "0" + day
  if (hour.length < 2) hour = "0" + hour
  if (minute.length < 2) minute = "0" + minute
  if (second.length < 2) second = "0" + second

  return `${year}.${month}.${day} ${hour}:${minute}:${second}`
}

export default Log
