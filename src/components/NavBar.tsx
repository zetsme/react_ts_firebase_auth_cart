import { useAppSelector } from '../hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../state';
const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const { currentUser, error, loading } = useAppSelector((state) => state.auth);
  const { userId } = useAppSelector((state) => state.userInfo);

  if (loading) {
    return <h1>Loading</h1>;
  }
  if (error) {
    <h1>{error}</h1>;
  }
  return (
    <div>
      {currentUser ? (
        <div>
          <p>{currentUser.displayName}</p>
          <button onClick={() => dispatch(actionCreators.logout())}>Log Out</button>
          {userId ? <button>Cart</button> : null}
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

export default NavBar;
