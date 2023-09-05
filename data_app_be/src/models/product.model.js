const mongoose = require("mongoose")

// Define the schema for the ProductTransaction model
const productTransactionSchema = new mongoose.Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  sold: Boolean,
  dateOfSale: Date,
  monthOfSale: Number,
})

// Create the ProductTransaction model
const ProductTransaction = mongoose.model(
  "ProductTransaction",
  productTransactionSchema
)

module.exports = ProductTransaction
