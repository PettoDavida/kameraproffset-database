import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ProductBackend } from "../utils/backend";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const Theme = createTheme({
  palette: {
    primary: {
      main: "#333333",
      contrastText: "#FBF7F5", //button text white instead of black
    },
    background: {
      default: "#333333",
    },

    secondary: {
      main: "#DA344D",
    },
  },
});

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

interface Props {
  product: ProductBackend;
}

export default function ProductTab(props: Props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={Theme}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Produktinfo" {...a11yProps(0)} />
            <Tab label="Specs" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Typography>{props.product.longInfo}</Typography>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ul style={{ padding: "0" }}>
            {/*
            // TODO: Fixme
            {props.product.specs.map((test) => (
              <li
                style={{ display: "flex", justifyContent: "space-between" }}
                key={test.id}
              >
                <Typography style={{ margin: "0" }}>
                  {test.spectitle}
                </Typography>
                <Typography style={{ margin: ".3rem 0" }}>
                  {test.spec}
                </Typography>
              </li>
            ))}*/}
          </ul>
        </TabPanel>
      </Box>
    </ThemeProvider>
  );
}
