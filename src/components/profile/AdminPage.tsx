import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AllOrdersView from "./AllOrdersView";
import AllUsersView from "./AllUsersView";
import ManageProductsView from "./ManageProductsView";
import UserRequestsView from "./UserRequestsView";

interface TabPanelProps {
  children?: React.ReactNode;
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
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Box sx={{ borderRight: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} orientation="vertical">
          <Tab label="Manage Products" {...a11yProps(0)} />
          <Tab label="All Orders" {...a11yProps(1)} />
          <Tab label="All Users" {...a11yProps(2)} />
          <Tab label="User Requests" {...a11yProps(3)} />
        </Tabs>
      </Box>
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
