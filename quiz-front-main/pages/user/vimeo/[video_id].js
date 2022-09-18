import { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import { useSession } from "next-auth/client"
import Layout from "../../../components/layout/layout_user"
import Preview from "../../../components/quiz/preview"
import TailSpinSVG from "../../../components/svg/tail-spin"
import CircleLeftSVG from "../../../components/svg/circle-left"
import CircleRightSVG from "../../../components/svg/circle-right"
import { ButtonNormal, DisabledButton } from "../../../components/common/button"


const VideoPlay = ({ rest_api_url }) => {
	const router = useRouter()
  	const { video_id } = router.query
  	const [session, _] = useSession()
  	const [video_data, set_video_data] = useState([])
	console.log("video id",video_id)
	useEffect(() => {
		axios
			.get(`${rest_api_url}/video/id/${video_id}`)
			.then(function (response) {
				const video_info = response.data
				set_video_data(video_info)
				console.log(video_info)
		//set_quiz_set_arr(wrong_quiz_data.quiz_set_arr)
		})
		.catch(function (error) {
		console.error(error)
		})
	}, [])

  
  const myCallback = () => {
	alert('강의가 끝났습니다.')
  }

  return (
    <Layout>
      <div className="flex flex-col flex-wrap content-center justify-center h-screen">
        <div>
			<h1>{video_data.name}</h1>
		  </div>
		  
		  <Vimeo
          video= {video_data.source }
          autoplay
          width="854"
          height="480"
          onEnd={() => myCallback()}
        />

        {/*<iframe id="v_play" src="https://player.vimeo.com/video/713143205?h=db7937585c" width="854" height="480" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen ></iframe>
		    <iframe src="https://player.vimeo.com/video/713143205?h=db7937585c" width="640" height="564" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>*/}
      </div>
    </Layout>
  )

}

const getServerSideProps = () => {
	const rest_api_url = process.env.REST_API_URL

	return { props: { rest_api_url } }
}

export { getServerSideProps }


export default VideoPlay