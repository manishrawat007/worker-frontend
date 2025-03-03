import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#007bff" },
    secondary:{main:"#858894"},
    background: { default: "#F5F5DC", paper: "#f5e0df" },
    text: { primary: "#333", secondary: "#555" },
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
    secondary:{main:"#68646b"}, 
    primary: { main: "#90caf9" },
    background: { default: "#1C1C1C", paper: "#383838" },
    text: { primary: "#ffffff", secondary: "#aaaaaa" },
  },
  typography :{
    fontFamily: "montserrat",
    fontSize: 4,
    h6: { fontSize: 24, fontWeight: "bold",color:"#ffffff" },
    h5: { fontSize: 28, fontWeight: "bold",color:"#ffffff" },
    body2: { fontSize: 16, fontWeight: "bold" , color:"#ffffff"}
  }
});
