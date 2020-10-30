const get_money_log = async () => {
  const money_log_res = await fetch(process.env.REST_API_URL + "/money-logs")
  const money_log_json = await money_log_res.json()
  const money_log_array = money_log_json.money_log_array

  const data_array = money_log_array.map(({ money }) => {
    return money
  })

  const label_array = money_log_array.map(({ timestamp }) => {
    return timestamp_to_mmdd(timestamp)
  })

  const money_log_data = {
    labels: label_array,
    datasets: [
      {
        borderColor: "#339ad5",
        borderWidth: 2,
        fill: false,
        data: data_array,
      },
    ],
  }

  const money_chart_options = {
    legend: {
      display: false, // label 숨기기
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    maintainAspectRatio: false, // false로 설정 시 사용자 정의 크기에 따라 그래프 크기가 결정됨.
  }

  return {
    money_log_data,
    money_chart_options,
  }
}

const timestamp_to_mmdd = (timestamp) => {
  let d = new Date(timestamp * 1000)
  let month = "" + (d.getMonth() + 1)
  let day = "" + d.getDate()

  if (month.length < 2) month = "0" + month
  if (day.length < 2) day = "0" + day

  return `${month}/${day}`
}

export default get_money_log
