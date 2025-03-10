import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#f77420" },
    secondary:{main:"#f28c4b"},
    background: { default: "#FFF", paper: "#F5F5DC" },
    text: { primary: "#333", secondary: "#b5b0b0" },
    common:{white:"#fff"}
  },
  typography :{
    fontFamily: "montserrat",
    fontSize: 4,
    h6: { fontSize: 24, fontWeight: "bold",color:"#333" },
    h5: { fontSize: 28, fontWeight: "bold" , color:"#333"},
    body2: { fontSize: 16, fontWeight: "bold" , color:"#333"}
  }
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary:{main:"#9004c7"}, 
    secondary: { main: "#b036e0" },
    background: { default: "#1C1C1C", paper: "#383838" },
    text: { primary: "#ffffff", secondary: "#aaaaaa" },
    common:{white:"#fff"}
  },
  typography :{
    fontFamily: "montserrat",
    fontSize: 4,
    h6: { fontSize: 24, fontWeight: "bold",color:"#ffffff" },
    h5: { fontSize: 28, fontWeight: "bold",color:"#ffffff" },
    body2: { fontSize: 16, fontWeight: "bold" , color:"#ffffff"}
  }
});
