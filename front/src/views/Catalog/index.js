import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import CardArticulo from "../../components/CardArticulo";
import { getCatalog } from "../../services/catalog";
import Utils from "../../utils/alert";
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

const alerts = Utils;

const Catalog = () => {
  const [sneakers, setSneakers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const get = async () => {
      await getCatalog()
        .then(({ data }) => setSneakers(data))
        .catch((e) => {
          alerts.danger(e?.message);
        });

      setLoading(false);
    };
    get();
  }, []);

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.cards}>
        {loading ? (
          <Loader />
        ) : (
          <>
            {sneakers.map((item, index) => (
              <div key={item.id} className={classes.spaceCard}>
                <CardArticulo
                  id={item.id}
                  model={item.model}
                  price={item.price}
                  path={item.image_path}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Catalog;
