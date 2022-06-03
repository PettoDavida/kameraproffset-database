import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AdminPage from "./AdminPage";
import ProfilePage from "./ProfilePage";
import NotAdmin from "./NotAdmin";
import { getLoginToken, getTokenData } from "../../utils/token";
import { useNavigate } from "react-router-dom";
import { SyntheticEvent, useEffect, useState } from "react";
import { connectTabPanel, TabPanel } from "../../utils/componentFunction";

export default function ProfileOrAdminPage() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  let token = getLoginToken();

  useEffect(() => {
    if (!token) navigate("/");
  }, []);

  if (!token) return null;

  let tokenData = getTokenData(token);
  return (
    <Box sx={{ minHeight: "80vh" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Profile" {...connectTabPanel(0)} />
          <Tab label="Admin" {...connectTabPanel(1)} />
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
