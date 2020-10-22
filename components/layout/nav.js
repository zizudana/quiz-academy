import Link from "next/link"
import { signOut } from "next-auth/client"

const Nav = () => {
  const toggle_hidden_header = () => {
    var hidden_header_button = document.getElementById("hidden-header")
    hidden_header_button.classList.toggle("hidden")
  }
  return (
    <>
      <div className="color-2 overflow-hidden text-lg text-white h-20 px-6 py-2 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center">
            <img src="/img/DCD_logo_full_white.png" alt="logo" className="w-64 mr-2" />
          </a>
        </Link>
        <div>
          <Link href="/user/pdf">
            <a className="hidden sm:inline-block px-2 py-0">문제풀이</a>
          </Link>
          <Link href="/user/video">
            <a className="hidden sm:inline-block px-2 py-0">동영상강의</a>
          </Link>
          <Link href="/user/connector">
            <a className="hidden sm:inline-block px-2 py-0">질의응답</a>
          </Link>

          <button onClick={signOut} className="inline-block bg-indigo-100 hover:bg-indigo-300 text-gray-800 font-bold py-1 px-4 ml-3 rounded-full">
            나가기
          </button>

          <button onClick={() => toggle_hidden_header()} className="sm:hidden color-3 text-white font-bold leading-4 rounded w-6 h-6 ml-3">
            =
          </button>
        </div>
      </div>

      <div id="hidden-header" className="hidden sm:hidden px-6 py-2 color-3">
        <Link href="/user/pdf">
          <a onClick={() => toggle_hidden_header()} className="block px-2 py-2 font-bold text-white hover:bg-indigo-200 rounded">
            문제풀이
          </a>
        </Link>
        <Link href="/user/video">
          <a onClick={() => toggle_hidden_header()} className="block px-2 py-2 font-bold text-white hover:bg-indigo-200 rounded">
            오답노트
          </a>
        </Link>
        <Link href="/user/connector">
          <a onClick={() => toggle_hidden_header()} className="block px-2 py-2 font-bold text-white hover:bg-indigo-200 rounded">
            질의응답
          </a>
        </Link>
      </div>
    </>
  )
}

export default Nav
