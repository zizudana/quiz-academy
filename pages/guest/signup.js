import Layout from "../../components/layout/layout_guest"

import React, { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

const SignUp = () => {
  var checkUnique = 0
  const router = useRouter()
  const [message_color, set_message_color] = useState("text-gray-500")
  const [id_alert_message, set_alert_message] = useState("영어, 숫자, 밑줄(_)로 구성된 6~20자의 문자")

  const Submit = () => {
    var SubmitDict = {}
    var tmp_password = document.getElementById("grid-password").value
    var tmp_password_check = document.getElementById("grid-password-isCorrect").value
    var tmp_phone = document.getElementById("grid-phone-number").value
    var tmp_parent_phone = document.getElementById("grid-parent-phone-number").value
    var state_age = document.getElementById("grid-state")
    var pattern_pw = /[a-zA-Z]/
    var pattern_pw_spc = /[/_/~/!/@/#/$/%/^/&/-]/
    var pattern_pw_num = /[0-9]/
    var pattern_mail_spc = /@/
    var passRule = /^\d{3}\d{3,4}\d{4}$/

    if (state_age.selectedIndex == 6) {
      state_age = 0
    } else {
      state_age = 14 + state_age.selectedIndex
    }

    if (tmp_password != tmp_password_check) {
      alert("비밀번호가 일치하지 않습니다. 다시 입력해주세요.")
    } else if (tmp_password.length < 6 || tmp_password.length > 20) {
      alert("비밀번호를 6자 이상~ 20자 이하로 설정해주세요.")
    } else if (!(pattern_pw.test(tmp_password) && pattern_pw_num.test(tmp_password) && pattern_pw_spc.test(tmp_password))) {
      alert("비밀번호를 영어, 숫자, 특수문자(_-!@#$%^&*)를 조합해 만들어주세요.")
    } else if (!pattern_mail_spc.test(document.getElementById("grid-email").value)) {
      alert("이메일 형식을 지켜주세요.")
    } else if (!passRule.test(tmp_phone)) {
      alert("연락처 형식을 지켜주세요.")
    } else if (document.getElementById("grid-name").value == "" || tmp_phone == "") {
      alert("학생 정보(이름, 연락처)를 입력해주세요.")
    } else if (document.getElementById("grid-parent-name").value == "" || tmp_parent_phone == "") {
      alert("학부모 정보(이름, 연락처)를 입력해주세요.")
    } else if (checkUnique != 1) {
      alert("ID 중복체크를 완료해주세요.")
    } else {
      SubmitDict["user_type"] = "student"
      SubmitDict["id"] = document.getElementById("grid-id").value
      SubmitDict["password"] = tmp_password
      SubmitDict["email"] = document.getElementById("grid-email").value
      SubmitDict["user_name"] = document.getElementById("grid-name").value
      SubmitDict["user_phone"] = tmp_phone
      SubmitDict["parent_name"] = document.getElementById("grid-parent-name").value
      SubmitDict["parent_phone"] = tmp_parent_phone
      SubmitDict["age"] = state_age

      SendDict(SubmitDict)
    }
  }
  const SendDict = (SubmitDict) => {
    var xhr = new XMLHttpRequest()
    var url = "https://api.web-academy.ml/users"
    xhr.open("POST", url, true)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var json = JSON.parse(xhr.responseText)
        console.log(json)
      }
    }
    var data = JSON.stringify(SubmitDict)
    xhr.send(data)
    moveHref()
  }

  const moveHref = () => {
    alert("회원가입을 완료했습니다. 가입 정보로 로그인 해주세요.")
    router.push("/guest/signin")
  }

  const numberCheck = () => {
    var number = document.getElementById("grid-phone-number").value.replace(/[^0-9]/g, "")
    console.log(number)
  }

  const numberCheckParent = () => {
    var number = document.getElementById("grid-parent-phone-number").value.replace(/[^0-9]/g, "")
    console.log(number)
  }

  const isUnique = () => {
    var pattern_id = /[0-9a-zA-Z_]/
    var pattern_num = /[0-9]/ // 숫자
    var pattern_eng = /[a-zA-Z]/ // 문자
    // var pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/ // 특수문자
    var pattern_spc = /_/
    var pattern_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/ // 한글체크
    var idcheck = document.getElementById("grid-id").value
    var id_alert_message = document.getElementById("id_alert_message").value

    if (idcheck.length < 6) {
      set_alert_message("아이디를 더 길게 설정해주세요.")
    } else if (idcheck.length > 20) {
      set_alert_message("아이디를 20글자보다 짧게 설정해주세요.현재 아이디는 " + idcheck.length + "글자 입니다.")
    } else {
      for (var tmp = 0; tmp < idcheck.length; tmp++) {
        if (pattern_id.test(idcheck.charAt(tmp))) {
          checkUnique = 1
        } else {
          set_alert_message("아이디에는 영문, 숫자, 밑줄(_)만 들어갈 수 있습니다.")
          checkUnique = 0
          break
        }
      }
    }

    if (checkUnique == 1) {
      set_alert_message("사용가능한 ID입니다.")
      set_message_color("text-blue-500")
    } else {
      set_message_color("text-red-500")
    }
  }

  const press_enter_key = (e) => {
    if (e.key === "Enter") {
      Submit()
    }
  }

  return (
    <Layout>
      <div className="max-w-lg shadow-md rounded bg-indigo-100 px-8 pt-6 pb-8 mx-auto mt-12 mb-12 flex flex-col my-2" onKeyPress={press_enter_key}>
        <Link href="/guest/signin">
          <img src="/img/DCD_logo.png" alt="logo" className="w-20 mx-auto mb-5 cursor-pointer" />
        </Link>
        <div className="-mx-3 md:flex mb-2">
          <div className="md:w-full px-3">
            <label className="pl-2 uppercase tracking-wide text-grey-darker text-sm" htmlFor="grid-id">
              <span>아이디</span>
            </label>
            <button
              className="float-right w-20 h-5 text-xs bg-indigo-600 text-center hover:bg-indigo-500 text-white rounded focus:outline-none"
              type="button"
              id="btn-id-isUnique"
              onClick={isUnique}
            >
              중복체크
            </button>

            <input
              className="appearance-none block focus:outline-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mt-2"
              id="grid-id"
              type="text"
              placeholder="아이디 입력"
              autoComplete="off"
            />
            <p className={`${message_color} text-xs mb-3 pl-3`} id="id_alert_message">
              {id_alert_message}
            </p>
          </div>
        </div>
        <div className="-mx-3 md:flex mb-2">
          <div className="md:w-full px-3">
            <label className="pl-2 block uppercase tracking-wide text-grey-darker text-sm mb-2" htmlFor="grid-password">
              비밀번호
            </label>
            <input
              className="appearance-none block w-full focus:outline-none bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
              id="grid-password"
              type="password"
              placeholder="비밀번호 입력"
            />
            <input
              className="appearance-none block w-full focus:outline-none bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              id="grid-password-isCorrect"
              type="password"
              placeholder="비밀번호 확인"
            />
            <p className={`text-gray-500 text-xs mb-3 pl-3`} id="id_alert_message">
              영어, 숫자, 특수문자(_-!@#$%^&*)로 구성된 6~20자
            </p>
          </div>
        </div>
        <div className="-mx-3 md:flex mb-2">
          <div className="md:w-full px-3">
            <label className="pl-2 block uppercase tracking-wide focus:outline-none text-grey-darker text-sm mb-2" htmlFor="grid-email">
              이메일
            </label>
            <input
              className="appearance-none block focus:outline-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
              id="grid-email"
              type="email"
              placeholder="abcd@mail.com"
              autoComplete="off"
            />
          </div>
        </div>
        <div className="-mx-3 md:flex">
          <div className="md:w-2/5 px-3 md:pr-3 mb-2">
            <label className="pl-2 block uppercase tracking-wide text-grey-darker text-sm mb-2" htmlFor="grid-first-name">
              학생 이름
            </label>
            <input
              className="appearance-none block focus:outline-none w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
              id="grid-name"
              type="text"
              placeholder="이름"
              autoComplete="off"
            />
          </div>
          <div className="md:w-3/5 px-3 mb-2">
            <label className="pl-2 block uppercase tracking-wide text-grey-darker text-sm mb-2" htmlFor="grid-last-name">
              학생 연락처
            </label>
            <input
              className="appearance-none block focus:outline-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              id="grid-phone-number"
              type="tel"
              placeholder="숫자만 입력해주세요."
              autoComplete="off"
              onKeyUp={() => {
                numberCheck()
              }}
            />
          </div>
        </div>
        <div className="-mx-3 md:flex">
          <div className="md:w-2/5 px-3 mb-2 ">
            <label className="pl-2 block uppercase tracking-wide text-grey-darker text-sm mb-2" htmlFor="grid-parent-name">
              학부모 이름
            </label>
            <input
              className="appearance-none block focus:outline-none w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
              id="grid-parent-name"
              type="text"
              placeholder="이름"
              autoComplete="off"
            />
          </div>
          <div className="md:w-3/5 px-3 mb-2">
            <label className="pl-2 block uppercase tracking-wide text-grey-darker text-sm mb-2" htmlFor="grid-last-name">
              학부모 연락처
            </label>
            <input
              className="appearance-none block focus:outline-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              id="grid-parent-phone-number"
              type="tel"
              placeholder="숫자만 입력해주세요."
              autoComplete="off"
              onKeyUp={() => {
                numberCheckParent()
              }}
            />
          </div>
        </div>

        <div className="-mx-3 md:flex mb-2">
          <div className="md:w-1/2 px-3">
            <label className="pl-2 block uppercase tracking-wide text-sm mb-2" htmlFor="grid-state">
              학년
            </label>
            <div className="relative">
              <select className="block appearance-none w-full focus:outline-none bg-grey-lighter border py-3 pl-4 pr-8 rounded" id="grid-state">
                <option>중1</option>
                <option>중2</option>
                <option>중3</option>
                <option>고1</option>
                <option>고2</option>
                <option>고3</option>
                <option>해당없음</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 px-3">
            <label className="pl-2 block uppercase tracking-wide text-grey-darker text-sm mb-2" htmlFor="grid-state">
              ㅤ
            </label>
            <button
              id="submit-btn"
              className="w-full bg-indigo-700 hover:bg-indigo-300 text-white font-bold py-3 px-4 mb-12 rounded focus:outline-none"
              type="submit"
              onClick={Submit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SignUp
