import React from "react";
import HtmlIcon from "@mui/icons-material/Code";
import { ReactComponent as NodeLogo } from "../../assets/icons/node.svg";
import { ReactComponent as ReactLogo } from "../../assets/icons/reactjs-icon.svg";
import { ReactComponent as MySQLLogo } from "../../assets/icons/mysql-icon.svg";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import clsx from "clsx";
const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  element: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    cursor: "pointer",
    justifyContent: "flex-start",
    "&:hover": {
      "animation-name": "ball-bounce",
      "animation-duration": "2s",
      "animation-iteration-count": "infinite",
      "animation-delay": "2s",
      "animation-direction": "alternate",
    },
  },
  fontSpecs: {
    marginLeft: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
}));

const specs = [
  { nombre: "HTML 5", logo: <HtmlIcon style={{ width: "0.75em", height: "0.75em" }} />, link: "https://lenguajehtml.com/" },
  {
    nombre: "Node Js",
    logo: <NodeLogo style={{ width: "1em", height: "1em" }} />,
    link: "https://nodejs.org/es/about/",
  },
  {
    nombre: "MySQL",
    logo: <MySQLLogo style={{ width: "1em", height: "1em" }} />,
    link: "https://www.mysql.com/about/",
  },
  {
    nombre: "React",
    logo: <ReactLogo style={{ width: "1em", height: "1em" }} />,
    link: "https://es.reactjs.org/",
  },
];
const Specs = () => {
  const classes = useStyles();
  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.container}>
        {specs.map((spec) => (
          <Box component="a" className={clsx(classes.element)} href={spec.link}>
            {spec.logo}
            <Typography className={classes.fontSpecs}>{spec.nombre}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Specs;
