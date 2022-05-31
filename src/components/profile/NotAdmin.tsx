import { Box, Button, Typography } from "@mui/material";
import { createRequest, RequestData } from "../../utils/backend";

export default function NotAdmin() {
  return (
    <Box>
      <Typography>You are not allowed here as you are not an Admin</Typography>
      <Typography>
        Do you wish to become an Admin? Send in your request
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          const requestData: RequestData = {
            title: "Admin Privileges",
            passwordRequest: false,
          };

          createRequest(requestData);
        }}
      >
        Here
      </Button>
    </Box>
  );
}
