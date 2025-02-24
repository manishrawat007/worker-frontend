import { useContext } from "react";
import { Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ThemeContext } from "@/styles/ThemeProvider";

const ThemeSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return <ThemeSwitch checked={darkMode} onChange={toggleTheme} />;
}
