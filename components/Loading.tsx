import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

import style from "./../styles/sketeton2.module.css";

export function CardLoading() {
  return (
    <Card sx={{ maxWidth: 200, minWidth: 200 }} className={style.card}>
      <CardActionArea className={style.card}>
        <Skeleton
          className={style.body}
          height={350}
          style={{ marginTop: -80, marginBottom: -60 }}
        />
        <Skeleton
          className={style.body}
          width={100}
          height={25}
          style={{ marginTop: -20 }}
        />
        <Skeleton
          className={style.body}
          width={150}
          height={25}
          style={{ marginBottom: 8 }}
        />
      </CardActionArea>
    </Card>
  );
}
