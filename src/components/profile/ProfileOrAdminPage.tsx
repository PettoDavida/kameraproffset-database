import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AdminPage from "./AdminPage";
import ProfilePage from "./ProfilePage";
import NotAdmin from "./NotAdmin";
import { getLoginToken, getTokenData } from "../../utils/token";
import { useNavigate } from "react-router-dom";
import { ReactNode, SyntheticEvent, useState } from "react";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
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

export default function ProfileOrAdminPage() {
  const [value, setValue] = useState(0);
  let navigate = useNavigate();

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  let token = getLoginToken();

  let tokenData = getTokenData(token!);

  return (
    <Box sx={{}}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", paddingTop: "5rem" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Profile" {...a11yProps(0)} />
          <Tab label="Admin" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ProfilePage />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {tokenData.isAdmin ? <AdminPage /> : <NotAdmin />}
      </TabPanel>
    </Box>
  );
}
