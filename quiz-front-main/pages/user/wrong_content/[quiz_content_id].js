import { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/router"

import Layout from "../../../components/layout/layout_user"
import Preview from "../../../components/quiz/preview"
import TailSpinSVG from "../../../components/svg/tail-spin"
import CircleLeftSVG from "../../../components/svg/circle-left"
import CircleRightSVG from "../../../components/svg/circle-right"
import { ButtonNormal, DisabledButton,ButtonRed } from "../../../components/common/button"

const WrongContentPage = ({ rest_api_url }) => {
	const router = useRouter()
	const { quiz_content_id } = router.query
	const [visible,set_visible] = useState(false)

	const [solution_content, set_solution_content] = useState(
		{
			content: "not yet",
			answer: 0,
		}

	)
	const [quiz_content_data, set_quiz_content_data] = useState(
		{
			number: 0,
			content: "<p>Loading contents ...</p>",
		}
	)
	useEffect(() => {
		get_quiz_content(quiz_content_id)


	}, [])

	useEffect(() => {
		if (quiz_content_data) {
			//get_solution_content(quiz_content_id,quiz_content_data.number)
			get_solution_content(quiz_content_id)
		}
	}, [quiz_content_data])

	const delete_wrong = (quiz_content_id) => {
		axios
			.delete(`${rest_api_url}/wrongcontents/${quiz_content_id}`)
			.then(function (response) {
				console.log(response.data)
			})
			.catch(function (error) {
				console.error(error)
			})
		document.location.href('/')
	}
	const get_quiz_content = (quiz_content_id) => {
		axios
			.get(`${rest_api_url}/quizcontents/id/${quiz_content_id}`)
			.then(function (response) {
				set_quiz_content_data(response.data)
			})
			.catch(function (error) {
				console.error(error)
			})
	}
	const get_solution_content = (quiz_content_id) => {

		axios
			.get(`${rest_api_url}/solution-contents/quizid/${quiz_content_id}`)
			.then((response) => {
				set_solution_content(response.data)

			})
			.catch((error) => {
				console.error(error)
			})
	}

	return (
		<Layout>
			<style jsx>
				{`
				  @media print {
					 p {
						display: none;
					 }
				  }
				`}
			</style>


			<div className="flex items-center justify-between mt-8 mb-4">
				<h1 className="flex">
					<img src="/img/ic_subject_big.svg" className="mr-2" alt="book" />
					오답노트
				</h1>
			</div>

		



			<div className="flex mb-32 px-4 justify-between">

				
				{/* 문제 */}
				<div>
				<h1>{quiz_content_data.number}번 문제</h1> <br/>
				<div className="px-8 py-6 bg-white shadow">
					<Preview rest_api_url={rest_api_url} quiz_content={quiz_content_data} />
				</div>
				</div>
				<div>
					<button onClick={()=>{
						set_visible(!visible)
					}}>
						{visible ? 
						<ButtonNormal className="px-4 py-2">풀이 닫기</ButtonNormal> : <ButtonNormal className="px-4 py-2">풀이 보기</ButtonNormal>}
					</button>
				</div>
				{/* 답지 */}
				{visible ?
				<div>
				<h1>풀이</h1> <br/>
				<div className="px-8 py-6 bg-white shadow">

					<Preview
						rest_api_url={rest_api_url}
						quiz_content={solution_content}
					/>
					<br /><br />
					답: {solution_content.answer}
				</div>
				</div>: <div></div>}
				<div className="w-24" />
				{/* <div>
					<ButtonRed>문제 제거</ButtonRed>
				</div> */}
			</div>
			

		</Layout>
	)
}


const getServerSideProps = () => {
	const rest_api_url = process.env.REST_API_URL

	return { props: { rest_api_url } }
}

export { getServerSideProps }

export default WrongContentPage