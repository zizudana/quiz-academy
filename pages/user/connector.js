import RefreshSVG from "../../components/svg/refresh"
import Layout from "../../components/layout/layout_user"
import ConnectorTop from "../../components/connector/connector_top"
import ConnectorBottom from "../../components/connector/connector_bottom"

import { useSession } from "next-auth/client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
const axios = require("axios")

const ConnectorPage = ({ rest_api_url }) => {
  const [refresh, set_refresh] = useState(0) // 새로고침
  const [current_qna, set_current_qna] = useState(0) // 선택한 질의응답 번호
  const [qna_student_list, set_qna_student_list] = useState([]) // 질의응답 목록
  const [qna_list, set_qna_list] = useState([]) // 질의응답 목록
  const [session, loading] = useSession()

  useEffect(() => {
    let tmp_qna_student_list = []
    let tmp_qna_list = []

    if (session && !loading) {
      // qna_student_list 불러오기
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
          tmp_qna_student_list = response.data.qna_student_arr
          tmp_qna_student_list.sort((a, b) => a._id.localeCompare(b._id))

          tmp_qna_student_list.map((qna_student_object) => {
            // qna_object 불러오기
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
                qna_object.title = qna_object.title.replaceAll("_", " ")
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
    }

    const set_states = () => {
      set_qna_student_list(tmp_qna_student_list)
      set_qna_list(tmp_qna_list)
    }

    setTimeout(() => {
      set_states()
    }, 500)
  }, [refresh, session, loading])

  if (!session || loading) {
    return null
  }

  return (
    <Layout>
      {/* 새로고침 */}
      <div className="mx-auto mt-8 flex flex-row-reverse" style={{ width: "650px" }}>
        <button className="w-6 h-6 rounded-full p-1 outline-none border border-green-500" onClick={() => set_refresh(refresh + 1)}>
          <RefreshSVG fill="#48bb78" />
        </button>
      </div>

      {/* navigation */}
      {1 < qna_list.length && (
        <div className="border-b border-black">
          <table className="w-full table-fixed">
            <tbody>
              <tr>
                {qna_list.map((qna_object, index) => {
                  return (
                    <td
                      className="text-center py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        set_current_qna(index)
                      }}
                    >
                      {qna_object.title}
                    </td>
                  )
                })}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {0 < qna_list.length &&
        qna_student_list.map((qna_student_object, index) => {
          if (current_qna == index) {
            return (
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                key={"connector-" + index}
              >
                {/* Top */}
                <ConnectorTop refresh={refresh} qna_object={qna_list[index]} rest_api_url={rest_api_url} />

                {/* Bottom */}
                <ConnectorBottom refresh={refresh} qna_student_id={qna_student_object._id} rest_api_url={rest_api_url} />
              </motion.div>
            )
          }
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
