import Layout from "../../components/layout/layout_teacher"
import QnaPanel from "../../components/manager/teacher/qna_panel"
import ManagerMessage from "../../components/manager/teacher/manager_message"

import Link from "next/link"
import { useRouter } from "next/router"
import { signOut } from "next-auth/client"
import { Scrollbars } from "react-custom-scrollbars"

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const test_teacher_id = "teacher1"

const teacherPage = (props) => {
  if (!props) {
    return <div>loading teacherPage props ...</div>
  }

  const router = useRouter()
  let current_panel = router.query.panel

  // 현재 사용 중인 패널이면 배경색 변경
  const get_tab_color = (panel_name) => {
    if (panel_name === current_panel) {
      return "bg-gray-100"
    } else {
      return "bg-white"
    }
  }

  //replaceAll prototype 선언
  String.prototype.replaceAll = function (org, dest) {
    return this.split(org).join(dest)
  }

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
            <img
              src="/img/DCD_logo_full.png"
              alt="logo"
              className="w-64 mx-auto cursor-pointer transition duration-500 ease-in-out transform scale-90 hover:scale-100"
              onClick={signOut}
            />
            <span className="text-lg">김철수 선생님</span>
          </div>

          {/* 질의응답 */}
          <div className={`py-1 text-xs bg-white border-b border-gray-300`}>질의응답</div>

          {props.qna_list.map((qna_object, index) => {
            const qna_title = qna_object.title

            return (
              <div key={index}>
                <Link href={`/manager/teacher?panel=${qna_title}`}>
                  <div
                    className={`py-4 text-sm cursor-pointer ${get_tab_color(qna_title)} border-b border-gray-300 transition duration-500 ease-out`}
                  >
                    {qna_title.replaceAll("_", " ")}
                  </div>
                </Link>
              </div>
            )
          })}

          {/* 관리 */}
          <div className={`py-1 text-xs bg-white border-b border-gray-300`}>관리</div>

          <Link href={`/manager/teacher?panel=message`}>
            <div className={`py-4 text-sm cursor-pointer ${get_tab_color("message")} border-b border-gray-300 transition duration-500 ease-out`}>
              관리자 메세지
            </div>
          </Link>
        </div>

        {/* right panel */}
        <Scrollbars universal autoHide autoHideTimeout={1000}>
          <div className="w-full px-4 md:px-16 py-8">
            {current_panel === "파인애플 물리 질의응답" && <QnaPanel />}

            {props.qna_list.map((qna_object, index) => {
              const qna_title = qna_object.title

              if (current_panel === qna_title) {
                return <QnaPanel key={index} qna_object={qna_object} rest_api_url={props.rest_api_url} />
              }
            })}

            {current_panel === "message" && <ManagerMessage rest_api_url={props.rest_api_url} />}
          </div>
        </Scrollbars>
      </div>
    </Layout>
  )
}

const getServerSideProps = async () => {
  const rest_api_url = process.env.REST_API_URL

  const teacher_object = await fetcher(`${rest_api_url}/teachers/${test_teacher_id}`)

  let qna_list = []

  for (let index = 0; index < teacher_object.questionlist.length; index++) {
    const question_id = teacher_object.questionlist[index]
    const qna_object = await fetcher(`${rest_api_url}/qnas/${question_id}`)

    qna_list.push(qna_object)
  }

  return { props: { rest_api_url, teacher_object, qna_list } }
}

export { getServerSideProps }
export default teacherPage
