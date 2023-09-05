const axios = require("axios")
const ProductTransaction = require("../models/product.model")
const { dateManipulation, saleOfMonth } = require("../utils/product.util")
const dotenv = require("dotenv")
dotenv.config()
const url = "https://thankful-ant-scrubs.cyclic.app/api"

const initializeDatabase = async (req, res) => {
  try {
    const apiUrl =
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    const response = await axios.get(apiUrl)
    let data = await response.data
    data = dateManipulation(data)
    const transactions = await ProductTransaction.insertMany(data)
    res.json({
      message: "Database initialized with seed data.",
      data: transactions,
    })
  } catch (error) {
    console.error("Error initializing the database:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

const listTransactions = async (req, res) => {
  try {
    const { page = 1, perPage = 10, search = "", month = 3 } = req.query
    const query = {
      $and: [
        { monthOfSale: month },
        {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { price: { $eq: parseFloat(search) || 0 } },
          ],
        },
      ],
    }
    const skip = (page - 1) * perPage
    const limit = parseInt(perPage)
    const transactions = await ProductTransaction.find(query)
      .skip(skip)
      .limit(limit)
      .exec()
    const totalCount = await ProductTransaction.countDocuments(query)
    res.json({ transactions, totalCount })
  } catch (error) {
    console.error("Error listing transactions:", error.message)
    res.status(500).json({ error: error.message })
  }
}

const listStats = async (req, res) => {
  console.log("listStats")
  try {
    const { month = 3 } = req.query

    // Total sale amount for the selected month
    let transactions = await ProductTransaction.find({
      monthOfSale: month,
    })
    let totalSaleAmount = saleOfMonth(transactions)

    // Total number of sold items for the selected month
    const totalSoldItems = await ProductTransaction.countDocuments({
      monthOfSale: month,
      sold: true,
    })

    // Total number of not sold items for the selected month
    const totalNotSoldItems = await ProductTransaction.countDocuments({
      monthOfSale: month,
      sold: false,
    })

    res.json({
      totalSaleAmount,
      totalSoldItems,
      totalNotSoldItems,
    })
  } catch (error) {
    console.error("Error fetching statistics:", error)
    res.status(500).json({ error: error.message })
  }
}

const getBarChartData = async (req, res) => {
  try {
    //Queries
    const { month = 3 } = req.query
    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Infinity },
    ]

    //Data required for bar chart
    const barChartData = []
    for (const range of priceRanges) {
      const count = await ProductTransaction.countDocuments({
        monthOfSale: month,
        price: { $gte: range.min, $lte: range.max },
      })

      barChartData.push({
        priceRange: `${range.min} - ${range.max}`,
        itemCount: count,
      })
    }

    res.json(barChartData)
  } catch (error) {
    console.error("Error fetching bar chart data:", error.message)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

const getPieChartData = async (req, res) => {
  try {
    const { month = 3 } = req.query
    const categories = await ProductTransaction.distinct("category")
    let groupedData = {}
    for (let category of categories) {
      const productsInCategory = await ProductTransaction.find({
        category,
        monthOfSale: month,
      })
      groupedData[category] = productsInCategory.length
    }

    res.json(groupedData)
  } catch (error) {
    console.error("Error fetching pie chart data:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

const getCombinedData = async (req, res) => {
  try {
    const { month = 3 } = req.query
    const combinedData = {}

    console.log(url)

    const statisticsData = await axios.get(`${url}/statistics`)

    const barChartData = await axios.get(`${url}/bar-chart`)

    const pieChartData = await axios.get(`${url}/pie-chart`)

    combinedData.statistics = statisticsData.data
    combinedData.barChart = barChartData.data
    combinedData.pieChart = pieChartData.data

    res.json(combinedData)
  } catch (error) {
    console.error("Error fetching combined data:", error.message)
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  initializeDatabase,
  listTransactions,
  listStats,
  getBarChartData,
  getPieChartData,
  getCombinedData,
}
