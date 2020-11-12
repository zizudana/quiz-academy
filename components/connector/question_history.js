import Link from "next/link"

const QuestionHistory = ({ qna_student_id, qna_query_list }) => {
  const is_click = () => {
    var question_list_button = document.getElementById("question-list")
    question_list_button.classList.toggle("hidden")
  }

  return (
    <>
      <div className="mx-auto p-4 border shadow-lg rounded-lg mb-4">
        <div className="flex justify-between mb-3">
          <div className="text-lg">사전 질문 목록</div>
          <div>
            <Link href={`/user/connector_question?qna_student_id=${qna_student_id}`}>
              <a className="mr-2 text-green-600">새 질문</a>
            </Link>
            <button className="outline-none" onClick={() => is_click()}>
              전체 보기
            </button>
          </div>
        </div>
        <div id="question-list" className="hidden">
          {qna_query_list.map((qna_query_object, index) => {
            return (
              <div key={index} className="bg-gray-100 rounded p-4 mb-2">
                <div className="md:flex md:justify-between items-center mb-1">
                  <div className="flex items-center">
                    {qna_query_object.ischecked !== "true" && (
                      <div className="bg-red-600 mx-2" style={{ width: "5px", height: "5px", borderRadius: "50%" }} />
                    )}
                    <span className="text-sm">{qna_query_object.title}</span>
                  </div>
                  <div className="text-xs">
                    <span className="mr-1">{timestamp_to_date(qna_query_object.timestamp)}</span>
                  </div>
                </div>
                <div className="keep-all">{qna_query_object.content}</div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

const timestamp_to_date = (timestamp) => {
  let date = new Date(timestamp * 1000)
  let year = date.getFullYear()
  let month = "" + (date.getMonth() + 1)
  let day = "" + date.getDate()

  if (month.length < 2) month = "0" + month
  if (day.length < 2) day = "0" + day
  return `${year}.${month}.${day}`
}

export default QuestionHistory
