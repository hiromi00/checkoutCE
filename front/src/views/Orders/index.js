import React, { useEffect, useState } from "react";
import OrdersView from "../Home/Orders";
import Loader from "../../components/Loader";

const Orders = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 400);
    }
  }, [loading]);

  return <>{(loading && <Loader />) || <OrdersView />}</>;
};

export default Orders;
