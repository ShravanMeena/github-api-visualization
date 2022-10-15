import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import BasicDateTimePicker from "../BasicDateTimePicker";
import BasicSelect from "../Select";

export default function ResponsiveDialog({
  setStartDate,
  setEndDate,
  fetchMoreData,
  isWeekly,
  isDays,
  isCustomRange,
}) {
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        style={{ marginLeft: 10 }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Filter by
        {isWeekly && " Weeks"}
        {isDays && " Days"}
        {isCustomRange && " Custom Date Range"}
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Select "}</DialogTitle>
        <DialogContent style={{ minWidth: 400, padding: 20 }}>
          {isCustomRange && (
            <BasicDateTimePicker
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          )}
          {isWeekly && (
            <BasicSelect
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              label="Weeks"
              isWeekly
            />
          )}
          {isDays && (
            <BasicSelect
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              label="Days"
              isDays
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            CLOSE
          </Button>
          <Button
            onClick={() => {
              fetchMoreData();
              handleClose();
            }}
            autoFocus
          >
            FILTER
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
