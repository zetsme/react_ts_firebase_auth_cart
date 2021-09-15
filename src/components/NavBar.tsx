import { useAppSelector } from '../hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { authActionCreators, userDetailsActionCreators } from '../state';
import { RouteNames } from '../routes';
import { makeStyles, AppBar, Typography, Toolbar, Link } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  root: {
    backgroundColor: '#9cabfd',
  },
  logo: {
    flex: 1,
  },
  flexGroup: {
    display: 'flex',
    gap: theme.spacing(2),
  },
}));
const NavBar: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { userId, role } = useAppSelector((state) => state.userDetails);

  return (
    <>
      <AppBar position='fixed' className={classes.root}>
        <Toolbar>
          <Typography variant='h5' className={classes.logo}>
            Products
          </Typography>
          {currentUser ? (
            <div className={classes.flexGroup}>
              <Typography variant='h5'>{currentUser.displayName}</Typography>
              <button
                onClick={() => {
                  dispatch(authActionCreators.logout());
                  dispatch(userDetailsActionCreators.clearUserInfo());
                }}
              >
                Log Out
              </button>
              {userId && role === 'admin' && (
                <div className={classes.flexGroup}>
                  <Link component={RouterLink} to={RouteNames.ADMIN_PRODUCTS}>
                    Products
                  </Link>
                  <Link component={RouterLink} to={RouteNames.ADMIN_ORDERS}>
                    Orders
                  </Link>
                  <Link component={RouterLink} to={RouteNames.HOME}>
                    Home
                  </Link>
                </div>
              )}
              {userId && role === 'customer' && <button>Cart</button>}
            </div>
          ) : (
            <div className={classes.flexGroup}>
              <Link component={RouterLink} to={RouteNames.LOGIN}>
                Login
              </Link>
              <Link component={RouterLink} to={RouteNames.REGISTER}>
                Register
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </>
  );
};

export default NavBar;
