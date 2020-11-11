import ManagerMessage from "../../components/manager/teacher/manager_message"

import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { motion } from "framer-motion"
const axios = require("axios")
import { Scrollbars } from "react-custom-scrollbars"

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
  const router = useRouter()
  const current_panel = router.query.panel

  const [isChecked, setIsChecked] = useState(false)
  const [errorMessage, setErrorMessage] = useState(undefined)
  const [manager_password_input, set_manager_password_input] = useState("")

  const on_change_manager_password_input = (event) => {
    set_manager_password_input(event.target.value)
  }

  const check_manager = async () => {
    axios
      .get(`${rest_api_url}/managers/manager/${manager_password_input}`)
      .then(function (response) {
        // handle success
        const json = response.data

        setIsChecked(json.isChecked)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
        setErrorMessage("비밀번호를 확인해주세요")
      })
  }

  const press_enter_key = (e) => {
    if (e.key === "Enter") {
      check_manager()
    }
  }

  // 현재 사용 중인 패널이면 배경색 변경
  const get_tab_color = (panel_name) => {
    if (panel_name === current_panel) {
      return "bg-gray-100"
    } else {
      return "bg-white"
    }
  }

  if (!isChecked) {
    return (
      <Layout>
        <div className="w-full max-w-xs mt-12 m-auto bg-indigo-100 rounded p-5" onKeyPress={press_enter_key}>
          <img src="/img/DCD_logo.png" alt="logo" className="w-32 mx-auto" />

          <div className="w-full text-center font-bold my-5 text-gray-800 text-xl">대치동 온라인 관리자</div>

          <label className="block mb-2 text-indigo-500" htmlFor="password">
            비밀번호
          </label>
          <input
            className="w-full p-2 mb-6 text-indigo-700 border-b-2 bg-indigo-100 border-indigo-500 outline-none"
            type="password"
            value={manager_password_input}
            onChange={on_change_manager_password_input}
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
        <style jsx global>{`
          body {
            background-color: #f1e7e0;
          }
        `}</style>

        <div className="shadow-custom rounded-xl flex flex-row bg-white" style={{ marginTop: "3vh", height: "92vh" }}>
          {/* left panel */}
          <div className="text-center select-none border-r border-gray-200">
            <div className="border-b border-gray-300 pb-5">
              <img src="/img/DCD_logo_full.png" alt="logo" className="w-64 mx-auto transform scale-90" />
              <span className="text-lg">대치동 온라인 관리자</span>
            </div>

            {/* 교사 목록 */}
            <div className={`py-1 text-xs bg-white border-b border-gray-300`}>교사</div>

            {/* 관리 */}
            <div className={`py-1 text-xs bg-white border-b border-gray-300`}>관리</div>

            <Link href={`/manager?panel=message`}>
              <div className={`py-4 text-sm cursor-pointer ${get_tab_color("message")} border-b border-gray-300 transition duration-500 ease-out`}>
                관리자 메세지
              </div>
            </Link>
          </div>

          {/* right panel */}
          <Scrollbars universal autoHide autoHideTimeout={1000}>
            <div className="w-full px-4 md:px-16 py-8">{current_panel === "message" && <ManagerMessage rest_api_url={rest_api_url} />}</div>
          </Scrollbars>
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
