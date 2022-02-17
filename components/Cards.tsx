import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

import style from "./../styles/cardItem.module.css";

interface Propriedades {
  imagem: string;
  titulo?: string;
  extension: string;
}
//http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available
//http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg
export function CardItem(props: Propriedades) {
  console.log("Teste::", props.imagem);
  return (
    <Card
      sx={{ maxWidth: 200, minWidth: 200, maxHeight: 600 }}
      className={style.card}
    >
      <CardMedia
        component="img"
        height="180"
        image={`${props.imagem}.${props.extension}`}
        alt={props.titulo}
      />
      <CardContent className={style.content}>
        <Typography variant="h6" component="div" className={style.title}>
          {props.titulo}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography> */}
      </CardContent>
    </Card>
  );
}
