import { Grid, GridProps, styled } from '@mui/material';
import { useAppSelector } from '../hooks/useAppSelector';
import HomePageProductCard from './HomePageProductCard';

interface GridContainerProps extends GridProps {
  open?: boolean;
  drawerwidth: number;
}

const GridCardContainer = styled(Grid, {
  shouldForwardProp: (prop) => prop !== 'open',
})<GridContainerProps>(({ theme, open, drawerwidth }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerwidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerwidth,
  }),
}));

const HomePageGridCardContainer: React.FC<GridContainerProps> = ({ drawerwidth, open }) => {
  const { products } = useAppSelector((state) => state.products);
  return (
    <GridCardContainer container spacing={4} {...{ open, drawerwidth }}>
      {products.map((product) => (
        <Grid item xs='auto' key={product.docId}>
          <HomePageProductCard {...{ product }} />
        </Grid>
      ))}
    </GridCardContainer>
  );
};

export default HomePageGridCardContainer;
