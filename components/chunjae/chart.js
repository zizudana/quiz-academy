import { motion } from "framer-motion"
import Head from "next/head"
import useSWR from "swr"

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

const Chart = ({ rest_api_url, setDetail }) => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data, error } = useSWR(rest_api_url + "/money-logs/500", fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const money_log_arr = data.money_log_arr

  money_log_arr.sort(function (a, b) {
    return a.timestamp < b.timestamp ? 1 : a.timestamp > b.timestamp ? -1 : 0
  })

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
              <th className="w-1/4 px-2 py-2">금액</th>
            </tr>
          </thead>
          <tbody>
            {money_log_arr.map((money_log, index) => {
              return (
                <tr key={index}>
                  <td className="border border-indigo-200 px-2 py-2 text-center text-sm">{timestamp_to_date(money_log.timestamp)}</td>
                  <td className="border border-indigo-200 px-2 py-2 text-center text-base">{money_log.money}</td>
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
  let d = new Date(timestamp * 1000)
  let year = d.getFullYear()
  let month = "" + (d.getMonth() + 1)
  let day = "" + d.getDate()

  if (month.length < 2) month = "0" + month
  if (day.length < 2) day = "0" + day

  return `${year}.${month}.${day}`
}

export default Chart
