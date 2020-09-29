import { motion } from "framer-motion"
import Link from "next/link"
import Layout from "../../components/layout"

const InvalidUserPage = () => {
  return (
    <Layout>
      <motion.div
        animate={{
          opacity: [0, 1],
          transition: { duration: 0.5 },
        }}
      >
        <div className="w-full mx-auto mt-24 max-w-sm rounded border border-opacity-50 border-indigo-700">다시 시도해주세요.</div>
      </motion.div>
    </Layout>
  )
}

export default InvalidUserPage
