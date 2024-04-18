import {Outlet} from 'react-router-dom';
import CssBaseline from "@mui/material/CssBaseline";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";
import Header from "./components/Homepage/Header.tsx";
import Footer from "./components/Homepage/Footer.tsx";

const defaultTheme =  createTheme({
    palette: {
        mode: 'light',
    },
});

const sections = [
    { title: 'Home', url: `/` },
    { title: 'Events', url: `/events` },
    { title: 'Contact us', url: `/signin` }
];

function App() {


  return (
    <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Container maxWidth="lg">
            <Header title="CodeCare" sections={sections} />
            <Outlet></Outlet>
            <Footer
                title="Footer"
                description="Something here to give the footer a purpose!"
            />
        </Container>
    </ThemeProvider>
  )
}

export default App
