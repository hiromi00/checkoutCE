import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { SnackbarProvider, useSnackbar } from "notistack";
import { cart } from "../services/catalog";

function CardMui({ id, model, price, path }) {
  const { enqueueSnackbar } = useSnackbar();
  const addToCart = async () => {
    await cart({ sneakers_id: id, quantity: 1, size_id: 5 })
      .then(() => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar("Se ha agregado con éxito", { variant: "success" });
      })
      .catch(() => {
        enqueueSnackbar("Ocurrió un error", { variant: "error" });
      });
  };

  return (
    <Card sx={{ width: 345, height: "100%" }}>
      <CardMedia
        component="img"
        height="200px"
        image={`https://raw.githubusercontent.com/hiromi00/checkoutCE/main/api/${path?.slice(
          1
        )}`}
        alt="articulo"
      />
      <CardContent sx={{ paddingBottom: 0 }}>
        <Typography gutterBottom variant="h5" component="div" textAlign="left">
          {model}
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="left">
          {`$ ${price}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" sx={{ textTransform: "none" }} onClick={addToCart}>
          <ShoppingCartIcon /> Agregar al carrito
        </Button>
      </CardActions>
    </Card>
  );
}

export default function CardArticulo(props) {
  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <CardMui {...props} />
      </SnackbarProvider>
    </>
  );
}
