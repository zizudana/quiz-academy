import React from "react"
import Layout from "../../components/layout_guest"

const SignUp = () => {
  return (
    <Layout>
      {/* <div className="w-fullrounded p-5"> */}
      <div className="bg-white max-w-lg shadow-md rounded bg-indigo-100 px-8 pt-6 pb-8 mx-auto mt-12 mb-12 flex flex-col my-2">
        <img src="/img/DCD_logo.png" alt="logo" className="w-32 mx-auto pb-8" />
        <hr style={{ color: "red", size: "10" }}></hr>
        <div className="-mx-3 md:flex mb-2">
          <div className="md:w-full px-3">
            <label className="pl-2 float-left uppercase tracking-wide text-grey-darker text-sm mb-2" htmlFor="grid-id">
              아이디
            </label>
            <button
              className="float-right w-20 h-5 text-xs bg-indigo-600 text-center hover:bg-indigo-500 text-white rounded focus:outline-none"
              type="button"
              id="btn-id-isUnique"
            >
              중복체크
            </button>
            <input
              className="appearance-none block focus:outline-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
              id="grid-id"
              type="text"
              placeholder="아이디 입력"
            />
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
              className="appearance-none block w-full focus:outline-none bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
              id="grid-password-isCorrect"
              type="password"
              placeholder="비밀번호 확인"
            />
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
              placeholder="name"
            />
          </div>
          <div className="md:w-3/5 px-3 mb-2">
            <label className="pl-2 block uppercase tracking-wide text-grey-darker text-xs text-sm mb-2" htmlFor="grid-last-name">
              학생 연락처
            </label>
            <input
              className="appearance-none block focus:outline-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              id="grid-phone-number"
              type="tel"
              placeholder="숫자만 입력해주세요."
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
              placeholder="name"
            />
          </div>
          <div className="md:w-3/5 px-3 mb-2">
            <label className="pl-2 block uppercase tracking-wide text-grey-darker text-xs text-sm mb-2" htmlFor="grid-last-name">
              학부모 연락처
            </label>
            <input
              className="appearance-none block focus:outline-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              id="grid-parent-phone-number"
              type="tel"
              placeholder="숫자만 입력해주세요."
            />
          </div>
        </div>

        <div className="-mx-3 md:flex mb-2">
          <div className="md:w-1/2 px-3">
            <label className="pl-2 block uppercase tracking-wide text-grey-darker text-sm mb-2" htmlFor="grid-state">
              학년
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full focus:outline-none bg-grey-lighter border border-grey-lighter text-grey-darker py-3 pl-4 pr-8 rounded"
                id="grid-state"
              >
                <option>중1</option>
                <option>중2</option>
                <option>중3</option>
                <option>고1</option>
                <option>고2</option>
                <option>고3</option>
                <option>해당없음</option>
              </select>
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
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <script type="text/javascript" src="/js/signup.js"></script>
    </Layout>
  )
}

export default SignUp
