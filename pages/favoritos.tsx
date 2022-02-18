import { useEffect, useState, useRef } from "react";
import type { NextPage } from "next";
import { Header } from "./../components/HeaderFavorito";
import { BarTitle } from "./../components/BarTitleFavorito";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Container from "@mui/material/Container";
import { CardItem } from "./../components/Cards";
import style from "./../styles/body";

import { Comics } from "./../model/comics";

const Favoritos: NextPage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [comics, setComics] = useState([]);
  const [favorit, setFavorit] = useState([]);

  useEffect(() => {
    getComics();
  }, []);

  const scrowAdd = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 90;
    }
  };

  const scrowRev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 90;
    }
  };

  const onActionCard = (iten: string) => {
    window.open(iten, "_blank");
  };

  async function getComics() {
    var favoritos = [];

    if (localStorage.getItem("@marvel_app/favoritos") === null) {
    } else {
      favoritos = JSON.parse(
        localStorage.getItem("@marvel_app/favoritos") || "{}"
      );
    }
    setComics(favoritos);
  }

  const handleFavoritoREM = (iten: Comics) => {
    var favoritos = [];

    if (localStorage.getItem("@marvel_app/favoritos") === null) {
    } else {
      favoritos = JSON.parse(
        localStorage.getItem("@marvel_app/favoritos") || "{}"
      );
    }

    for (var i = 0; i < favoritos.length; i++) {
      if (favoritos[i].id === iten.id) {
        favoritos.splice(i, 1);
      }
    }

    localStorage.setItem("@marvel_app/favoritos", JSON.stringify(favoritos));
    setFavorit(
      JSON.parse(localStorage.getItem("@marvel_app/favoritos") || "{}")
    );
    getComics();
    //console.log(localStorage.getItem("@marvel_app/favorito"));
  };

  function isFavorito(id: number) {
    var temp = comics;
    var tamanho = temp.filter((i: Comics) => i.id === id).length;
    console.log("fff:: ", tamanho);
    if (tamanho > 0) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div>
      <Header texto="Home" />
      <BarTitle />
      <div style={{ height: 15 }} />
      {corpo()}
    </div>
  );

  function corpo() {
    return (
      <Container>
        <Stack spacing={1} style={style.subTitle as React.CSSProperties}>
          <Typography
            style={style.text}
            variant="subtitle1"
            gutterBottom
            component="div"
          >
            Resultado(s) ({comics.length})
          </Typography>
        </Stack>
        <div style={style.navigation}>
          <div style={style.botaoLeft}>
            <IconButton size="small" onClick={scrowRev}>
              <KeyboardArrowLeftIcon style={style.icons} />
            </IconButton>
          </div>
          <div ref={scrollRef} style={style.scrow as React.CSSProperties}>
            {comics.map((iten: Comics, x) => (
              <CardItem
                key={x}
                imagem={iten.thumbnail.path}
                extension={iten.thumbnail.extension}
                titulo={iten.title}
                onClick={() => {
                  onActionCard(iten.urls[0].url.toString());
                }}
                onFavort={() => {}}
                onFavort2={() => {
                  handleFavoritoREM(iten);
                }}
                isFavort={isFavorito(iten.id)}
              />
            ))}
          </div>
          <div style={style.botaoRight as React.CSSProperties}>
            <IconButton size="small" onClick={scrowAdd}>
              <ChevronRightIcon style={style.icons} />
            </IconButton>
          </div>
        </div>
      </Container>
    );
  }
};

export default Favoritos;
