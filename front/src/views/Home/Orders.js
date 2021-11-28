import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { makeStyles } from "@mui/styles";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    "16 Mar, 2019",
    "Elvis Presley",
    "Tupelo, MS",
    "VISA ⠀•••• 3719",
    312.44
  ),
  createData(
    1,
    "16 Mar, 2019",
    "Paul McCartney",
    "London, UK",
    "VISA ⠀•••• 2574",
    866.99
  ),
  createData(
    2,
    "16 Mar, 2019",
    "Tom Scholz",
    "Boston, MA",
    "MC ⠀•••• 1253",
    100.81
  ),
  createData(
    3,
    "16 Mar, 2019",
    "Michael Jackson",
    "Gary, IN",
    "AMEX ⠀•••• 2000",
    654.39
  ),
  createData(
    4,
    "15 Mar, 2019",
    "Bruce Springsteen",
    "Long Branch, NJ",
    "VISA ⠀•••• 5919",
    212.79
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

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
}));
export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Lista de pedidos</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell className={classes.headerRow}>Fecha</TableCell>
            <TableCell className={classes.headerRow}>Producto</TableCell>
            <TableCell className={classes.headerRow}>Enviado a</TableCell>
            <TableCell className={classes.headerRow}>Método de pago</TableCell>
            <TableCell align="right" className={classes.headerRow}>
              Total
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`$ ${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
