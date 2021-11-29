import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import { signUp } from "../../services/auth";
import Utils from "../../utils/alert";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { ReactComponent as LogoCheckout } from "../../assets/images/whiteLogo.svg";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        CheckoutCE
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
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

export default function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 400);
    }
  }, [loading]);

  const formik = useFormik({
    initialValues: {
      username: "",
      name: "",
      lastname: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      await signUp(values)
        .then((response) => {
          alerts.success(
            ``,
            `Usuario ${response.data.username} creado con éxito`,
            () => navigate(`/login`)
          );
        })
        .catch((e) => {
          alerts.danger(e?.message, () => navigate(`/signup`));
        });
    },
  });

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
        <Toolbar>
          <Avatar sx={{ bgcolor: "transparent", mx: "2%" }}>
            <LogoCheckout />
          </Avatar>
          <Typography variant="h6" color="white" noWrap>
            CheckoutCE
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs">
        {(loading && <Loader />) || (
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Nuevo usuario
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="username"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="Nombre de usuario"
                    autoFocus
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Nombre"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastname"
                    label="Apellido"
                    name="lastname"
                    autoComplete="family-name"
                    onChange={formik.handleChange}
                    value={formik.values.lastname}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Correo electrónico"
                    name="email"
                    autoComplete="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                onClick={formik.handleSubmit}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Crea tu cuenta
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="/login" variant="body2">
                    ¿Ya tienes una cuenta? Inicia sesión
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
