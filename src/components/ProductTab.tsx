import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ProductBackend, Specs } from "../utils/backend";
import { connectTabPanel, TabPanel } from "../utils/componentFunction";

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

interface Props {
  product?: ProductBackend;
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
            <Tab label="Produktinfo" {...connectTabPanel(0)} />
            <Tab label="Specs" {...connectTabPanel(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Typography>
            {props.product?.longInfo !== undefined
              ? props.product!.longInfo!
              : "Found no info"}
          </Typography>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ul style={{ padding: "0" }}>
            {props.product?.specs !== undefined
              ? props.product.specs.map((item: Specs, i: number) => (
                  <li
                    style={{ display: "flex", justifyContent: "space-between" }}
                    key={i}
                  >
                    <Typography style={{ margin: "0" }}>
                      {item.spectitle!}
                    </Typography>
                    <Typography style={{ margin: ".3rem 0" }}>
                      {item.spec!}
                    </Typography>
                  </li>
                ))
              : "Specs not found"}
          </ul>
        </TabPanel>
      </Box>
    </ThemeProvider>
  );
}
