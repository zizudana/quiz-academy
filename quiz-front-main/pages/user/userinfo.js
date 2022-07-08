import React, { useState, useEffect, useReducer, useContext } from "react"
import Layout from "../../components/layout/layout_user"
import axios from "axios"
import { useRouter } from "next/router"
import { useSession } from "next-auth/client"



const showInfo = ({ rest_api_url }) => {
	const [session, _] = useSession()
	// 	const router = useRouter()
	//   	const { user_id } = router.query
	//const [user_info, set_user_info] = useState([])
		// age 
		// email: '',
		// parent_name: '',
		// parent_phone: '',
		// user_id: '',
		// user_name: '',
		// user_phone: 
	const [user_name, set_user_name] = useState([])
	const [user_phone, set_user_phone] = useState([])
	const [user_age, set_user_age] = useState([])
	const [user_email, set_user_email] = useState([])
	const [user_pname, set_user_pname] = useState([])
	const [user_pphone, set_user_pphone] = useState([])

	useEffect(() => {
		if (session) {
	  	const student_id = session.user.image
		//console.log(student_id)
	  	axios
		 	.get(`${rest_api_url}/users/${student_id}`)
		 	.then(function (response) {
				//const user_data = response.data
				//console.log(user_data.age)
				//set_user_info(response.data.age)
				const phone = response.data.user_phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
				const pphone = response.data.parent_phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
				set_user_name(response.data.user_name)
				set_user_phone(phone)
				set_user_age(response.data.age)
				set_user_email(response.data.email)
				set_user_pname(response.data.parent_name)
				set_user_pphone(pphone)
		
		 	})
		 	.catch(function (error) {
				console.error(error)
		 	})
		}
 	}, [session])

	return(
		<Layout>
			<div className="flex items-center justify-between mt-8 mb-4">
        <h1 className="flex">
          <img src="/img/ic_subject_big.svg" className="mr-2" alt="book" />
          학생 정보
        </h1>
      </div>
			<div>이름: {user_name}</div>
			<div>전화번호: {user_phone}</div>
			<div>나이: {user_age}</div>
			<div>이메일: {user_email}</div>
			

			<div className="flex items-center justify-between mt-8 mb-4">
        <h1 className="flex">
          <img src="/img/ic_subject_big.svg" className="mr-2" alt="book" />
					학부모 정보
        </h1>
			</div>
			<div>이름: {user_pname}</div>
			<div>전화번호: {user_pphone}</div>
			
		</Layout>
	)

	
}

const getServerSideProps = () => {
	const rest_api_url = process.env.REST_API_URL
 
	return { props: { rest_api_url } }
 }
export { getServerSideProps }

export default showInfo