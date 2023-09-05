import { Table, Box, HStack, Button } from "@chakra-ui/react"
export default function Pagination({ page, setPage }) {
  return (
    <HStack spacing={20}>
      <Button colorScheme="teal" variant="outline">
        Page no - {page}
      </Button>
      <HStack>
        <Button
          onClick={() => {
            if (page > 1) setPage(page - 1)
          }}
          isDisabled={page == 1 ? true : false}
        >
          Previous
        </Button>
        <Box>----</Box>
        <Button
          onClick={() => {
            setPage(page + 1)
          }}
        >
          Next
        </Button>
      </HStack>
      <Button colorScheme="teal" variant="outline">
        Per Page - 10
      </Button>
    </HStack>
  )
}
