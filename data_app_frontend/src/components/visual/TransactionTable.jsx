import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Skeleton,
  Box,
  Heading,
} from "@chakra-ui/react"
import { TableRow, TableHeader, Pagination } from "./index"

function TransactionTable({ transactions, setTransactions, loading }) {
  console.log("transactions", transactions)
  return (
    <Box>
      <Heading as="h2"></Heading>
      <TableContainer>
        <Table
          variant="simple"
          style={{
            border: "1px solid #999",
          }}
        >
          <TableCaption>
            Transactions -{" "}
            <Skeleton isLoaded={loading} display="inline">
              {transactions.length}
            </Skeleton>
          </TableCaption>
          <Thead style={{ border: "1px solid #999" }}>
            <TableHeader />
          </Thead>
          <Tbody
            style={{
              border: "1px solid #999",
            }}
          >
            {transactions
              .sort((a, b) => {
                return Number(a.price) - Number(b.price)
              })
              .map((transaction) => {
                return <TableRow transaction={transaction} loading={loading} />
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default TransactionTable
