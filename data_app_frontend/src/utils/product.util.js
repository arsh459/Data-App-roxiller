import axios from "axios"
const url = "http://localhost:8000/api"

const getTransactions = async (search, month, page) => {
  let response = await axios.get(
    `${url}/transactions?page=${page}&month=${month}&search=${search}`
  )
  return response.data
}

const getstats = async (month) => {
  let response = await axios.get(`${url}/statistics?month=${month}`)
  return response.data
}

const getBarData = async (month) => {
  let response = await axios.get(`${url}/bar-chart?month=${month}`)
  return response.data
}

function capitalize(str) {
  if (str.length === 0) {
    return str
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function getMonth(month) {
  switch (month) {
    case "1":
      return "January"
    case "2":
      return "February"
    case "3":
      return "March"
    case 3:
      return "March"
    case "4":
      return "April"
    case "5":
      return "May"
    case "6":
      return "June"
    case "7":
      return "July"
    case "8":
      return "August"
    case "9":
      return "September"
    case "10":
      return "October"
    case "11":
      return "November"
    case "12":
      return "December"
  }
}

export { getTransactions, getstats, getBarData, capitalize, getMonth }
