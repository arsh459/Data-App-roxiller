import {
  Box,
  Select,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react"
import { useState } from "react"
import { FiSearch } from "react-icons/fi"

function Search({ search, setSearch }) {
  const [input, setInput] = useState("")
  function handleSearch(e) {
    if (e.key === "Enter") {
      setSearch(input)
    }
  }
  return (
    <Box>
      <InputGroup>
        <Input
          variant="outline"
          placeholder="Search Transaction"
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
          }}
          onKeyDown={handleSearch}
        />
        <InputRightAddon
          children={<FiSearch />}
          onClick={() => {
            setSearch(input)
          }}
          _hover={{ bg: "RGBA(0, 0, 0, 0.36)" }}
        />
      </InputGroup>
    </Box>
  )
}

export default Search
