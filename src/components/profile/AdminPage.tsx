import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AllOrdersView from "./AllOrdersView";
import AllUsersView from "./AllUsersView";
import ManageProductsView from "./ManageProductsView";
import UserRequestsView from "./UserRequestsView";
import { Button, Menu } from "@mui/material";
import {
  ReactNode,
  useState,
  useEffect,
  SyntheticEvent,
  MouseEvent,
} from "react";
import MenuIcon from "@mui/icons-material/Menu";

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

export default function AdminPage() {
  const [value, setValue] = useState(0);
  const [isDesktop, setDesktop] = useState(window.innerWidth > 1450);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 1450);
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
    <Box sx={{}}>
      {isDesktop ? (
        <Box sx={{ borderRight: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} orientation="vertical">
            <Tab label="Manage Products" {...a11yProps(0)} />
            <Tab label="All Orders" {...a11yProps(1)} />
            <Tab label="All Users" {...a11yProps(2)} />
            <Tab label="User Requests" {...a11yProps(3)} />
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
              <Tab label="Manage Products" {...a11yProps(0)} />
              <Tab label="All Orders" {...a11yProps(1)} />
              <Tab label="All Users" {...a11yProps(2)} />
              <Tab label="User Requests" {...a11yProps(3)} />
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
