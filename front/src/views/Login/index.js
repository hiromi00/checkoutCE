import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReactComponent as LogoCheckout } from "../../assets/images/logo.svg";
import Utils from "../../utils/alert";
import { useFormik } from "formik";
import { login } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

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

export default function SignInSide() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onLogin = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      await login(values)
        .then(({ data }) => {
          onLogin(data);
          navigate(`/`, { replace: true });
        })
        .catch((e) => {
          alerts.danger(e?.message);
        });
      setLoading(false);
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <LogoCheckout />
            <Typography component="h1" variant="h5">
              Iniciar sesión
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Nombre de usuario"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={formik.handleSubmit}
              >
                Iniciar sesión
              </Button>
              {loading && (
                <div>
                  <Loader />
                </div>
              )}
              <div>
                <Link href="/signup" variant="body2">
                  {"¿No tienes cuenta? Regístrate"}
                </Link>
              </div>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
