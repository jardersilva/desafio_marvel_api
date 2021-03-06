import fundo from "./../assets/back1.png";

const style = {
  container: {
    margin: "0em",
    width: "100%",
    flex: 1,
    paddingTop: "8em",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    backgroundImage: `url('http://jardersilva.com.br/img/back1.png')`,
    paddingBottom: "3em",
  },

  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "800",
    backgroundColor: "#fff",
    border: "2px solid #000",
    boxShadow: "24",
    padding: "4em",
  },

  subContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  botao: {
    color: "white",
  },

  container2: {
    width: "80%",
  },

  sub_title: {
    textAlign: "center",
    color: "white",
  },
};

export default style;
