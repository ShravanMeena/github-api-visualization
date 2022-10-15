import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

export default function BasicDateTimePicker({ setStartDate, setEndDate }) {
  const [_start, setStart] = useState(new Date());
  const [_end, setEnd] = useState(moment().add(1, "days").format());

  return (
    <div>
      <div
        style={{
          display: "flex",
          padding: 10,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={_start}
            onChange={(newValue) => {
              setStartDate(newValue);
              setStart(newValue);
            }}
            renderInput={(params) => (
              <TextField style={{ marginRight: 10 }} {...params} />
            )}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="End Date"
            value={_end}
            onChange={(newValue) => {
              setEndDate(newValue);
              setEnd(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
}
