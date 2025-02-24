// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#300d38", // Fetch primary color
      contrastText: "#fff", // Text color for primary buttons and text
    },
    secondary: {
      main: "rgb(48, 13, 56)", // Fetch deep purple (used for buttons and text)
      contrastText: "#fff", // Text color for secondary elements
    },
    // Additional palette colors (like vibrant purple and background color)
    info: {
      main: "rgb(125, 31, 112)", // Fetch vibrant purple (used for headers)
    },
    background: {
      default: "rgb(249, 247, 242)", // Fetch off-white background color
    },
  },
});

export default theme;
