import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import "../CSS/imgslider.css";
import { getImageUrl, ProductBackend } from "../utils/backend";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const AutoPlaySwipeableViews = SwipeableViews;

const sliderTheme = createTheme({
  palette: {
    primary: {
      main: "#333333",
      contrastText: "#FBF7F5", //button text white instead of black
    },
    background: {
      default: "#FFFFFF",
    },

    secondary: {
      main: "#333333",
    },
  },
});

interface Props {
  product: ProductBackend;
}

function ProductInfoImageSlider(props: Props) {
  const { product } = props;
  const images = props.product.images;

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <ThemeProvider theme={sliderTheme}>
      <div className="left-product-container">
        <Box className="img-slider" sx={{ flexGrow: 1 }}>
          <AutoPlaySwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {images.map((imageId, i) => (
              <div key={i}>
                {Math.abs(activeStep - i) <= 2 ? (
                  <Box
                    className="img"
                    component="img"
                    src={getImageUrl(imageId)}
                    alt="image"
                  />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          <MobileStepper
            className="next"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
          <Paper
            square
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 50,
              pl: 2,
            }}
          >
            <Typography>TODO</Typography>
          </Paper>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default ProductInfoImageSlider;
