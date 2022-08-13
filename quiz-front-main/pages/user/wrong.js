import React, { useState, useEffect, useReducer, useContext } from "react"
import Layout from "../../components/layout/layout_user"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import { useSession } from "next-auth/client"
import Preview from "../../components/quiz/preview"
import TailSpinSVG from "../../components/svg/tail-spin"

const QuizWrongIndexPage = ({ rest_api_url }) => {
	//const [quiz_set_arr, set_quiz_set_arr] = useState([])
	const [session, loading] = useSession()
	const [quiz_set_data, set_quiz_set_data] = useState(null)
	const [quiz_content, set_quiz_content] = useState({
      number: 0,
      content: "<p>Loading contents ...</p>",
    })
	useEffect(() => {
	if (session) {
		const student_id = session.user.image
		axios
			.get(`${rest_api_url}/wrongcontents/all/${student_id}`)
			.then(function (response) {
				const wrong_quiz_data = response.data
				set_quiz_set_data(wrong_quiz_data.quiz_set_arr)
				
			//const quiz_id = quiz_set_data.quiz_set_arr[0].quiz_id
			// console.log("aaaaaa",quiz_id)
			//set_quiz_set_arr(quiz_set_data.quiz_set_arr)
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
		const answer_button_array = Array.from(Array(5), (_, i) => i + 1)
		const [solving_number, set_solving_number] = useState(0) // 현재 풀고 있는 문제 번호
		const [solution_content_array, set_solution_content_array] = useState(null)
		const [quiz_content, set_quiz_content] = useState({
		  number: 0,
		  content: "<p>Loading contents ...</p>",
		})
		

		useEffect(() => {
			//get_quiz_set(quiz_solving.quiz_set_id)
			get_solution_content_array(0)
		 }, [])

		useEffect(() => {
			get_quiz_content(0)
		 }, [])
  

		const get_solution_content_array = (quiz_content_index) => {
			const quiz_content_id =
			quiz_set_data[quiz_content_index].quiz_id
			const quiz_number = quiz_set_data[quiz_content_index].number
			
			axios
			  .get(`${rest_api_url}/solution-contents/quizid/${quiz_content_id}/${quiz_number}`)
			  .then((response) => {
				 set_solution_content_array(response.data)
				 
			  })
			  .catch((error) => {
				 console.error(error)
			  })
		 } 



		const get_quiz_content = (quiz_content_index) => {
			const quiz_content_id =
			quiz_set_data[quiz_content_index].quiz_id
			
			axios
			.get(`${rest_api_url}/quizcontents/id/${quiz_content_id}`)
			.then(function (response) {
				
				console.log(response.data) /////////////////////////////////////////////////
				set_quiz_content(response.data)
				
			})
			.catch(function (error) {
				if (error.response) {
					// 응답이 2xx가 아닌 경우
					console.log("FAIL axios quizcontents : not 2xx", error.response)

					if (error.response.status === 500) {
					// 요청한 number가 없는 경우 
					set_quiz_content({
						number:  1,  
						content: `
							<p>${quiz_content_id} - 문제를 불러오지 못했습니다.</p>
							<p>관리자에게 문의해주세요.</p>
						`,
					})
					}
				} else if (error.request) {
					// 응답을 받지 못한 경우
					console.log("FAIL axios quizcontents : no response", error.request)
				} else {
					// 요청에서 에러 발생
					console.log(
					"FAIL axios quizcontents : request error",
					error.message
					)
				}
			})
		}
		


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
			
			</table>
			<div className="px-8 py-6 bg-white shadow">
            <Preview rest_api_url={rest_api_url} quiz_content={quiz_content} />
				{solution_content_array && (
              <div className="block xl:hidden">
					<hr className="block xl:hidden my-6 border-color-black-1 w-full" />
                <Preview
                  rest_api_url={rest_api_url}
                  quiz_content={solution_content_array}
                />
              </div>
            )}
			 
			 </div>


			 </>
		)
		
}
return <Layout>{quiz_set_data ? <Loaded /> : <Loading />}</Layout>
}
	


const getServerSideProps = () => {
	const rest_api_url = process.env.REST_API_URL
 
	return { props: { rest_api_url } }
 }
export { getServerSideProps }

export default QuizWrongIndexPage