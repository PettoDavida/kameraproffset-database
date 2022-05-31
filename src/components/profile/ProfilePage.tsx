import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import OrderView from "./OrderView";
import ManageAccountView from "./ManageAccountView";
import { Button, Menu } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  ReactNode,
  useState,
  useEffect,
  SyntheticEvent,
  MouseEvent,
} from "react";
import "./CSS/AdminAndProfile.css";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ width: "100%" }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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
            <Tab label="Orders" {...a11yProps(0)} />
            <Tab label="Manage" {...a11yProps(1)} />
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
              <Tab label="Orders" {...a11yProps(0)} />
              <Tab label="Manage" {...a11yProps(1)} />
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
