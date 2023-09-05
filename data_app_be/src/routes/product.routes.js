const express = require("express")

const {
  initializeDatabase,
  listTransactions,
  listStats,
  getBarChartData,
  getPieChartData,
  getCombinedData,
} = require("../controllers/product.controller")

//router definition
const router = express.Router()

//route for database initialization
router.get("/initialize", initializeDatabase)

// route for listing transactions
router.get("/transactions", listTransactions)

// route for getting stats
router.get("/statistics", listStats)

// route for bar chart data
router.get("/bar-chart", getBarChartData)

// route for pie chart data
router.get("/pie-chart", getPieChartData)

// route for combined data
router.get("/combined-data", getCombinedData)

module.exports = router
