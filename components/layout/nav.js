import Link from "next/link"
import { signOut } from "next-auth/client"

const Nav = () => {
  const toggle_hidden_header = () => {
    var hidden_header_button = document.getElementById("hidden-header")
    hidden_header_button.classList.toggle("hidden")
  }
  return (
    <>
      <div
        className="color-2 pl-1 pr-3 md:px-6 mx-0 md:mx-4 flex items-center justify-between shadow-xl md:rounded-b-3xl"
        style={{ height: "4.5rem" }}
      >
        <div id="nav-left">
          <Link href="/user">
            <a className="flex items-center">
              <img src="/img/DCD_logo_full_white.png" alt="logo" className="h-20" />
            </a>
          </Link>
        </div>

        <div id="nav-right" className="text-white">
          <Link href="/user/pdf">
            <a className="hidden md:inline-block px-2 py-0 hover:text-indigo-200">문제풀이</a>
          </Link>
          <Link href="/user/video">
            <a className="hidden md:inline-block px-2 py-0 hover:text-indigo-200">동영상강의</a>
          </Link>
          <Link href="/user/connector">
            <a className="hidden md:inline-block px-2 py-0 hover:text-indigo-200">질의응답</a>
          </Link>

          <button
            onClick={signOut}
            className="inline-block bg-indigo-100 hover:bg-indigo-200 text-gray-800 font-bold py-1 px-3 md:px-4 md:ml-3 rounded-full"
          >
            나가기
          </button>

          <button onClick={() => toggle_hidden_header()} className="md:hidden color-3 text-white font-bold leading-4 rounded p-2 ml-3">
            =
          </button>
        </div>
      </div>

      <div id="hidden-header" className="hidden md:hidden px-6 py-2 color-3">
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
