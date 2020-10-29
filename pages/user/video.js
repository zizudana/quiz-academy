import Layout from "../../components/layout/layout_user"

import YouTube from "react-youtube"

const PDFPage = () => {
  const youtube_option = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      // autoplay: 1, // 자동 재생 O
      // controls: 0, // 플레이어 컨트롤 표시 X
      iv_load_policy: 3, // 동영상 특수효과 X
      modestbranding: 1, // Youtube logo X
      rel: 0, // 관련 동영상 X
    },
  }

  return (
    <Layout>
      <div className="mx-auto mt-20 h-64 flex shadow-lg rounded-lg" style={{ maxWidth: "650px" }}>
        {/* 왼쪽 사진 */}
        <div
          className="w-1/3 border border-r-0 border-gray-400 h-auto flex-none bg-cover bg-no-repeat bg-center rounded-l-lg overflow-hidden"
          style={{ backgroundImage: 'url("/img/teacher.png")' }}
          title="실시간 질의응답 썸네일"
        />

        {/* 오른쪽 패널 */}
        <div className="w-2/3 border border-l-0 border-gray-400 rounded-r-lg pl-6 flex items-center">
          <div className="flex flex-col justify-between leading-normal">
            <div className="text-gray-900 font-bold text-xl">수학 횟집</div>
            <p className="text-gray-900 mb-2">떼껄룩 선생님</p>
            <p className="text-gray-700 text-base mb-2">고등수학 | 생선잡는 법을 알려드리겠습니다</p>
            <p className="text-gray-700 text-base">매주 금요일 PM 09 : 00 ~ PM 10 : 30</p>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .ytp-pause-overlay {
          display: none;
        }
      `}</style>
      <div className="my-16" />
      <YouTube className="mx-auto" videoId="TN9fMYQxw4E" opts={youtube_option} />
    </Layout>
  )
}

export default PDFPage
