import { createTheme, ThemeProvider, CssBaseline } from '@material-ui/core';

const theme = createTheme({
  typography: {
    fontFamily: 'Glory, sans-serif',
  },
});

export const MaterialUITheme: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
