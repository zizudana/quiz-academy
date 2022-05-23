import { useState } from "react"
import Link from "next/link"
import Router from "next/router"
const axios = require("axios")

import Layout from "../../components/layout/layout_guest"
import { InputNormal } from "../../components/common/input"
import { ButtonNormal, DisabledButton } from "../../components/common/button"

const SignUp = ({ rest_api_url }) => {
  const [id_input, set_id_input] = useState("")
  const [is_unique_id, set_is_unique_id] = useState(false)
  const [password_input, set_password_input] = useState("")
  const [password2_input, set_password2_input] = useState("")
  const [email_input, set_email_input] = useState("")
  const [student_name_input, set_student_name_input] = useState("")
  const [student_phone_input, set_student_phone_input] = useState("")
  const [student_age_select, set_student_age_select] = useState(-1)
  const [parent_name_input, set_parent_name_input] = useState("")
  const [parent_phone_input, set_parent_phone_input] = useState("")
  const [is_post_loading, set_is_post_loading] = useState(false)

  const set_id_input_custom = (user_input) => {
    // 아이디 새로 입력하면 중복 체크 초기화
    set_id_input(user_input)
    set_is_unique_id(false)
  }

  const set_password_input_custom = (user_input) => {
    // 비밀번호는 영문, 숫자, 특수기호(_-!@#$^&*)만 입력
    const pattern = /^[0-9a-zA-Z\_\-\!\@\#\$\^\&\*]*$/
    if (user_input.match(pattern)) {
      set_password_input(user_input)
    }
  }

  const set_student_phone_input_custom = (user_input) => {
    // 학생 전화번호는 숫자만 입력
    const pattern = /^[0-9]*$/
    if (user_input.match(pattern)) {
      set_student_phone_input(user_input)
    }
  }

  const set_parent_phone_input_custom = (user_input) => {
    // 학부모 전화번호는 숫자만 입력
    const pattern = /^[0-9]*$/
    if (user_input.match(pattern)) {
      set_parent_phone_input(user_input)
    }
  }

  const set_student_age_select_custom = (user_input) => {
    // 나이를 숫자로 변경

    user_input = Number(user_input)
    set_student_age_select(user_input)
  }

  const is_in_range = (text) => {
    // 6~20글자
    const text_length = text.length

    // 6글자 이상
    if (text_length < 6) {
      return false
    }

    // 20글자 이하
    if (20 < text_length) {
      return false
    }

    return true
  }

  const is_matched = (text) => {
    // 영문, 숫자, 밑줄로 구성

    const pattern = /^[0-9a-zA-Z_]*$/

    if (text.match(pattern)) {
      return true
    }

    return false
  }

  const is_include_english = (text) => {
    // 영문 포함

    const pattern = /[a-zA-Z]/

    if (text.match(pattern)) {
      return true
    }

    return false
  }

  const is_include_number = (text) => {
    // 숫자 포함

    const pattern = /\d/

    if (text.match(pattern)) {
      return true
    }

    return false
  }

  const is_include_special = (text) => {
    // 특수문자 포함

    const pattern = /[\_\-\!\@\#\$\^\&\*]/

    if (text.match(pattern)) {
      return true
    }

    return false
  }

  const is_checked_id = () => {
    // 영문, 숫자, 밑줄로 구성된 6~20글자

    // 6~20글자
    if (!is_in_range(id_input)) {
      return false
    }

    // 영문, 숫자, 밑줄로 구성
    if (!is_matched(id_input)) {
      return false
    }

    return true
  }

  const is_email = (text) => {
    // 올바른 이메일 형식

    const pattern =
      /^[0-9a-zA-Z]([\-\_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([\-\_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/

    if (text.match(pattern)) {
      return true
    }

    return false
  }

  const is_age_in_range = () => {
    // 중1(14) ~ 고3/N수생(19)

    if (student_age_select < 14) {
      return false
    }

    if (19 < student_age_select) {
      return false
    }

    return true
  }

  const check_unique_id = () => {
    if (is_checked_id()) {
      axios
        .get(`${rest_api_url}/users/is-exist/${id_input}`)
        .then(function (response) {
          let is_exist = response.data.is_exist

          if (!is_exist) {
            set_is_unique_id(true)
          } else {
            set_is_unique_id(false)
            alert(`[${id_input}]는 이미 사용 중인 아이디입니다.`)
          }
        })
        .catch(function (error) {
          console.error(error)
        })
    }
  }

  const is_ok = () => {
    // 아이디 조건
    if (!is_checked_id()) return false

    // 아이디 중복 확인
    if (!is_unique_id) return false

    // 비밀번호 조건
    if (!is_in_range(password_input)) return false
    if (!is_include_english(password_input)) return false
    if (!is_include_number(password_input)) return false
    if (!is_include_special(password_input)) return false

    // 비밀번호 확인
    if (password_input !== password2_input) return false
    if (password_input.length == 0) return false

    // 이메일 형식
    if (!is_email(email_input)) return false

    // 학생 정보
    if (student_name_input.length == 0) return false
    if (student_phone_input.length == 0) return false

    // 학생 학년 조건
    if (!is_age_in_range()) return false

    // 학부모 정보
    if (parent_name_input.length == 0) return false
    if (parent_phone_input.length == 0) return false

    // 회원가입 진행 중 (API 대기)
    if (is_post_loading) return false

    return true
  }

  const initialize_every_input = () => {
    set_id_input("")
    set_is_unique_id(false)
    set_password_input("")
    set_password2_input("")
    set_email_input("")
    set_student_name_input("")
    set_student_phone_input("")
    set_student_age_select(-1)
    set_parent_name_input("")
    set_parent_phone_input("")
  }

  const post_sign_up = () => {
    // Prevent duplicated post
    set_is_post_loading(true)

    // Set user information json
    const new_user_dict = {
      user_type: "student",
      id: id_input,
      password: password_input,
      email: email_input,
      user_name: student_name_input,
      user_phone: student_phone_input,
      parent_name: parent_name_input,
      parent_phone: parent_phone_input,
      age: student_age_select,
    }
    const new_user_json = JSON.stringify(new_user_dict)

    // Post with axios
    axios
      .post(`${rest_api_url}/users`, new_user_json, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response)
        initialize_every_input()

        // Redirect to signin page
        Router.push("/guest/signin")
      })
      .catch(function (error) {
        console.error(error)
        set_is_post_loading(false)
      })
  }

  return (
    <Layout>
      <div className="flex justify-center content-center flex-wrap min-h-screen">
        <div
          className="flex flex-col px-10 py-12 bg-white shadow-md"
          style={{ width: "500px", height: "fit-content" }}
        >
          {/* 로고 */}
          <Link href="/guest/signin">
            <img
              src="/img/dco_default_logo2.png"
              className="mx-auto mb-1 cursor-pointer"
              style={{ width: "80px" }}
              alt="dco logo"
            />
          </Link>

          {/* 제목 */}
          <h2 className="mb-8 text-center">회원가입</h2>

          {/* 아이디 */}
          <div className="mb-4">
            <div className="flex mb-1 justify-between">
              <span>아이디</span>
              <h5
                className="text-color-main-1 font-bold cursor-pointer"
                onClick={check_unique_id}
              >
                중복 체크
              </h5>
            </div>

            <InputNormal
              type="text"
              className="mb-1"
              placeholder="아이디 입력"
              user_input={id_input}
              set_user_input={set_id_input_custom}
            />

            <div className="flex gap-4 text-color-black-3">
              <h5 className={is_checked_id() ? "text-color-main-1" : ""}>
                &#10004; 영어,숫자,밑줄(_)로 구성된 6-20글자
              </h5>
              <h5 className={is_unique_id ? "text-color-main-1" : ""}>
                &#10004; 사용 가능한 아이디
              </h5>
            </div>
          </div>

          {/* 비밀번호 */}
          <div className="mb-4">
            <div className="flex mb-1">
              <span>비밀번호</span>
            </div>

            <InputNormal
              type="password"
              className="mb-1 tracking-wide"
              placeholder="비밀번호 입력"
              user_input={password_input}
              set_user_input={set_password_input_custom}
            />

            <div className="flex mb-2 gap-4 text-color-black-3">
              <h5
                className={
                  is_in_range(password_input) ? "text-color-main-1" : ""
                }
              >
                &#10004; 6-20글자
              </h5>
              <h5
                className={
                  is_include_english(password_input) ? "text-color-main-1" : ""
                }
              >
                &#10004; 영문 포함
              </h5>
              <h5
                className={
                  is_include_number(password_input) ? "text-color-main-1" : ""
                }
              >
                &#10004; 숫자 포함
              </h5>
              <h5
                className={
                  is_include_special(password_input) ? "text-color-main-1" : ""
                }
              >
                &#10004; 특수문자 포함(_-!@#$^&*)
              </h5>
            </div>

            <InputNormal
              type="password"
              className="mb-1 tracking-wide"
              placeholder="비밀번호 확인"
              user_input={password2_input}
              set_user_input={set_password2_input}
            />

            <div className="flex gap-4 text-color-black-3">
              <h5
                className={
                  password_input == password2_input && 0 < password_input.length
                    ? "text-color-main-1"
                    : ""
                }
              >
                &#10004; 비밀번호 일치
              </h5>
            </div>
          </div>

          {/* 이메일 */}
          <div className="mb-4">
            <div className="flex mb-1">
              <span>이메일</span>
            </div>

            <InputNormal
              type="text"
              className="mb-1"
              placeholder="@를 포함한 이메일 입력"
              user_input={email_input}
              set_user_input={set_email_input}
            />

            <div className="flex gap-4 text-color-black-3">
              <h5 className={is_email(email_input) ? "text-color-main-1" : ""}>
                &#10004; 이메일 형식
              </h5>
            </div>
          </div>

          {/* 학생 정보 */}
          <div className="mb-4">
            <div className="flex mb-1">
              <span>학생 정보</span>
            </div>

            <div className="flex mb-1 gap-2 justify-between">
              <div className="w-1/3">
                <InputNormal
                  type="text"
                  className="mb-1"
                  placeholder="이름"
                  user_input={student_name_input}
                  set_user_input={set_student_name_input}
                />
              </div>

              <div className="w-2/3">
                <InputNormal
                  type="text"
                  className="mb-1"
                  placeholder="연락처"
                  user_input={student_phone_input}
                  set_user_input={set_student_phone_input_custom}
                />
              </div>
            </div>

            <div className="flex justify-end text-color-black-3">
              <h5>숫자만 입력해 주세요</h5>
            </div>

            <div className="relative flex cursor-pointer">
              <select
                className="px-4 py-3 w-full outline-none focus:outline-none"
                style={{
                  backgroundColor: "#f4f4f4",
                  borderRadius: "6px",
                }}
                onChange={(e) => {
                  set_student_age_select_custom(e.target.value)
                }}
                value={student_age_select}
              >
                <option value="-1" disabled>
                  학년
                </option>
                <option value="14">중1</option>
                <option value="15">중2</option>
                <option value="16">중3</option>
                <option value="17">고1</option>
                <option value="18">고2</option>
                <option value="19">고3 / N수생</option>
              </select>
              <div className="absolute flex h-full right-0 pl-4 pr-4">
                <img src="/img/ic_dropdown_arrow.svg" className="inline w-3" />
              </div>
            </div>
          </div>

          {/* 학부모 정보 */}
          <div className="mb-4">
            <div className="flex mb-1">
              <span>학부모 정보</span>
            </div>

            <div className="flex mb-1 gap-2 justify-between">
              <div className="w-1/3">
                <InputNormal
                  type="text"
                  className="mb-1"
                  placeholder="이름"
                  user_input={parent_name_input}
                  set_user_input={set_parent_name_input}
                />
              </div>

              <div className="w-2/3">
                <InputNormal
                  type="text"
                  className="mb-1"
                  placeholder="연락처"
                  user_input={parent_phone_input}
                  set_user_input={set_parent_phone_input_custom}
                />
              </div>
            </div>

            <div className="flex justify-end text-color-black-3">
              <h5>숫자만 입력해 주세요</h5>
            </div>
          </div>

          {/* 회원가입 버튼 */}
          <div className="mb-4 w-full">
            {is_ok() ? (
              <ButtonNormal
                className="w-full"
                onClick={() => {
                  if (is_ok()) {
                    post_sign_up()
                  }
                }}
              >
                회원가입
              </ButtonNormal>
            ) : (
              <DisabledButton className="w-full">회원가입</DisabledButton>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

const getStaticProps = () => {
  const rest_api_url = process.env.REST_API_URL

  return { props: { rest_api_url } }
}

export { getStaticProps }

export default SignUp
