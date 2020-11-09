import Comment from "./comment"
import QuestionHistory from "./question_history"

const ConnectorBottom = () => {
  return (
    <>
      <div className="mx-auto mt-8 flex rounded-lg" style={{ width: "650px" }}>
        <div className="w-full keep-all">
          <Comment />
          <QuestionHistory />
        </div>
      </div>
    </>
  )
}

export default ConnectorBottom
