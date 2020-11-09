import Link from "next/link"

const QuestionHistory = () => {
  const is_click = () => {
    var question_list_button = document.getElementById("question-list")
    question_list_button.classList.toggle("hidden")
  }
  return (
    <>
      <div className="mx-auto p-4 border shadow-lg rounded-lg mb-4">
        <div className="mb-3">
          <div className="flex justify-between">
            <div className="text-lg">사전 질문 목록</div>
            <div>
              <Link href="/user/connector_question?user=테스터">
                <a className="mr-2 text-green-600">새 질문</a>
              </Link>
              <button onClick={() => is_click()}>전체 보기</button>
            </div>
          </div>
          <div id="question-list" className="hidden">
            <div key="1" className="bg-gray-100 rounded p-4">
              <div className="md:flex md:justify-between items-center mb-1">
                <div className="flex items-center">
                  <span className="text-sm">질문1</span>
                </div>
                <div className="text-xs">
                  <span className="mr-1">{"2020.11.09"}</span>
                </div>
              </div>
              <div className="keep-all">어떠케풀어요</div>
            </div>
            <div key="1" className="bg-gray-100 rounded p-4">
              <div className="md:flex md:justify-between items-center mb-1">
                <div className="flex items-center">
                  <span className="text-sm">질문2</span>
                </div>
                <div className="text-xs">
                  <span className="mr-1">{"2020.11.09"}</span>
                </div>
              </div>
              <div className="keep-all">
                시험 조지고 올게! 하지만 언제나 조져지는 것은 저였습니다. 21년 10월 모평 화학 27번 문제에 세포 둘의 자강두천 화학반응을 보니 가슴이
                웅장해집니다. 풀이해주세요.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default QuestionHistory
