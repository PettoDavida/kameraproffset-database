import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import * as React from "react";

interface Props {
  info: string;
}

export default function ProductAccordion(props: Props) {
  return (
    <div style={{ padding: "1rem" }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={{ padding: "0 .5rem" }}>Mer info</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{props.info}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
