import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import styles from "./../styles/header.module.css";
import logo from "./../assets/logo.png";
import Box from "@mui/material/Box";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";

export function Header() {
  return (
    <AppBar className={styles.headers} elevation={0}>
      <Toolbar className={styles.headers}>
        <Image src={logo} alt="logo marvel" width={100} height={40} />
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Historias em quadrinhos Marvel
        </Typography>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <FavoriteIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
