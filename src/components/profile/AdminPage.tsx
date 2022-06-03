import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AllOrdersView from "./AllOrdersView";
import AllUsersView from "./AllUsersView";
import ManageProductsView from "./ManageProductsView";
import UserRequestsView from "./UserRequestsView";
import { Button, Menu } from "@mui/material";
import { useState, useEffect, SyntheticEvent, MouseEvent } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import "./CSS/AdminAndProfile.css";
import { connectTabPanel, TabPanel } from "../../utils/componentFunction";

export default function AdminPage() {
  const [value, setValue] = useState(0);
  const [isDesktop, setDesktop] = useState(window.innerWidth > 768);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 768);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box className="menuPlacement">
      {isDesktop ? (
        <Box sx={{ borderRight: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} orientation="vertical">
            <Tab label="Manage Products" {...connectTabPanel(0)} />
            <Tab label="All Orders" {...connectTabPanel(1)} />
            <Tab label="All Users" {...connectTabPanel(2)} />
            <Tab label="User Requests" {...connectTabPanel(3)} />
          </Tabs>
        </Box>
      ) : (
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClick={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <Tabs value={value} onChange={handleChange} orientation="vertical">
              <Tab label="Manage Products" {...connectTabPanel(0)} />
              <Tab label="All Orders" {...connectTabPanel(1)} />
              <Tab label="All Users" {...connectTabPanel(2)} />
              <Tab label="User Requests" {...connectTabPanel(3)} />
            </Tabs>
          </Menu>
        </div>
      )}
      <TabPanel value={value} index={0}>
        <ManageProductsView />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AllOrdersView />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AllUsersView />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <UserRequestsView />
      </TabPanel>
    </Box>
  );
}
