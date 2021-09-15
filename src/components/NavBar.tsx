import { useAppSelector } from '../hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { authActionCreators, userDetailsActionCreators } from '../state';
import { RouteNames } from '../routes';
const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { userId, role } = useAppSelector((state) => state.userDetails);

  return (
    <div>
      {currentUser ? (
        <div>
          <p>{currentUser.displayName}</p>
          <button
            onClick={() => {
              dispatch(authActionCreators.logout());
              dispatch(userDetailsActionCreators.clearUserInfo());
            }}
          >
            Log Out
          </button>
          {userId && role === 'admin' && (
            <div>
              <Link to={RouteNames.ADMIN_PRODUCTS}>Products</Link>
              <Link to={RouteNames.ADMIN_ORDERS}>Orders</Link>
            </div>
          )}
          {userId && role === 'customer' && <button>Cart</button>}
        </div>
      ) : (
        <div>
          <Link to={RouteNames.LOGIN}>Login</Link>
          <Link to={RouteNames.REGISTER}>Register</Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
