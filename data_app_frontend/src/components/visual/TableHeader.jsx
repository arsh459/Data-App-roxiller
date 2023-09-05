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
export default function TableHeader() {
  return (
    <Tr className="border">
      <Th>ID</Th>
      <Th>Title</Th>
      <Th isNumeric>Price</Th>
      <Th>Category</Th>
      <Th>Sold</Th>
      <Th>Image</Th>
    </Tr>
  )
}
