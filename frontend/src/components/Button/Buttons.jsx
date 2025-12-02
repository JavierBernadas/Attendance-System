import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function Buttons({ buttonName, onClick, startIcon }) {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        {...(startIcon ? { startIcon } : {})}
        onClick={onClick}
      >
        {buttonName}
      </Button>
    </Stack>
  );
}
