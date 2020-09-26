import PDFDocument from "../components/pdf_document"

import { motion } from "framer-motion"
import { useState } from "react"

const PDFPage = ({ pdf_binary }) => {
  const [index, setIndex] = useState(1)
  const answer_button_array = Array.from(Array(5), (_, i) => i + 1)

  return (
    <>
      {/* 문제 제목 */}
      <div className="w-1/2 mx-auto text-center pt-5 rounded">
        <div className="color-2 text-indigo-100 px-4 py-3 leading-none rounded-full" role="alert">
          <span className="font-semibold text-center flex-auto">3번 문제</span>
        </div>
      </div>

      {/* pdf file */}
      <motion.div
        initial="pageInitial"
        animate="pageAnimate"
        variants={{
          pageInitial: {
            opacity: 0,
          },
          pageAnimate: {
            opacity: 1,
            transition: {
              delay: 0.5,
            },
          },
        }}
      >
        <div className="flex justify-center">
          <PDFDocument pdf_binary={pdf_binary} />
        </div>
      </motion.div>

      <div className="container pr-10 mb-5 fixed h-12 bottom-0 bg-white">
        <div className="grid grid-cols-4 gap-3 px-5">
          <div className="col-span-1 flex justify-start">
            {/* button : 이전 문제 */}
            <button className="bg-gray-300 hover:bg-gray-400 h-full text-gray-800 px-4 rounded flex items-center">
              <span className="hidden sm:block keep-all">이전 문제</span>
              {/* previous icon svg */}
              <svg className="fill-current w-6 h-6 ml-1" enableBackground="new 0 0 64 64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <path d="m37.394 22.567c-.791-.771-2.058-.754-2.828.037l-6.396 6.568c-1.559 1.559-1.559 4.097-.018 5.638l6.415 6.585c.39.403.911.605 1.431.605.503 0 1.007-.188 1.396-.567.791-.771.808-2.037.037-2.828l-6.415-6.623 6.415-6.586c.77-.792.754-2.058-.037-2.829z" />
                <path d="m54.507 36.979c.096.014.19.021.285.021.979 0 1.835-.721 1.978-1.718.152-1.071.229-2.175.229-3.282s-.077-2.211-.229-3.282c-.157-1.094-1.182-1.852-2.263-1.698-1.094.156-1.854 1.168-1.698 2.262.127.884.19 1.799.19 2.718s-.063 1.833-.19 2.718c-.156 1.093.604 2.105 1.698 2.261z" />
                <path d="m32.999 7.999c-13.233 0-24 10.766-24 24s10.767 24 24 24c9.061 0 17.253-5.016 21.381-13.09.502-.983.112-2.188-.871-2.691-.983-.504-2.188-.113-2.691.871-3.439 6.729-10.268 10.91-17.818 10.91-11.028 0-20-8.972-20-20s8.972-20 20-20c7.551 0 14.379 4.181 17.818 10.91.503.983 1.708 1.375 2.691.871.983-.503 1.373-1.708.871-2.691-4.128-8.074-12.32-13.09-21.381-13.09z" />
              </svg>
            </button>
          </div>

          <div className="col-span-2 relative">
            <motion.div
              animate={{
                x: 48 * index - 168,
                transition: {
                  duration: 0.2,
                },
              }}
              className="hidden sm:block absolute bg-yellow-600 w-12 h-12 rounded"
              style={{ left: "50%" }}
            ></motion.div>
            {/* button : 답 선택 */}
            <div id="number-button-group" className="flex w-full h-12 mx-auto items-center justify-center">
              {answer_button_array.map((button_index, index) => (
                <button
                  key={index}
                  className="z-10 bg-yellow-400 hover:bg-yellow-500 w-10 h-10 rounded-lg focus:outline-none mx-1 text-center"
                  onClick={() => setIndex(button_index)}
                >
                  {button_index}
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-1 flex justify-end">
            {/* button : 다음 문제 */}
            <button className="bg-gray-300 hover:bg-gray-400 h-full text-gray-800 px-4 rounded flex items-center">
              {/* next icon svg */}
              <svg className="fill-current w-6 h-6 mr-1" enableBackground="new 0 0 64 64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <path d="m28.604 41.43c.389.379.892.567 1.396.567.521 0 1.041-.202 1.433-.604l6.396-6.567c1.56-1.56 1.56-4.097.019-5.638l-6.414-6.586c-.77-.791-2.037-.808-2.828-.037s-.808 2.037-.037 2.828l6.414 6.624-6.414 6.585c-.773.792-.756 2.058.035 2.828z" />
                <path d="m9.229 28.716c-.152 1.068-.23 2.172-.23 3.283s.078 2.215.23 3.283c.143.998.999 1.718 1.978 1.718.094 0 .189-.007.286-.021 1.093-.156 1.853-1.169 1.697-2.263-.126-.881-.19-1.795-.19-2.717s.064-1.836.19-2.717c.156-1.094-.604-2.107-1.697-2.263-1.1-.16-2.108.603-2.264 1.697z" />
                <path d="m11.618 21.088c-.503.984-.113 2.188.87 2.691.983.5 2.188.113 2.691-.87 3.44-6.73 10.269-10.911 17.819-10.911 11.028 0 20 8.972 20 20s-8.972 20-20 20c-7.551 0-14.379-4.181-17.819-10.911-.503-.984-1.709-1.374-2.691-.87-.983.503-1.373 1.708-.87 2.691 4.128 8.074 12.32 13.089 21.381 13.089 13.233 0 24-10.766 24-24s-10.767-24-24-24c-9.061.002-17.253 5.018-21.381 13.091z" />
              </svg>
              <span className="hidden sm:block keep-all">다음 문제</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

const getServerSideProps = async () => {
  const res = await fetch("http://localhost:51682/users/pdf_test")
  const json = await res.json()
  const pdf_binary = json.name

  return { props: { pdf_binary } }
}

export { getServerSideProps }
export default PDFPage
