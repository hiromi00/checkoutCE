import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import CardArticulo from "../../components/CardArticulo";
import Loader from "../../components/Loader";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 400);
    }
  }, [loading]);

  const classes = useStyles();
  return (
    <div className={classes.container}>
      {(loading && <Loader />) || (
        <div className={classes.cards}>
          {foo.map((item, index) => (
            <div className={classes.spaceCard}>
              <CardArticulo />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalog;
