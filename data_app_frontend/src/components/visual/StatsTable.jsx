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
import { getMonth } from "../../utils/product.util"
function StatsTable({ loading, stats, month }) {
  return (
    <Box h="100%" style={{ alignSelf: "flex-start" }}>
      <Box
        display={"flex"}
        style={{ justifyContent: "space-between", flexDirection: "column" }}
        gap={20}
      >
        <Box>
          <Box
            style={{
              textAlign: "left",
              fontSize: "16px",
              color: "rgb(117, 117, 117)",
            }}
          >
            Statistics - {getMonth(month)}
          </Box>
          <Box
            style={{
              textAlign: "left",
              fontSize: "14px",
              color: "rgb(189, 189, 189)",
            }}
          >
            Total Items Sold and Sale
          </Box>
        </Box>
        <TableContainer>
          <Table variant="simple">
            <Tbody className="border">
              <Tr>
                <Td>Total Sale</Td>
                <Td isNumeric>
                  <Skeleton isLoaded={loading}>
                    ${stats?.totalSaleAmount?.toFixed(2)}
                  </Skeleton>
                </Td>
              </Tr>
              <Tr>
                <Td>Total Sold Item</Td>
                <Td isNumeric>
                  <Skeleton isLoaded={loading}>
                    {stats?.totalSoldItems}
                  </Skeleton>
                </Td>
              </Tr>
              <Tr>
                <Td>Total Not Sold Item</Td>
                <Td isNumeric>
                  <Skeleton isLoaded={loading}>
                    {stats?.totalNotSoldItems}
                  </Skeleton>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default StatsTable
