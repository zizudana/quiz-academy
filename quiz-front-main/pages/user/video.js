import Layout from "../../components/layout/layout_user"
import TailSpinSVG from "../../components/svg/tail-spin"

import Link from "next/link"
import { useState, useEffect, useCallback } from "react"
import { useSession } from "next-auth/client"
import axios from "axios"
import Vimeo from "@u-wave/react-vimeo";
import React, { useContext } from 'react'
import { VideoContext } from "."


//import QuizSetIndexPage from "."

// const VideoContext = React.createContext(
// 	{
// 	  src: "https://player.vimeo.com/video/713143205?h=db7937585c",
// 	  is_ended: false,
// 	  name: "Chapter1. Apple"
// 	}
//  )
const VideoPage = () => {
  const [session, _] = useSession()
  
  
  const myCallback = () => {
	alert('강의가 끝났습니다.')
  }

  return (
    <Layout>
      <div className="flex flex-col flex-wrap content-center justify-center h-screen">
        <div>
			<h1>Chapter 1. 화학식량과 몰</h1>
		  </div>
		  
		  <Vimeo
          video= { useContext(VideoContext).src }
          autoplay
          width="854"
          height="480"
          onEnd={() => myCallback()}
        />

        {/*<iframe id="v_play" src="https://player.vimeo.com/video/713143205?h=db7937585c" width="854" height="480" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen ></iframe>
		    <iframe src="https://player.vimeo.com/video/713143205?h=db7937585c" width="640" height="564" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>*/}
      </div>
    </Layout>
  )

}

export default VideoPage