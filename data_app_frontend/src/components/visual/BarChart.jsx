import { Chart } from "react-google-charts"
import { useState, useEffect } from "react"
import {
  Box,
  Heading,
  Stack,
  HStack,
  VStack,
  StackDivider,
  Skeleton,
} from "@chakra-ui/react"
function BarChart({ barData, loading }) {
  const [data, setData] = useState([])
  // console.log(barData)
  useEffect(() => {
    let marr = []
    marr.push(["Price Range", "Number of Items"])
    for (let elem of barData) {
      let arr = []
      arr.push(elem.priceRange)
      arr.push(elem.itemCount)
      marr.push(arr)
    }
    setData(marr)
  }, [barData])
  const options = {
    chart: {
      title: "Bar Chart Stats - June",
      subtitle: "Number of Items in Price Range",
    },
  }
  console.log("data", data)
  return (
    <Box w="900px">
      <Chart
        chartType="Bar"
        width="100%"
        height="400px"
        className="styleIt"
        data={data}
        options={options}
      />
    </Box>
  )
}

export default BarChart
