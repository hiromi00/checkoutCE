import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Loader from "../../components/Loader";
import Utils from "../../utils/alert";
import { getCart } from "../../services/carrito";

const addresses = ["1 MUI Drive", "Reactville", "Anytown", "99999", "USA"];
const payments = [
  { name: "Tarjeta", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

const alerts = Utils;

export default function Review() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      await getCart()
        .then(({ data }) => {
          setProducts(data);
          let aux = 0;
          data?.map((element) => {
            aux += element.sneakers.price * element.quantity;
            setTotal(aux);
          });
        })
        .catch((e) => {
          alerts.danger(e?.message);
        });
      setLoading(false);
    };
    fetchCart();
  }, []);

  
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Orden de compra
      </Typography>
      <List disablePadding>
        {products.map((product, index) => (
          <ListItem key={index} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={product.sneakers.model}
              secondary={`Cantidad: ${product.quantity}`}
            />
            <Typography variant="body2">{`$ ${
              product.sneakers.price * product.quantity
            }`}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {`$ ${total}`}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Envío
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Detalles de pago
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
