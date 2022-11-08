const Preview = ({ rest_api_url, quiz_content }) => {
  // TODO quiz_content로 사진 불러오기

  // special token 목록 생성 [ 0 ~ 9, +, - ]
  let special_token_list = ["+", "-","s","2+","3+","2-","A","x","y","n","2n"]
  for (const x of Array(10).keys()) {
    special_token_list.push(String.fromCharCode("0".charCodeAt(0) + x))
  }

  const get_preview_html = (original_html) => {
    // 미리보기를 위해 special token들을 html로 변경

    let preview_html = original_html.replaceAll("<p></p>", "<p>&nbsp;</p>")
	 preview_html = preview_html.replaceAll(
		`\n`, `</br>`
	)
	 preview_html = preview_html.replaceAll(
		` `, `&nbsp`
	)
  preview_html = preview_html.replaceAll(
		`$표시작`,
		`<span class="table w-full ...">`
	 )
   preview_html = preview_html.replaceAll(
    `$표제목`,
    `<table className="w-full divide-y divide-gray-400 border border-color-black-4">`
  ) 
	 preview_html = preview_html.replaceAll(
		`$표끝`,
		`</span>`
	 )
	 preview_html = preview_html.replaceAll(`$굵은`,"<b>") 
	 preview_html = preview_html.replaceAll(`$글씨`,"</b>") 
	 preview_html = preview_html.replaceAll(
		`$열시작`,
		`<span class="table-row">`
	 )
	 preview_html = preview_html.replaceAll(
		`$끝`,
		`</span>`
	 )
	 preview_html = preview_html.replaceAll(
		`$열요소`,
		`<span class="table-cell border-2 border-black ...">`
	 )
    preview_html = preview_html.replaceAll(
      `$박스시작`,
      `<fieldset class="border-2 border-black my-3 px-6 py-4">`
    )
    preview_html = preview_html.replaceAll(`$보기끝`, "</fieldset>")
    preview_html = preview_html.replaceAll(
      `$보기시작`,
      `<fieldset class="border-2 border-black my-3 px-6 pt-4 pb-6">
          <legend class="mx-auto px-2">< 보 기 ></legend>`
    )
    preview_html = preview_html.replaceAll(`$박스끝`, "</fieldset>")
    special_token_list.forEach((special_token) => {
      preview_html = preview_html.replaceAll(
        `$${special_token}`,
        `<span class="font-bold text-red-700">${special_token}</span>`
      )
      preview_html = preview_html.replaceAll(
        `$_${special_token}`,
        `<sub>${special_token}</sub>`
      )
      preview_html = preview_html.replaceAll(
        `$^${special_token}`,
        `<sup>${special_token}</sup>`
      )
    })

    preview_html = preview_html.replace(
		/\$분수\{(\[\]|[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|+-|.|()|×]+),(\[\]|[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|+-|.|()|×]+)\}/g,
		// /\$분수\{(.*),(.*)\}/g,
      `<span class="inline-block align-middle text-center" style="font-size: 0.75rem; line-height: 1rem;">
            <span class="block border-b border-black">$1</span>
            <span class="block">$2</span>
          </span>`
    )
	 preview_html = preview_html.replace(
		`$이미지`,
		`<img src="${quiz_content.image}">`
	 )
    preview_html = preview_html.replaceAll(
      `[[`,
      `<img class="p-4 max-h-56 mx-auto" src="${rest_api_url}/files/quizset/${quiz_content.quiz_id}/`
    )
    preview_html = preview_html.replaceAll(`]]`, `" />`)

    return preview_html
  }

  return (
    <div
      className="mx-auto select-none"
      style={{ width: "400px" }}
      dangerouslySetInnerHTML={{
        __html: get_preview_html(quiz_content.content),
      }}
    />
  )
}

export default Preview
