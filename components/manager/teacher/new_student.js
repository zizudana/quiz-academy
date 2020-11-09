import XSVG from "../../svg/x"

import Link from "next/link"
import { useRouter } from "next/router"
import { motion } from "framer-motion"

const NewStudent = () => {
  const router = useRouter()
  let current_panel = router.query.panel

  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
      >
        <div className="flex flex-row-reverse">
          <Link href={`/manager/teacher?panel=${current_panel}`}>
            <button className="w-6 h-6 border-2 border-red-500 rounded-full p-1 outline-none">
              <XSVG />
            </button>
          </Link>
        </div>

        <div className="text-center text-xl mb-4">학생 목록</div>

        <table className="table-auto mx-auto">
          <thead>
            <tr>
              <th className="px-3 py-2">이름</th>
              <th className="px-3 py-2">번호</th>
              <th className="px-3 py-2">+</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-3 py-2">김철수</td>
              <td className="border px-3 py-2">010-1234-1234</td>
              <td className="border px-3 py-2">
                <button className="bg-indigo-400 hover:bg-indigo-600 text-white px-2 py-1 rounded outline-none">추가</button>
              </td>
            </tr>
            <tr>
              <td className="border px-3 py-2">김철수</td>
              <td className="border px-3 py-2">010-1234-1234</td>
              <td className="border px-3 py-2">
                <button className="bg-indigo-400 hover:bg-indigo-600 text-white px-2 py-1 rounded outline-none">추가</button>
              </td>
            </tr>
            <tr>
              <td className="border px-3 py-2">김철수</td>
              <td className="border px-3 py-2">010-1234-1234</td>
              <td className="border px-3 py-2">
                <button className="bg-indigo-400 hover:bg-indigo-600 text-white px-2 py-1 rounded outline-none">추가</button>
              </td>
            </tr>
            <tr>
              <td className="border px-3 py-2">김철수</td>
              <td className="border px-3 py-2">010-1234-1234</td>
              <td className="border px-3 py-2">
                <button className="bg-indigo-400 hover:bg-indigo-600 text-white px-2 py-1 rounded outline-none">추가</button>
              </td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </>
  )
}

export default NewStudent
