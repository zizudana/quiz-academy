const Preview = ({ rest_api_url, quiz_content }) => {
  // special token 목록 생성 [ 0 ~ 9, +, - ]
  let special_token_list = ["+", "-"]
  for (const x of Array(10).keys()) {
    special_token_list.push(String.fromCharCode("0".charCodeAt(0) + x))
  }

  const get_preview_html = (original_html) => {
    // 미리보기를 위해 special token들을 html로 변경

    let preview_html = original_html.replaceAll("<p></p>", "<p>&nbsp;</p>")
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
      /\$분수\{([0-9]+),([0-9]+)\}/g,
      `<span class="inline-block align-middle text-center" style="font-size: 0.75rem; line-height: 1rem;">
            <span class="block border-b border-black">$1</span>
            <span class="block">$2</span>
          </span>`
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
