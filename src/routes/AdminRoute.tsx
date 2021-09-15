import { Route, Redirect } from 'react-router-dom';
import { RouteNames } from '.';
import { useAppSelector } from '../hooks/useAppSelector';

interface AdminRouteProps {
  component: React.ElementType;
  path: string;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ component: Component, ...rest }) => {
  const { role, loading } = useAppSelector((state) => state.userDetails);
  if (loading) {
    return <h1>Loading</h1>;
  }
  return (
    <Route
      {...rest}
      render={(props) => {
        return role === 'admin' ? <Component {...props} /> : <Redirect to={RouteNames.HOME} />;
      }}
    />
  );
};
