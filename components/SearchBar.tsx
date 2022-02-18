import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import style from "./../styles/searchBar.module.css";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";

interface Propriedades {
  isLoading: boolean;
  text: string;
  changeText(event: React.FormEvent<HTMLInputElement>): void;
  onSearch: Function;
}

export function SearchBar(props: Propriedades) {
  return (
    <div className={style.container}>
      <div className={style.container2}>
        <Typography
          className={style.sub_title}
          variant="subtitle1"
          gutterBottom
          component="div"
        >
          Explore todos os trabalhos de histórias em quadrinhos da Marvel, faça
          uma busca e navegue pelo titulo desejado, divirta-se
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
            placeholder="Pesquisa"
            value={props.text}
            onChange={props.changeText}
            inputProps={{ "aria-label": "" }}
          />
          <IconButton
            onClick={props.onSearch}
            sx={{ p: "10px" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
    </div>
  );
}
