import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import Loader from "../../components/Loader";
import { getCart } from "../../services/carrito";
import Utils from "../../utils/alert";
import { useNavigate } from "react-router";

const useStyles = makeStyles((theme) => ({
  descriptionFont: {
    opacity: 1,
    overflow: `hidden`,
    textOverflow: `ellipsis`,
    display: `-webkit-box`,
    "-webkit-line-clamp": 3,
    "-webkit-box-orient": `vertical`,
  },
  headerRow: {
    fontWeight: "bold",
    fontSize: "18px",
  },
  cellContainer: {
    padding: "0px",
  },
}));

const alerts = Utils;

const ShoppingCart = () => {
  const [shopping, setShopping] = useState([]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      await getCart()
        .then(({ data }) => {
          setShopping(data);
        })
        .catch((e) => {
          alerts.danger(e?.message);
        });
      setLoading(false);
    };
    fetchCart();
  }, []);

  return (
    <div>
      {loading && <Loader />}
      <Box>
        {!shopping.length ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <ShoppingCartIcon />
            <Typography sx={{ ml: "1em" }}>
              No hay productos en tu carrito
            </Typography>
          </Box>
        ) : (
          <div>
            <TableContainer component={Paper}>
              <Table aria-label="caption table">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.headerRow}>
                      Producto
                    </TableCell>
                    <TableCell className={classes.headerRow}></TableCell>
                    <TableCell className={classes.headerRow} align="center">
                      Cantidad
                    </TableCell>
                    <TableCell className={classes.headerRow} align="center">
                      {" "}
                      Total
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {shopping?.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        <>
                          <Box
                            component="img"
                            src={`https://raw.githubusercontent.com/hiromi00/checkoutCE/main/api/${row.sneakers.image_path?.slice(
                              1
                            )}`}
                            sx={{
                              maxHeight: "150px",
                              maxWidth: "150px",
                              pointerEvents: "none",
                            }}
                          />
                        </>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Typography className={classes.descriptionFont}>
                          {row.sneakers.model}
                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {row.quantity}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                        classes={{ root: classes.cellContainer }}
                      >
                        {`$ ${row.sneakers.price * row.quantity}`}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              variant="contained"
              onClick={() => navigate("/checkout")}
              sx={{ mt: 3, ml: 1 }}
            >
              Comprar ahora
            </Button>
          </div>
        )}
      </Box>
    </div>
  );
};

export default ShoppingCart;
