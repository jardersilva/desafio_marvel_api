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
import style from "./../styles/body.module.css";
import Button from "@mui/material/Button";
import EmailIcon from "@mui/icons-material/Email";

const Favoritos: NextPage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [comics, setComics] = useState([]);
  const [favorit, setFavorit] = useState([]);

  useEffect(() => {
    getComics();
  }, []);

  const scrowAdd = () => {
    scrollRef.current.scrollLeft += 90;
  };

  const scrowRev = () => {
    scrollRef.current.scrollLeft -= 90;
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

  const handleFavoritoREM = (iten) => {
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

  function isFavorito(id: string) {
    var temp = comics;
    var tamanho = temp.filter((i) => i.id === id).length;
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
        <Stack spacing={1} className={style.subTitle}>
          <Typography
            className={style.text}
            variant="subtitle1"
            gutterBottom
            component="div"
          >
            Resultado(s) ({comics.length})
          </Typography>
        </Stack>
        <div className={style.navigation}>
          <div className={style.botaoLeft}>
            <IconButton size="small" onClick={scrowRev}>
              <KeyboardArrowLeftIcon className={style.icons} />
            </IconButton>
          </div>
          <div ref={scrollRef} className={style.scrow}>
            {comics.map((iten, x) => (
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
          <div className={style.botaoRight}>
            <IconButton size="small" onClick={scrowAdd}>
              <ChevronRightIcon className={style.icons} />
            </IconButton>
          </div>
        </div>
      </Container>
    );
  }
};

export default Favoritos;
