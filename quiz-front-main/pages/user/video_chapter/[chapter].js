import React, { useState, useEffect, useReducer, useContext } from "react"
import Layout from "../../../components/layout/layout_user"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import { useSession } from "next-auth/client"
import Preview from "../../../components/quiz/preview"
import TailSpinSVG from "../../../components/svg/tail-spin"

const VideoChapterPage = ({ rest_api_url }) => {
	const router = useRouter()
	const [session, loading] = useSession()
	const [video_data, set_video_data] = useState(null)
	const { chapter } = router.query

	useEffect(() => {
		axios
		  .get(`${rest_api_url}/video/chapter/${chapter}`)
		  .then(function (response) {
			 set_video_data(response.data.video_set_arr)
			 console.log("video",response.data)
		  })
		  .catch(function (error) {
			 console.error(error)
		  })
	 }, [])

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
				동영상 강의
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
					Chapter
					</th>
					<th
					scope="col"
					className="py-3 text-md font-bold uppercase tracking-widest"
					>
					Ended
					</th>
				</tr>
			</thead>
			
			<tbody className="divide-y divide-gray-400 text-center">
          {video_data
            .sort((a, b) => (a._id > b._id ? 1 : -1))
            .map((video_info, index) => (
              <Link
               // key={`wrong-content-${index}`}
                href={`/user/vimeo/${video_info._id}`}
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
	 return <Layout>{video_data ? <Loaded /> : <Loading />}</Layout>
}

const getServerSideProps = () => {
	const rest_api_url = process.env.REST_API_URL
 
	return { props: { rest_api_url } }
 }
export { getServerSideProps }

export default VideoChapterPage