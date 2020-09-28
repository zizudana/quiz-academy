import Link from "next/link"

const Nav = () => {
  return (
    <>
      <div className="color-2 overflow-hidden text-lg text-white h-20 px-6 py-2 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center">
            <img src="/img/DCD_logo.png" alt="logo" className="w-8 mr-2" />
            <span className="block tracking-widest text-white text-2xl font-bold">DCD On</span>
          </a>
        </Link>
        <div>
          {/* <input
            className="hidden sm:inline-block border-2 border-gray-300 bg-white h-6 px-3 mr-3 rounded-lg text-sm focus:outline-none"
            type="search"
            placeholder="검색"
          /> */}
          <Link href="/pdf">
            <a className="hidden sm:inline-block px-2 py-0">문제풀이</a>
          </Link>
          <Link href="/">
            <a className="hidden sm:inline-block px-2 py-0">오답노트</a>
          </Link>
          <Link href="/">
            <a className="hidden sm:inline-block px-2 py-0">질의응답</a>
          </Link>
          <Link href="/login">
            <a className="inline-block bg-indigo-100 hover:bg-indigo-300 text-gray-800 font-bold py-1 px-4 ml-3 rounded-full">로그인</a>
          </Link>
          <button onClick={() => ShowHiddenHeader()} className="sm:hidden color-3 text-white font-bold leading-4 rounded w-6 h-6 ml-3">
            =
          </button>
        </div>
      </div>
      <div id="hidden-header" className="hidden sm:hidden px-6 color-3">
        <Link href="/pdf">
          <a className="block px-2 py-2 font-bold text-white hover:bg-indigo-200 rounded">문제풀이</a>
        </Link>
        <Link href="/">
          <a className=" block px-2 py-2 font-bold text-white hover:bg-indigo-200 rounded">오답노트</a>
        </Link>
        <Link href="/">
          <a className=" block px-2 py-2 font-bold text-white hover:bg-indigo-200 rounded">질의응답</a>
        </Link>
      </div>

      <script src="/js/nav.js"></script>
    </>
  )
}

export default Nav
