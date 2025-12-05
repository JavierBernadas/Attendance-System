import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  outline: "none",
};
export default function ErrorNotif({ open, clickHandleClose }) {
  const navigate = useNavigate();
  const handleLogin = () => {
    console.log("Back to Login Token Expired ! ");
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <Modal
        open={open}
        // onClose={clickHandleClose} remove ang click side !
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <ReportProblemIcon
              sx={{ fontSize: 32, color: "red", mr: 2 }} // red icon + margin-right
            />
            Your session has expired!
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please log in again to continue using the app.
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="contained" onClick={handleLogin}>
              Login
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
