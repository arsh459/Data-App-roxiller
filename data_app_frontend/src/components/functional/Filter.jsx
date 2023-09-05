import { Box, Select } from "@chakra-ui/react"

function Filter({ month, setMonth }) {
  return (
    <Box>
      <Select
        placeholder="Select Month"
        value={month}
        variant="outline"
        onChange={(e) => {
          if (e.target.value == 0) {
            setMonth(3)
          } else {
            console.log(e.target.value)
            setMonth(e.target.value)
          }
        }}
      >
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </Select>
    </Box>
  )
}

export default Filter
