import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import moment from "moment";
import { TextField } from "@mui/material";

export default function BasicSelect({
  label,
  setEndDate,
  setStartDate,
  isWeekly,
  isDays,
}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event) => {
    setValue(event.target.value);

    let count = 1;
    if (isWeekly) {
      count = 7;
    }

    setStartDate(
      moment()
        .subtract(count * parseInt(event.target.value), "days")
        .format()
        ?.slice(0, 10)
    );
    setEndDate(moment().format()?.slice(0, 10));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        {isWeekly && (
          <>
            <InputLabel id="demo-simple-select-label">
              {label || "Select"}
            </InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              label={label || "Select"}
              onChange={handleChange}
            >
              <MenuItem value={1}>Last week</MenuItem>
              <MenuItem value={2}>Last 2 weeks </MenuItem>
              <MenuItem value={3}>Last 3 weeks</MenuItem>
              <MenuItem value={4}>Last 4 weeks</MenuItem>
              <MenuItem value={5}>Last 6 weeks</MenuItem>
              <MenuItem value={6}>Last 6 weeks </MenuItem>
              <MenuItem value={6}>Last 7 weeks</MenuItem>
            </Select>
          </>
        )}

        {isDays && (
          <TextField
            onChange={handleChange}
            id="outlined-basic"
            label={label || "Select"}
            variant="outlined"
          />
        )}
      </FormControl>
    </Box>
  );
}
