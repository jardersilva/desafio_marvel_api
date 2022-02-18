import { useEffect, useState, useRef, ChangeEvent } from "react";
import type { NextPage } from "next";
import { Header } from "./../components/Header";
import { SearchBar } from "./../components/SearchBar";
import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import style from "./../styles/body";
import { CardLoading } from "./../components/Loading";
import { NoConection } from "./../components/NoConection";
import { CardItem } from "./../components/Cards";

import api from "./../utilites/api";

import { Comics } from "./../model/comics";

const Home: NextPage = () => {
  const [isLoad, setLoading] = useState(true);
  const [isErro, setErro] = useState(false);
  const [comics, setComics] = useState([]);
  const [favorit, setFavorit] = useState([]);
  const [comicsInit, setComicsInit] = useState([]); //Guarda o estado inicial dos objetos antes do filtro
  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

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
    setLoading(true);
    setErro(false);
    console.log("rquisição");
    try {
      const resposta = await api.get(
        "/v1/public/comics?apikey=be7407ff56bc607e391d7e2654207aaf&hash=c45ca19640da88212d17c7daa1f8c988&ts=1"
      );
      if (resposta.status === 200) {
        console.log("Result::", resposta.data.data.results);
        setComics(resposta.data.data.results);
        setComicsInit(resposta.data.data.results);
        var favoritos = [];

        if (localStorage.getItem("@marvel_app/favoritos") === null) {
        } else {
          favoritos = JSON.parse(
            localStorage.getItem("@marvel_app/favoritos") || "{}"
          );
        }
        setFavorit(favoritos);
        setLoading(false);
        setErro(false);
      } else {
        setLoading(false);
        setErro(true);
      }
    } catch (error) {
      setErro(true);
      console.log("Erro", error);
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    var Lista_temporaria = comicsInit;

    setComics(
      Lista_temporaria.filter((i: Comics) =>
        i.title.includes(e.currentTarget.value)
      )
    );

    setText(e.currentTarget.value);
  };

  const handleFavoritoADD = (iten: Comics) => {
    var favoritos = [];

    if (localStorage.getItem("@marvel_app/favoritos") === null) {
    } else {
      favoritos = JSON.parse(
        localStorage.getItem("@marvel_app/favoritos") || "{}"
      );
    }

    favoritos.push(iten);

    localStorage.setItem("@marvel_app/favoritos", JSON.stringify(favoritos));
    setFavorit(
      JSON.parse(localStorage.getItem("@marvel_app/favoritos") || "{}")
    );
    //console.log(localStorage.getItem("@marvel_app/favorito"));
  };

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
    //console.log(localStorage.getItem("@marvel_app/favorito"));
  };

  function isFavorito(id: number) {
    var temp = favorit;
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
      <SearchBar
        isLoading={isLoad}
        text={text}
        changeText={handleChange}
        onSearch={handleChange}
      />
      <div style={{ height: 15 }} />
      {corpo()}
    </div>
  );

  function corpo() {
    if (isLoad) {
      return isLoading();
    } else if (isErro) {
      return isNoConection();
    } else {
      return result();
    }
  }

  function result() {
    return (
      <Container>
        <Stack spacing={1}>
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
                onFavort={() => {
                  handleFavoritoADD(iten);
                }}
                onFavort2={() => {
                  handleFavoritoREM(iten);
                }}
                isFavort={isFavorito(iten.id)}
              />
            ))}
          </div>
          <div style={style.botaoRight}>
            <IconButton size="small" onClick={scrowAdd}>
              <ChevronRightIcon style={style.icons} />
            </IconButton>
          </div>
        </div>
      </Container>
    );
  }

  function isLoading() {
    return (
      <Container>
        <Stack spacing={1}>
          <Skeleton style={style.loading} width={210} height={45} />
        </Stack>
        <div style={style.scrow as React.CSSProperties}>
          <CardLoading />
          <CardLoading />
          <CardLoading />
          <CardLoading />
        </div>
      </Container>
    );
  }

  function isNoConection() {
    return <NoConection />;
  }
};

export default Home;
