import { useAppSelector } from '../hooks/useAppSelector';
import { ProductDocInterface } from '../types';
import { userDetailsActionCreators } from '../state';
import { useDispatch } from 'react-redux';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material';

interface ProductBigCardProps {
  product: ProductDocInterface;
}

const ProductBigCard: React.FC<ProductBigCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const { userId, role } = useAppSelector((state) => state.userDetails);
  return (
    <Card sx={{ width: 320, height: '100%' }}>
      <CardHeader title={product.title} subheader={`Category: ${product.category}`} />
      <CardMedia component='img' height='200' image={product.image} alt={product.title} />
      <CardContent>
        <Typography gutterBottom variant='body1' component='div'>
          Description : {product.description}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Price: ${product.price}
        </Typography>
      </CardContent>

      {userId && role === 'customer' && (
        <CardActions>
          <Button
            variant='contained'
            onClick={() => dispatch(userDetailsActionCreators.addToCart(product.docId, userId))}
          >
            Add to Cart
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default ProductBigCard;

// export default function MediaCard() {
//   return (
//     <Card sx={{ maxWidth: 345 }}>
//       <CardMedia
//         component="img"
//         height="140"
//         image="/static/images/cards/contemplative-reptile.jpg"
//         alt="green iguana"
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           Lizard
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Lizards are a widespread group of squamate reptiles, with over 6,000
//           species, ranging across all continents except Antarctica
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small">Share</Button>
//         <Button size="small">Learn More</Button>
//       </CardActions>
//     </Card>
//   );
// }
