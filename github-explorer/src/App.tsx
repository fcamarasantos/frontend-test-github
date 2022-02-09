import { Header } from "./components/Header";
import { Search } from "./components/Search";
import { GlobalStyle } from "./styles/global";
import {BrowserRouter as Router} from 'react-router-dom';

import {MainRoutes} from './routes';

export function App() {
  return (
    <Router>
      <Header />
      <Search />
      <MainRoutes />
      <GlobalStyle />
    </Router>
  );
}