import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import {
  getRequestsFromBackend,
  approveRequest,
  RequestBackend,
} from "../../utils/backend";

export default function UserRequestsView() {
  const [requests, setRequests] = useState<RequestBackend[]>([]);

  useEffect(() => {
    getRequestsFromBackend()
      .then((data) => data.json())
      .then((requests) => setRequests(requests));
  }, []);

  return (
    <div>
      {requests.map((item: RequestBackend, i: number) => (
        <Accordion key={i} sx={{ width: "100%" }}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{item.requestingUserId}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.title}</Typography>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                approveRequest(item._id);
              }}
            >
              {item.passwordRequest
                ? "Approve password reset"
                : "Approve admin request"}
            </Button>
            <Button variant="contained" color="error" onClick={() => {}}>
              Deny Request
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
