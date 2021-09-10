import { useAppSelector } from '../hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { logout } from '../state/auth/authActionCreators';
import { Link } from 'react-router-dom';
import { User } from '@firebase/auth';

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const { currentUser }: { currentUser: User } = useAppSelector((state) => state.auth);
  return (
    <div>
      {currentUser ? (
        <div>
          <p>{currentUser.displayName}</p>
          <button onClick={() => dispatch(logout())}>Log Out</button>
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
