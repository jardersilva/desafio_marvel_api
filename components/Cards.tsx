import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import style from "./../styles/cardItem.module.css";

interface Propriedades {
  imagem: string;
  titulo?: string;
  extension: string;
  onClick: () => void;
  onFavort: () => void;
  onFavort2: () => void;
  isFavort: boolean;
}
//http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available
//http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg
export function CardItem(props: Propriedades) {
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
      <CardActions className={style.actions}>
        <Button
          className={style.actionsLabel}
          size="small"
          onClick={props.onClick}
        >
          Abrir
        </Button>
        {props.isFavort ? (
          <IconButton
            className={style.actionsIcon}
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            onClick={props.onFavort2}
          >
            <FavoriteIcon />
          </IconButton>
        ) : (
          <IconButton
            className={style.actionsIcon}
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            onClick={props.onFavort}
          >
            <FavoriteBorderIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}
