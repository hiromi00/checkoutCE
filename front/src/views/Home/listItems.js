import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useNavigate } from "react-router-dom";

export const MainListItems = () => {
  const navigate = useNavigate();
  return (
    <List>
      <ListItem button onClick={() => navigate(`/`)}>
        <ListItemIcon>
          <StorefrontIcon />
        </ListItemIcon>
        <ListItemText primary="Catálogo" />
      </ListItem>
      <ListItem button onClick={() => navigate(`/shopping_cart`)}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Carrito de Compras" />
      </ListItem>
      <ListItem button onClick={() => navigate(`/orders`)}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Órdenes" />
      </ListItem>
    </List>
  );
};

export const SecondaryListItems = () => {
  const navigate = useNavigate();

  return (
    <div>
      <ListItem button onClick={() => navigate(`/specs`)}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Especificaciones" />
      </ListItem>
    </div>
  );
};
