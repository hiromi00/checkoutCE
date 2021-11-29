import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
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
import Loader from "../../components/Loader"
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
const mockData = [
  {
    id: Math.random(),
    nombre: "Producto 1",
    cantidad: "10",
    precio: "200000",
    descripcion:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThcNkzLbXXPOQRsdWSUN4zCxBisY_mYJNkuA&usqp=CAU",
  },
  {
    id: Math.random(),
    nombre: "Producto 1",
    cantidad: "10",
    precio: "200",
    descripcion: "Lorem impsum",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThcNkzLbXXPOQRsdWSUN4zCxBisY_mYJNkuA&usqp=CAU",
  },
  {
    id: Math.random(),
    nombre: "Producto 1",
    cantidad: "10",
    precio: "200",
    descripcion: "Lorem impsum",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThcNkzLbXXPOQRsdWSUN4zCxBisY_mYJNkuA&usqp=CAU",
  },
  {
    id: Math.random(),
    nombre: "Producto 1",
    cantidad: "10",
    precio: "200",
    descripcion: "Lorem impsum",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThcNkzLbXXPOQRsdWSUN4zCxBisY_mYJNkuA&usqp=CAU",
  },
  {
    id: Math.random(),
    nombre: "Producto 1",
    cantidad: "10",
    precio: "200",
    descripcion: "Lorem impsum",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThcNkzLbXXPOQRsdWSUN4zCxBisY_mYJNkuA&usqp=CAU",
  },
];
const ShoppingCart = () => {
  const [shopping, setShopping] = useState({});
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setShopping({ ...shopping, productos: mockData });
  }, []);
  return (
    <div>
      {(loading && <Loader />) || (
        <div>
          {!shopping ? (
            <div>
              <ShoppingCartIcon />
              {` No hay productos en tu carrito`}
            </div>
          ) : (
            <TableContainer component={Paper}>
              <Table aria-label="caption table">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.headerRow}>
                      Producto
                    </TableCell>
                    <TableCell className={classes.headerRow}></TableCell>
                    <TableCell className={classes.headerRow}>
                      Cantidad
                    </TableCell>
                    <TableCell className={classes.headerRow}>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {shopping?.productos?.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        <>
                          <Box
                            component="img"
                            src={row.imagen}
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
                          {row.descripcion}
                        </Typography>
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {row.cantidad}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        classes={{ root: classes.cellContainer }}
                      >
                        {`$ ${row.precio * row.cantidad}`}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
