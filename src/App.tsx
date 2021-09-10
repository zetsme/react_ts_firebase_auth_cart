import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import { useAuthStateChanged } from './hooks/useAuthStateChanged';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import RegisterPage from './pages/RegisterPage';

const App: React.FC = () => {
  const { loading } = useAuthStateChanged();
  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/products' component={ProductsPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
