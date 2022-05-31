import { Close, ExpandMore } from "@mui/icons-material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import AdminChangePassword from "./AdminChangePassword";

export interface User {
  _id: String;
  email: String;
  isAdmin: Boolean;
}

export default function AllUsersView() {
  const [users, setUsers] = useState<[]>([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getUsersFromBackend = async () => {
    let headers: RequestInit = {
      method: "GET",
    };
    fetch("http://localhost:3000/api/user", headers)
      .then((res: Response) => {
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUsersFromBackend();
  }, []);

  return (
    <div>
      <div>
        {users.map((item: User, i: number) => (
          <Accordion key={i} sx={{ width: "100%" }}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{item.email}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {item.email} is {item.isAdmin ? "an admin" : "not an admin"}
              </Typography>
              <ButtonGroup>
                <Button
                  onClick={handleClickOpen}
                  variant="contained"
                  size="large"
                  color="warning"
                >
                  Change Password
                </Button>
                <Dialog open={open} onClose={handleClose}>
                  <DialogActions>
                    <Button onClick={handleClose}>
                      <Close />
                    </Button>
                  </DialogActions>
                  <DialogTitle>Change {item.email} password</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      As an admin you can change anyones password please don't
                      use this with malicious intent
                    </DialogContentText>
                    <AdminChangePassword {...item} />
                  </DialogContent>
                </Dialog>
                {item.isAdmin ? (
                  ""
                ) : (
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => {
                      const token = localStorage.getItem("loginToken");
                      if (!token) return;

                      let headers: RequestInit = {
                        method: "DELETE",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                      };
                      fetch(
                        `http://localhost:3000/api/user/${item._id}`,
                        headers
                      ).then(() => {
                        getUsersFromBackend();
                      });
                    }}
                    startIcon={<DeleteForeverIcon />}
                  >
                    Remove User
                  </Button>
                )}
              </ButtonGroup>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
