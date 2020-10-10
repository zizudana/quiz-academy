import { useState } from "react"
import { motion } from "framer-motion"
import Head from "next/head"

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

const Log = ({ rest_api_url, setDetail }) => {
  const [logArr, setLogArr] = useState([])

  const get_log_arr = async () => {
    const res = await fetch(rest_api_url + "/user-logs/500")
    const json = await res.json()
    const log_arr = json.log_arr

    log_arr.sort(function (a, b) {
      return a.timestamp < b.timestamp ? 1 : a.timestamp > b.timestamp ? -1 : 0
    })

    setLogArr(log_arr)
  }

  get_log_arr()

  return (
    <Layout>
      <div className="mb-4"></div>
      <div className="p-4 border-solid border-2 border-indigo-400">
        <div>
          <button onClick={() => setDetail("main")}>뒤로가기</button>
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
            {logArr.map((user_log, index) => {
              return (
                <tr key={index}>
                  <td className="border border-indigo-200 px-2 py-2 text-center text-sm">{timestamp_to_date(user_log.timestamp)}</td>
                  <td className="border border-indigo-200 px-2 py-2 text-center text-base">{user_log.user_name}</td>
                  <td className="border border-indigo-200 px-5 py-2 text-base">{user_log.log_content}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export default Log
