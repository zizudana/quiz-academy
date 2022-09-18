import React, { useState, useEffect, useReducer, useContext } from "react"
import Link from "next/link"

import axios from "axios"
import { useSession } from "next-auth/client"

import Layout from "../../components/layout/layout_user"
import { ButtonNormal,DisabledButton, ButtonGreen } from "../../components/common/button"

const WrongMainPage = ({ rest_api_url }) => {
	
	return (
		<Layout>
			{/*오답노트*/}
		<div>
			<div className="flex items-center justify-between mt-8 mb-4">
				<h1 className="flex">
					<img src="/img/ic_subject_big.svg" className="mr-2" alt="book" />
					오답노트
				</h1>
			</div>

			 {/*오답노트 목록*/}
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
            {/* <th
              scope="col"
              className="py-3 text-md font-bold uppercase tracking-widest"
            >
              Wrong
            </th> */}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-400 text-center">
          {
          <Link href="/user/wrong_chapter/1">
            <tr className="cursor-pointer hover:bg-white">
              <td className="py-4">1</td>
              <td className="py-4">
                <div className="text-base text-indigo-500">
                  1장. 화학의 첫걸음 
                </div>
              </td> 
				 
            </tr>
          </Link>
          }
        </tbody>

		  <tbody className="divide-y divide-gray-400 text-center">
          {
          <Link href="/user/wrong_chapter/2">
            <tr className="cursor-pointer hover:bg-white">
              <td className="py-4">2</td>
              <td className="py-4">
                <div className="text-base text-indigo-500">
                  2장. 원자의 세계
                </div>
              </td>
            </tr>
          </Link>
          }
        </tbody>

		  <tbody className="divide-y divide-gray-400 text-center">
          {
          <Link href="/user/wrong_chapter/3">
            <tr className="cursor-pointer hover:bg-white">
              <td className="py-4">3</td>
              <td className="py-4">
                <div className="text-base text-indigo-500">
                  3장. 화학 결합과 원자의 세계
                </div>
              </td>
            </tr>
          </Link>
          }
        </tbody> 

		  <tbody className="divide-y divide-gray-400 text-center">
          {
          <Link href="/user/wrong_chapter/4">
            <tr className="cursor-pointer hover:bg-white">
              <td className="py-4">4</td>
              <td className="py-4">
                <div className="text-base text-indigo-500">
                  4장. 역동적인 화학 반응 
                </div>
              </td> 
            </tr>
          </Link>
          }
        </tbody>	 

      </table>					
	</div>
</Layout>
	)
}	


const getStaticProps = () => {
	const rest_api_url = process.env.REST_API_URL
 
	return { props: { rest_api_url}}
 }
 
 export { getStaticProps }
 export default WrongMainPage