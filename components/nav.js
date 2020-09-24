import Head from "next/head"
import Link from "next/link"

const Nav = () => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/css/nav.css" />
      </Head>

      <div className="bg-indigo-800 overflow-hidden text-base h-40px px-6 py-2">
        <div className="float-left leading-8">
          <Link href="/">
            <a className="header-kind no-underline px-2 py-0">대치동 온라인</a>
          </Link>
        </div>
        <div className="float-right leading-8">
          <input
            className="hidden md:inline-block border-2 border-gray-300 bg-white h-6 px-3 mr-3 rounded-lg text-sm focus:outline-none"
            type="search"
            placeholder="검색"
          />
          <Link href="/pdf">
            <a className="hidden md:inline-block header-kind no-underline px-2 py-0">문제풀이</a>
          </Link>
          <a href="#contact" className="hidden md:inline-block header-kind no-underline px-2 py-0">
            오답노트
          </a>
          <a href="#about" className="hidden md:inline-block header-kind no-underline px-2 py-0">
            질의응답
          </a>
          <button
            onClick={() => ShowHiddenHeader()}
            className="md:hidden bg-indigo-500 hover:bg-indigo-700 text-white font-bold rounded align-middle w-6 h-6"
          >
            =
          </button>
        </div>
      </div>
      <div id="hidden-header" className="hidden md:hidden px-6 bg-indigo-500">
        <Link href="/pdf">
          <a href="#news" className="block header-kind no-underline px-2 py-1 hover:bg-indigo-200 rounded">
            문제풀이
          </a>
        </Link>
        <a href="#contact" className="mt-1 block header-kind no-underline px-2 py-1 hover:bg-indigo-200 rounded">
          오답노트
        </a>
        <a href="#about" className="mt-1 block header-kind no-underline px-2 py-1 hover:bg-indigo-200 rounded">
          질의응답
        </a>
      </div>

      <script src="/js/nav.js"></script>
    </>
  )
}

export default Nav
