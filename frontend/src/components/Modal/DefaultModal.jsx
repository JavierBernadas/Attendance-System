import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  //   border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: "16px",
};

export default function TransitionsModal({ open, onClose , Header , Content , onConfirm }) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {Header}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {Content}

            </Typography>
          
            <Stack
              spacing={1}
              direction="row"
              useFlexGap
              
              sx={{ flexWrap: "wrap", mt: 2 }}
            >
            <Button variant="contained" 
            onClick={onConfirm}
            >Confirm</Button>

              <Button
                onClick={onClose}
              variant="outlined">Cancel</Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
