import React, { useState, useEffect, useReducer, useContext } from "react"
import Layout from "../../components/layout/layout_user"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import { useSession } from "next-auth/client"
import Preview from "../../components/quiz/preview"
import TailSpinSVG from "../../components/svg/tail-spin"

const VideoList = ({ rest_api_url }) => {
	const [session, loading] = useSession()
	const [video_data, set_video_data] = useState(null)

	useEffect(() => {
	if (session) {
		const student_id = session.user.image
		axios
			.get(`${rest_api_url}/video/chapter/${student_id}`)
			.then(function (response) {
				const wrong_quiz_all = response.data
				set_wrong_quiz_data(wrong_quiz_all.quiz_set_arr)
			//wrong_quiz_data에 틀린 문제 정보 다 들어있음
			//const quiz_id = wrong_quiz_data.quiz_set_arr[0].quiz_id
			//console.log("wrongquiz data",wrong_quiz_all)
			//set_quiz_set_arr(wrong_quiz_data.quiz_set_arr)
			})
			.catch(function (error) {
			console.error(error)
			})
			
	}
	}, [session])

	const Loading = () => (
		<div className="flex flex-col flex-wrap content-center justify-center h-screen">
		  <div className="mx-auto">
			 <TailSpinSVG className="w-20" fill="#000" />
		  </div>
		</div>
	 )
  
	 const Loaded = () => {

		return(
			<>
				<div className="flex items-center justify-between mt-8 mb-4">
			<h1 className="flex">
				<img src="/img/ic_subject_big.svg" className="mr-2" alt="book" />
				오답노트
			</h1>
			</div>
			<table className="w-full divide-y divide-gray-400 border border-color-black-4">
			<thead className="bg-gray-50">
				<tr>
					<th
					scope="col"
					className="py-3 text-md font-bold uppercase tracking-widest"
					>
					Index
					</th>
					<th
					scope="col"
					className="py-3 text-md font-bold uppercase tracking-widest"
					>
					Solved
					</th>
					<th
					scope="col"
					className="py-3 text-md font-bold uppercase tracking-widest"
					>
					Score
					</th>
				</tr>
			</thead>
			
			<tbody className="divide-y divide-gray-400 text-center">
          {wrong_quiz_data
            .sort((a, b) => (a._id > b._id ? 1 : -1))
            .map((quiz_data_info, index) => (
              <Link
               key={`wrong-content-${index}`}
                href={`/user/wrong_content/${quiz_data_info.quiz_id}`}
              >
                <tr className="cursor-pointer hover:bg-white">
                  <td className="py-4">{index + 1}</td>
                 
                  
                </tr>
              </Link>
            ))}
        </tbody>



			</table>
			


			 </>
		)
		
}
return <Layout>{wrong_quiz_data ? <Loaded /> : <Loading />}</Layout>
}
	


const getServerSideProps = () => {
	const rest_api_url = process.env.REST_API_URL
 
	return { props: { rest_api_url } }
 }
export { getServerSideProps }

export default VideoList