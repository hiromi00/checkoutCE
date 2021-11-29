import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { SnackbarProvider, useSnackbar } from "notistack";

function CardMui() {
  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar("Se ha agregado con éxito", { variant });
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://images6.alphacoders.com/361/thumbbig-361483.webp"
        alt="articulo"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Pug
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          sx={{ textTransform: "none" }}
          onClick={handleClickVariant("success")}
        >
          <ShoppingCartIcon /> Agregar al carrito
        </Button>
      </CardActions>
    </Card>
  );
}

export default function CardArticulo() {
  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <CardMui />
      </SnackbarProvider>
    </>
  );
}
