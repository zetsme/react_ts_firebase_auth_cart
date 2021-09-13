import { useAppSelector } from '../hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { authActionCreators, userInfoActionCreators } from '../state';
import { memo } from 'react';
const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { userId, role } = useAppSelector((state) => state.userInfo);

  return (
    <div>
      {currentUser ? (
        <div>
          <p>{currentUser.displayName}</p>
          <button
            onClick={() => {
              dispatch(authActionCreators.logout());
              dispatch(userInfoActionCreators.clearUserInfo());
            }}
          >
            Log Out
          </button>
          {userId && role === 'admin' && (
            <div>
              <Link to='/products'>Products</Link>
              <Link to='/orders'>Orders</Link>
            </div>
          )}
          {userId && role === 'customer' && <button>Cart</button>}
        </div>
      ) : (
        <div>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </div>
      )}
    </div>
  );
};

export default memo(NavBar);
