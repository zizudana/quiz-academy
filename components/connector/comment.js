const Comment = ({ qna_comment_list }) => {
  return (
    <>
      <div className="w-full p-4 border shadow-lg rounded-lg mb-4">
        <div className="text-lg mb-2">이번 주의 코멘트</div>
        {0 < qna_comment_list.length && <div className="text-gray-800">{qna_comment_list[0].content}</div>}
      </div>
    </>
  )
}

export default Comment
