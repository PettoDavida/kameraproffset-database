import { Box } from "@mui/material";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./changePassword";
import "./CSS/ManageAccountView.css";

export default function ManageAccountView() {
  return (
    <Box className="manageAccountViewContainer">
      <ChangePassword />
      <ChangeEmail />
    </Box>
  );
}
