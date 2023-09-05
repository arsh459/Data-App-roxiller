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
} from "@chakra-ui/react"
import { capitalize } from "../../utils/product.util"
export default function TableRow({ transaction, loading }) {
  return (
    <Tr key={transaction.id} className="border">
      <Td>
        <Skeleton isLoaded={loading}>{transaction.id}</Skeleton>
      </Td>
      <Td>
        <Skeleton isLoaded={loading}>{transaction.title}</Skeleton>
      </Td>
      <Td isNumeric>
        <Skeleton isLoaded={loading}>${transaction.price.toFixed(2)}</Skeleton>
      </Td>
      <Td>
        <Skeleton isLoaded={loading}>
          {capitalize(transaction.category)}
        </Skeleton>
      </Td>
      <Td style={transaction.sold ? { color: "green" } : { color: "red" }}>
        <Skeleton isLoaded={loading}>
          {transaction.sold ? capitalize("true") : capitalize("false")}
        </Skeleton>
      </Td>

      <Td>
        <div style={{ width: "90%", margin: "auto" }}>
          <Skeleton isLoaded={loading}>
            <img
              src={transaction.image}
              width={16}
              height={16}
              style={{ display: "block", margin: "auto" }}
            />
          </Skeleton>
        </div>
      </Td>
    </Tr>
  )
}
