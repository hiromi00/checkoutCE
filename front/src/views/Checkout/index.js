import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { ReactComponent as LogoCheckout } from "../../assets/images/whiteLogo.svg";
import { Avatar } from "@mui/material";
import Utils from "../../utils/alert";
import { useNavigate } from "react-router-dom";
import { sellProducts } from "../../services/carrito";
import Loader from "../../components/Loader";
import { replace } from "formik";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        CheckoutCE
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Dirección de envío", "Detalles de pago", "Revise su orden"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

const theme = createTheme({
  palette: {
    secondary: {
      main: "#2ebf91",
    },
    primary: {
      main: "#8360c3",
    },
  },
});

const alerts = Utils;

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleNext = () => {
    activeStep === steps.length - 1
      ? handleNotification()
      : setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleNotification = async () => {
    setLoading(true);
    try {
      await sellProducts();
      alerts.success("", "¡Tu pedido se ha realizado con éxito!", () =>
        window.location.replace(`https://matias.ma/nsfw/`)
      );
    } catch (e) {
      alerts.danger(e?.message);
    }

    setLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          backgroundColor: theme.palette.primary.main,
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        {loading && <Loader />}
        <Toolbar>
          <Avatar sx={{ bgcolor: "transparent", mx: "2%" }}>
            <LogoCheckout />
          </Avatar>
          <Typography variant="h6" color="white" noWrap>
            CheckoutCE
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Gracias por tu pedido.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Regresar
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1
                      ? "Realizar orden"
                      : "Siguiente"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
