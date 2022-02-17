import { useEffect, useState, useRef } from "react";
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

import style from "./../styles/body.module.css";
import { CardLoading } from "./../components/Loading";
import { NoConection } from "./../components/NoConection";
import { CardItem } from "./../components/Cards";

import api from "./../utilites/api";

const Home: NextPage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isLoad, setLoading] = useState(true);
  const [isErro, setErro] = useState(false);
  const [comics, setComics] = useState([]);
  const [comicsInit, setComicsInit] = useState([]); //Guarda o estado inicial dos objetos antes do filtro
  const [text, setText] = useState("");

  useEffect(() => {
    getComics();
  }, []);

  const scrowAdd = () => {
    scrollRef.current.scrollLeft += 90;
  };

  const scrowRev = () => {
    scrollRef.current.scrollLeft -= 90;
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

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setText(e.currentTarget.value);
  };

  return (
    <div>
      <Header />
      <SearchBar
        isLoading={isLoad}
        text={text}
        changeText={handleChange}
        onSearch={() => {
          setText("s");
        }}
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
            className={style.text}
            variant="subtitle1"
            gutterBottom
            component="div"
          >
            Resultado(s) ({comics.length})
          </Typography>
        </Stack>
        <div className={style.navigation}>
          <div className={style.botao}>
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
              />
            ))}
          </div>
          <div className={style.botao}>
            <IconButton size="small" onClick={scrowAdd}>
              <ChevronRightIcon className={style.icons} />
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
          <Skeleton className={style.loading} width={210} height={45} />
        </Stack>
        <div className={style.scrow}>
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
