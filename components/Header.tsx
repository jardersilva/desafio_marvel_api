import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import styles from "./../styles/header.module.css";
import logo from "./../assets/logo.png";
import Box from "@mui/material/Box";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import Link from "next/link";

interface Propriedade {
  texto: string;
}

export function Header(props: Propriedade) {
  return (
    <AppBar className={styles.headers} elevation={0}>
      <Toolbar className={styles.headers}>
        <Image src={logo} alt="logo marvel" width={100} height={40} />
        <Box sx={{ flexGrow: 1 }} />

        <Link href="/favoritos">
          <Button className={styles.botao} startIcon={<FavoriteIcon />}>
            Favoritos
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
