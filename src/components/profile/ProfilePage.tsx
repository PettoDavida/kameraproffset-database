import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import OrderView from "./OrderView";
import ManageAccountView from "./ManageAccountView";
import { Button, Menu } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useEffect, SyntheticEvent, MouseEvent } from "react";
import "./CSS/AdminAndProfile.css";
import { connectTabPanel, TabPanel } from "../../utils/componentFunction";

export default function ProfilePage() {
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
            <Tab label="Orders" {...connectTabPanel(0)} />
            <Tab label="Manage" {...connectTabPanel(1)} />
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
              <Tab label="Orders" {...connectTabPanel(0)} />
              <Tab label="Manage" {...connectTabPanel(1)} />
            </Tabs>
          </Menu>
        </div>
      )}
      <TabPanel value={value} index={0}>
        <OrderView />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ManageAccountView />
      </TabPanel>
    </Box>
  );
}
