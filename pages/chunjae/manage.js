import { useState } from "react"

const ManagePage = ({ rest_api_url }) => {
  const [isChecked, setIsChecked] = useState(false)

  const check_manager = async () => {
    const manager_password = document.getElementById("manager-password").value
    const res = await fetch(rest_api_url + "/managers/" + manager_password)
    const json = await res.json()
    setIsChecked(json.isChecked)
  }

  if (!isChecked) {
    return (
      <div className="w-full max-w-xs mt-12 m-auto bg-indigo-100 rounded p-5">
        <img src="/img/DCD_logo.png" alt="logo" className="w-32 mx-auto" />

        <div className="w-full text-center font-bold my-5 text-gray-800 text-xl">천재교육 관리자</div>

        <label className="block mb-2 text-indigo-500" htmlFor="password">
          Password
        </label>
        <input
          id="manager-password"
          className="w-full p-2 mb-6 text-indigo-700 border-b-2 bg-indigo-100 border-indigo-500 outline-none"
          type="password"
          name="password"
        />

        <div>
          <button
            className="w-full bg-indigo-700 hover:bg-yellow-500 text-white font-bold py-2 px-4 mb-6 rounded focus:outline-none"
            onClick={check_manager}
          >
            접속
          </button>
        </div>

        <style jsx>{`
          input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0 1000px #ebf4ff inset;
          }
        `}</style>
      </div>
    )
  } else {
    return <>hello</>
  }
}

const getServerSideProps = async () => {
  const rest_api_url = process.env.REST_API_URL

  return { props: { rest_api_url } }
}

export { getServerSideProps }
export default ManagePage
