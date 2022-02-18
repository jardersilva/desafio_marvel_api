import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import style from "./../styles/searchBar";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { ChangeEvent } from "react";

interface Propriedades {
  isLoading: boolean;
  text: string;
  changeText(e: ChangeEvent<HTMLInputElement>): void;
  onSearch(e: ChangeEvent<HTMLInputElement>): void;
}

export function SearchBar(props: Propriedades) {
  return (
    <div style={style.container}>
      <div style={style.container2}>
        <Typography
          style={style.sub_title as React.CSSProperties}
          variant="subtitle1"
          gutterBottom
          component="div"
        >
          Explore todos os trabalhos de histórias em quadrinhos da Marvel, faça
          uma busca e navegue pelo titulo desejado, divirta-se
        </Typography>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Pesquisa"
            value={props.text}
            onChange={props.changeText}
            inputProps={{ "aria-label": "" }}
          />
          <IconButton sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
    </div>
  );
}
