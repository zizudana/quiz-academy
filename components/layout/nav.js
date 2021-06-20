import Link from "next/link"
import { signOut } from "next-auth/client"

const Nav = () => {
  return (
    <>
      <div
        className="color-2 pl-1 pr-3 md:px-6 mx-0 md:mx-4 flex items-center justify-between shadow-xl md:rounded-b-3xl"
        style={{ height: "4.5rem" }}
      >
        <div id="nav-left">
          <Link href="/user">
            <a className="flex items-center">
              <img
                src="/img/DCD_logo_full_white.png"
                alt="logo"
                className="h-20"
              />
            </a>
          </Link>
        </div>

        <div id="nav-right" className="text-white">
          <button
            onClick={signOut}
            className="inline-block bg-indigo-100 hover:bg-indigo-200 text-gray-800 font-bold py-1 px-3 md:px-4 md:ml-3 rounded-full"
          >
            나가기
          </button>
        </div>
      </div>
    </>
  )
}

export default Nav
