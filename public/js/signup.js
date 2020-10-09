var checkUnique = 0

const Submit = () => {
  // var element = document.getElementById("hidden-header")
  // element.classList.toggle("hidden")
  var SubmitDict = {}
  var tmp_password = document.getElementById("grid-password").value
  var tmp_password_check = document.getElementById("grid-password-isCorrect").value
  var tmp_phone = document.getElementById("grid-phone-number").value
  var tmp_parent_phone = document.getElementById("grid-parent-phone-number").value
  var state_age = document.getElementById("grid-state")

  if (state_age.selectedIndex == 6) {
    state_age = 0
  } else {
    state_age = 14 + state_age.selectedIndex
  }

  if (tmp_password != tmp_password_check) {
    alert("비밀번호가 일치하지 않습니다. 다시 입력해주세요.")
  } else if (isNaN(tmp_phone) == true || isNaN(tmp_parent_phone) == true) {
    alert("연락처에 숫자만 입력해주세요.")
  } else if (checkUnique != 1) {
    alert("ID 중복체크를 완료해주세요.")
  } else {
    SubmitDict["id"] = document.getElementById("grid-id").value
    SubmitDict["password"] = tmp_password
    SubmitDict["email"] = document.getElementById("grid-email").value
    SubmitDict["user_name"] = document.getElementById("grid-name").value
    SubmitDict["user_phone"] = tmp_phone
    SubmitDict["parent_name"] = document.getElementById("grid-parent-name").value
    SubmitDict["parent_phone"] = tmp_parent_phone
    SubmitDict["age"] = state_age
    console.log("element: ", SubmitDict)

    SendDict(SubmitDict)
  }
}

const SendDict = (SubmitDict) => {
  var xhr = new XMLHttpRequest()
  var url = "http://web-academy.ml:51682/users"
  xhr.open("POST", url, true)
  xhr.setRequestHeader("Content-Type", "application/json")
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText)
      console.log(json)
    }
  }
  var data = JSON.stringify(SubmitDict)
  xhr.send(data)
}

const isUnique = () => {
  // var element = document.getElementById("hidden-header")
  // element.classList.toggle("hidden")
  var idcheck = document.getElementById("grid-id").value

  console.log("입력된 ID: ", idcheck)
  checkUnique = 1
  console.log("중복확인: ", checkUnique)
}

document.getElementById("submit-btn").addEventListener("click", Submit)
document.getElementById("btn-id-isUnique").addEventListener("click", isUnique)
