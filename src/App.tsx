import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import { useAuthStateChanged } from './hooks/useAuthStateChanged';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OrdersPage from './pages/OrdersPage';
import ProductsPage from './pages/ProductsPage';
import RegisterPage from './pages/RegisterPage';
import { AdminRoute } from './routes/AdminRoute';
import { RouteNames } from './routes';
import { Container } from '@mui/material';

const App: React.FC = () => {
  const { loading } = useAuthStateChanged();

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <BrowserRouter>
      <NavBar />
      <Container>
        <Switch>
          <Route path={RouteNames.HOME} exact component={HomePage} />
          <Route path={RouteNames.REGISTER} component={RegisterPage} />
          <Route path={RouteNames.LOGIN} component={LoginPage} />
          <AdminRoute component={ProductsPage} path={RouteNames.ADMIN_PRODUCTS} />
          <AdminRoute path={RouteNames.ADMIN_ORDERS} component={OrdersPage} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
