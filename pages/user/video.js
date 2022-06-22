import Layout from "../../components/layout/layout_user"
import TailSpinSVG from "../../components/svg/tail-spin"

import Link from "next/link"
import { useState, useEffect, useCallback } from "react"
import { useSession } from "next-auth/client"
import axios from "axios"
import Vimeo from "@u-wave/react-vimeo";
import React, { useContext } from 'react'
import { VideoContext } from "."

const VideoPage = () => {
  const [session, _] = useSession()
  const [is_loading, set_is_loading] = useState(true)
  const myCallback = () => {useContext(VideoContext).is_ended=true}

  return (
    <Layout>
      <div className="flex flex-col flex-wrap content-center justify-center h-screen">
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