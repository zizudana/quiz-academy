const Question = () => {
  return (
    <>
      <div className="mx-auto p-4 border shadow-lg rounded-lg mb-4">
        <div className="mb-3">
          <span className="text-lg">사전 질문</span>
        </div>
        <input className="w-full px-3 py-2 mb-2 text-gray-800 bg-gray-200 outline-none" type="text" name="question-title" placeholder="제목" />
        <textarea
          className="w-full px-3 py-2 text-gray-800 bg-gray-200 outline-none"
          style={{ resize: "none" }}
          name="question-content"
          rows="5"
          placeholder="내용"
        />
        <div class="grid justify-items-end">
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded focus:outline-none">저장</button>
        </div>
      </div>
    </>
  )
}

export default Question