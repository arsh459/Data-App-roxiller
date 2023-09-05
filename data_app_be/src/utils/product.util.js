const dateManipulation = (data) => {
  let newdata = data.map((elem) => {
    return { ...elem, monthOfSale: convertToMonth(elem.dateOfSale) }
  })
  return newdata
}

const convertToMonth = (date) => {
  let newDate = new Date(date)
  return newDate.getMonth() + 1
}

const saleOfMonth = (data) => {
  let sale = 0
  data.forEach((elem) => {
    if (elem.sold === true) {
      sale += Number(elem.price)
    }
  })
  return sale
}

module.exports = { dateManipulation, saleOfMonth }
