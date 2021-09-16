import { useAppSelector } from '../hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { authActionCreators, userDetailsActionCreators } from '../state';
import { RouteNames } from '../routes';
import { Typography, Toolbar, Button, styled, AppBar as MuiAppBar } from '@mui/material';
import NavigationDropdownMenu from '../UIcomponents/NavigationDropdownMenu';

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  // position: 'relative',
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: '#9cabfd',
  overflow: 'hidden',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  '.logo': {
    flex: 1,
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    textDecoration: 'none',
    color: 'inherit',
  },
  '.flexGroup': {
    display: 'flex',
    gap: theme.spacing(2),
    alignItems: 'center',
  },
}));

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { userId, role } = useAppSelector((state) => state.userDetails);

  return (
    <>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography className='logo' component={RouterLink} to={RouteNames.HOME} variant='h5'>
            Products
          </Typography>
          {currentUser ? (
            <div className='flexGroup'>
              <Typography variant='h5'>{currentUser.displayName}</Typography>
              <Button
                variant='contained'
                onClick={() => {
                  dispatch(authActionCreators.logout());
                  dispatch(userDetailsActionCreators.clearUserInfo());
                }}
              >
                Log Out
              </Button>
              {userId && role === 'admin' && (
                <NavigationDropdownMenu
                  menuTitle='Options'
                  options={[
                    {
                      to: RouteNames.ADMIN_PRODUCTS,
                      title: 'Products',
                    },
                    {
                      to: RouteNames.ADMIN_ORDERS,
                      title: 'Orders',
                    },
                    {
                      to: RouteNames.HOME,
                      title: 'Home',
                    },
                  ]}
                />
              )}
            </div>
          ) : (
            <div className='flexGroup'>
              <Button variant='contained' component={RouterLink} to={RouteNames.LOGIN}>
                Login
              </Button>
              <Button variant='outlined' component={RouterLink} to={RouteNames.REGISTER}>
                Register
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default NavBar;
