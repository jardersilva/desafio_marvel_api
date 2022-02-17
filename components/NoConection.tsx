import CloudOffIcon from "@mui/icons-material/CloudOff";
import Typography from "@mui/material/Typography";
import style from "./../styles/noConection.module.css";

export function NoConection() {
  return (
    <div className={style.body}>
      <div className={style.body2}>
        <CloudOffIcon className={style.icon} />
        <Typography variant="subtitle1" className={style.msg}>
          Falha na conexão com o servidor
        </Typography>
      </div>
    </div>
  );
}
