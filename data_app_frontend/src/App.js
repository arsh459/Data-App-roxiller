import {
  BarChart,
  TransactionTable,
  StatsTable,
} from "./components/visual/index.js"
import {
  Box,
  Heading,
  Stack,
  HStack,
  VStack,
  StackDivider,
  Skeleton,
} from "@chakra-ui/react"

import { useState, useEffect } from "react"
import { Filter, Search } from "./components/functional/index.js"
import axios from "axios"
import { getTransactions, getstats, getBarData } from "./utils/product.util.js"
import Pagination from "./components/visual/Pagination.jsx"

function App() {
  // States Definition
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [month, setMonth] = useState(3)
  const [transactions, setTransanctions] = useState([])
  const [stats, setStats] = useState({})
  const [barData, setbarData] = useState([])
  const [loading, setLoading] = useState(false)

  // State Updation
  useEffect(() => {
    async function fetchData() {
      let transactionData = await getTransactions(search, month, page)
      let statsData = await getstats(month)
      let barChartData = await getBarData(month)
      console.log(transactionData)
      console.log(statsData)

      setTransanctions(transactionData.transactions)
      setStats(statsData)
      setbarData(barChartData)
      setLoading(true)
    }
    setLoading(false)
    fetchData()
  }, [search, month, page])

  return (
    <Box className="main" p={4}>
      <VStack
        p={4}
        w="90%"
        m="auto"
        style={{
          textAlign: "center",
          borderRadius: "10px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
        border="1px solid #ddd"
      >
        <Heading mb={4} color={"#666"}>
          Transaction Dashboard
        </Heading>
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={10}
          p={4}
        >
          <VStack spacing={12}>
            <HStack>
              <Search search={search} setSearch={setSearch} />
              <Filter month={month} setMonth={setMonth} />
            </HStack>

            <TransactionTable
              transactions={transactions}
              setTransanctions={setTransanctions}
              loading={loading}
            />

            <HStack>
              <Pagination page={page} setPage={setPage} />
            </HStack>
          </VStack>
          <HStack
            w="100%"
            spacing={10}
            divider={<StackDivider borderColor="gray.200" />}
          >
            <StatsTable loading={loading} stats={stats} month={month} />
            <BarChart loading={loading} barData={barData} />
          </HStack>
        </VStack>
      </VStack>
    </Box>
  )
}

export default App
