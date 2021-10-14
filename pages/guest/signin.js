import { useState } from "react"
import Link from "next/link"
import { signIn } from "next-auth/client"

import Layout from "../../components/layout/layout_guest"
import { InputNormal } from "../../components/common/input"
import { ButtonNormal } from "../../components/common/button"
import { Checkbox } from "../../components/common/checkbox"

const IndexPage = () => {
  const [id_input, set_id_input] = useState("")
  const [password_input, set_password_input] = useState("")
  const [is_auto_login, set_is_auto_login] = useState(true)
  const [is_save_id, set_is_save_id] = useState(true)

  const toggle_is_auto_login = () => {
    set_is_auto_login((prev_state) => !prev_state)
  }

  const toggle_is_save_id = () => {
    set_is_save_id((prev_state) => !prev_state)
  }

  const sign_in = () => {
    signIn("credentials", {
      username: id_input,
      password: password_input,
    })
  }

  return (
    <Layout>
      <div className="flex justify-center content-center flex-wrap min-h-screen select-none">
        <div
          className="flex flex-col px-10 py-12 bg-white shadow-md"
          style={{ width: "400px", height: "fit-content" }}
        >
          {/* 로고 */}
          <img
            src="/img/dco_vertical.png"
            className="mx-auto mb-8"
            style={{ width: "216px" }}
            alt="dco logo"
          />

          {/* 아이디 & 비밀번호 입력 */}
          <div className="flex flex-col mb-8 gap-1">
            <InputNormal
              type="text"
              className="tracking-wide"
              placeholder="아이디를 입력해주세요"
              user_input={id_input}
              set_user_input={set_id_input}
            />
            <InputNormal
              type="password"
              className="tracking-wide"
              placeholder="비밀번호를 입력해주세요"
              user_input={password_input}
              set_user_input={set_password_input}
            />

            <div className="flex gap-6 mt-2">
              <Checkbox checked={is_auto_login} onClick={toggle_is_auto_login}>
                <h5>자동 로그인</h5>
              </Checkbox>
              <Checkbox checked={is_save_id} onClick={toggle_is_save_id}>
                <h5>아이디 저장</h5>
              </Checkbox>
            </div>
          </div>

          {/* 접속 버튼 */}
          <div className="mb-4 w-full">
            <ButtonNormal className="w-full" onClick={sign_in}>
              접속하기
            </ButtonNormal>
          </div>

          <div className="text-center">
            {/* 아이디 & 비밀번호 찾기 */}
            <h5 className="mb-8">
              계정을 잊으셨나요?{" "}
              <Link href="/guest/not-yet">
                <a className="text-color-main-1">아이디</a>
              </Link>{" "}
              또는{" "}
              <Link href="/guest/not-yet">
                <a className="text-color-main-1">비밀번호 찾기</a>
              </Link>
            </h5>

            {/* 회원가입 */}
            <h5>
              아직 회원이 아니신가요?{" "}
              <Link href="/guest/signup">
                <a className="text-color-main-1">회원가입</a>
              </Link>
            </h5>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
