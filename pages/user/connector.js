import RefreshSVG from "../../components/svg/refresh"
import Layout from "../../components/layout/layout_user"
import ConnectorTop from "../../components/connector/connector_top"
import ConnectorBottom from "../../components/connector/connector_bottom"

import { useSession } from "next-auth/client"
import { useState, useEffect } from "react"
const axios = require("axios")

const ConnectorPage = ({ rest_api_url }) => {
  const [refresh, set_refresh] = useState(0) // 새로고침
  const [qna_list, set_qna_list] = useState([]) // 학생 목록
  const [session, loading] = useSession()

  if (session && !loading) {
    useEffect(() => {
      let tmp_qna_list = []
      axios
        .get(`${rest_api_url}/qnastudents/all/studentid/${session.user.image}`)
        .then(function (response) {
          // handle success

          /**
           * @param {Object} qna_student
           * * @param {String} _id (본인) ID
           * * @param {String} qnaid (부모) 질의응답 ID
           * * @param {String} studentid (부모) 학생 ID
           * * @param {String} studentname 학생 이름
           * * @param {Array} qnaquerylist 상시 질문 목록
           * * @param {Array} qnacommentlist 코멘트 목록
           */
          let tmp_qna_student_list = response.data.qna_student_arr
          tmp_qna_student_list.sort((a, b) => a._id.localeCompare(b._id))

          tmp_qna_student_list.map((qna_student_object) => {
            axios
              .get(`${rest_api_url}/qnas/${qna_student_object.qnaid}`)
              .then(function (response) {
                /**
                 * @param {Object} qna_object
                 * * @param {String} _id (본인) ID
                 * * @param {String} teacherid (부모) 교사 ID
                 * * @param {String} title 제목
                 * * @param {String} content 내용
                 * * @param {String} operatingtime 운영 시간
                 * * @param {String} isopen 운영 여부
                 * * @param {String} zoomlink Zoom 링크
                 * * @param {String} content 내용
                 * * @param {Array} qnastudentlist 질의응답+학생 목록
                 * * @param {Array} qnafeedbacklist 피드백 목록
                 */
                let qna_object = response.data
                tmp_qna_list.push(qna_object)
              })
              .catch(function (error) {
                // handle error
                console.log(error)
              })
          })
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })

      setTimeout(() => {
        set_qna_list(tmp_qna_list)
      }, 500)
    }, [])
  }

  return (
    <Layout>
      {qna_list.map((qna_object, index) => {
        return (
          <div key={"connector-" + index}>
            {/* 새로고침 */}
            <div className="mx-auto mt-8 flex flex-row-reverse" style={{ width: "650px" }}>
              <button className="w-6 h-6 rounded-full p-1 outline-none border border-green-500" onClick={() => set_refresh(refresh + 1)}>
                <RefreshSVG fill="#48bb78" />
              </button>
            </div>

            {/* Top */}
            <ConnectorTop qna_object={qna_object} rest_api_url={rest_api_url} />

            {/* Bottom */}
            <ConnectorBottom qna_object={qna_object} rest_api_url={rest_api_url} />
          </div>
        )
      })}
    </Layout>
  )
}

const getServerSideProps = async () => {
  const rest_api_url = process.env.REST_API_URL

  return { props: { rest_api_url } }
}

export { getServerSideProps }

export default ConnectorPage
