import Link from "next/link"
import { signOut } from "next-auth/client"

const Nav = ({ session }) => {
  return (
	
    <>
      <div
        className="flex px-8 items-center justify-center bg-white select-none"
        style={{ height: "100px", boxShadow: "0px 1px 3px #00000014" }}
      >
        <div className="container flex items-center justify-between h-full">
          <div>
            <Link href="/user">
              <a className="flex items-center">
                <img
                  src="/img/dco_default2.png"
                  alt="logo"
                  style={{ width: "184px" }}
                />
              </a>
            </Link>
          </div>
			

			
			 <div>
            <Link href="/user">
             <h2 className="cursor-pointer text-color-black-1">동영상 강의</h2>
            </Link>
          </div>

			 <div>
            <Link href="/user">
             <h2 className="cursor-pointer text-color-black-1">문제 풀이</h2>
            </Link>
          </div>

			 <div>
            <Link href="/user/wrong_main">
             <h2 className="cursor-pointer text-color-black-1">오답노트</h2>
            </Link>
          </div>
			

          {/*비디오 추가*/}
          <div className="flex items-center">
            <img
              src="/img/ic_teacher_big.svg"
              alt="user"
              className="mr-2"
              style={{ width: "15px" }}
            />
				<Link href="/user/userinfo">
            <h2 className="cursor-pointer text-color-black-1">
              {session && session.user.name}
            </h2>
				</Link>
           
            {/* <h3 className="cursor-pointer text-color-main-1">회원정보</h3>  */}
            <div
              className="border-r mx-4 border-color-black-2"
              style={{ height: "18px" }}
            />
            <h3 onClick={signOut} className="cursor-pointer text-color-black-2">
              로그아웃
            </h3>
          </div>
        </div>
      </div>
    </>
  )
}

export default Nav