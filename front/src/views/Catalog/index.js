import { makeStyles } from "@mui/styles";
import React from "react";
import CardArticulo from "../../components/CardArticulo";
const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    heigh: "100%",
  },
  cards: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    flex: "1",
  },

  spaceCard: {
    margin: "1em",
  },
}));

const foo = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const Catalog = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.cards}>
        {foo.map((item, index) => (
          <div className={classes.spaceCard}>
            <CardArticulo />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
