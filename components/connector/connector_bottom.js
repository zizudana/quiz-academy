import Comment from "./comment"
import Question from "./question"
import QuestionHistory from "./question_history"

const ConnectorBottom = () => {
  return (
    <>
      <div className="mx-auto mt-8 flex rounded-lg" style={{ width: "650px" }}>
        <div className="w-full keep-all">
          <Comment />
          <Question />
          <QuestionHistory />
        </div>
      </div>
    </>
  )
}

export default ConnectorBottom
