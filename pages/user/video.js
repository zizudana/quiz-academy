import Layout from "../../components/layout/layout_user"
import TailSpinSVG from "../../components/svg/tail-spin"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/client"
import axios from "axios"

const VideoPage = () => {
  const [session, _] = useSession()
  const [is_loading, set_is_loading] = useState(true)

  return (
    <Layout>
      <div className="flex flex-col flex-wrap content-center justify-center h-screen">
        {/*<iframe src="https://player.vimeo.com/video/712474023?h=aac464af44&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" width="1536" height="864" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="새 녹화본 - 2022. 5. 22. 오전 11:18:54"></iframe>*/}
		<iframe src="https://player.vimeo.com/video/713143205?h=db7937585c" width="640" height="564" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
      </div>
    </Layout>
  )

}

export default VideoPage