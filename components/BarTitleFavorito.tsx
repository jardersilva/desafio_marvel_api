import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import style from "./../styles/searchBar.module.css";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

import Button from "@mui/material/Button";
import EmailIcon from "@mui/icons-material/Email";

import axios from "axios";

export function BarTitle() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const handleClose = () => setOpen(false);

  const handleOpen = () => setOpen(true);

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setText(e.currentTarget.value);
  };

  async function getComics() {
    var favoritos = [];
    var html = `<html><body><h2>Esse são os seus comics favoritos: </h2><ul>`;

    if (localStorage.getItem("@marvel_app/favoritos") === null) {
    } else {
      favoritos = JSON.parse(localStorage.getItem("@marvel_app/favoritos"));
    }

    for (var i = 0; i < favoritos.length; i++) {
      html = html + `<li>${favoritos[i].title}</li>`;
    }
    html = html + `</ul></body></html>`;

    return html;
  }

  async function Send() {
    const obj = {
      email: text,
      body: await getComics(),
    };
    console.log(
      `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/sendMail`
    );
    setOpen(false);
    try {
      const resposta = await axios.post(
        `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/sendMail`,
        obj
      );
      if (resposta.status === 200) {
        console.log("Result::");
      } else {
        alert("Erro ao enviar e-mail");
      }
    } catch (error) {
      console.log("Erro: ", error);
      alert("Erro ao enviar e-mail");
    }
  }

  return (
    <div className={style.container}>
      <div className={style.container2}>
        <Typography
          className={style.sub_title}
          variant="h4"
          gutterBottom
          component="div"
        >
          Meus favoritos
        </Typography>
        <div className={style.subContent}>
          <Button
            className={style.botao}
            startIcon={<EmailIcon />}
            onClick={handleOpen}
          >
            Enviar favoritos por e-mail
          </Button>
        </div>
      </div>
      {modal()}
    </div>
  );

  function modal() {
    return (
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <div className={style.modal}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Informe seu e-mail
          </Typography>
          <Paper
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="E-mail"
              value={text}
              onChange={handleChange}
              inputProps={{ "aria-label": "" }}
            />
            <IconButton
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={() => {
                Send();
              }}
            >
              <SendIcon />
            </IconButton>
          </Paper>
        </div>
      </Modal>
    );
  }
}
