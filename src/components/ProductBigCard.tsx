import { ProductDocInterface } from '../types';

import { Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';

interface ProductBigCardProps {
  product: ProductDocInterface;
}

const ProductBigCard: React.FC<ProductBigCardProps> = ({ product, children }) => {
  return (
    <Card
      elevation={8}
      sx={{ width: 290, height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <CardHeader title={product.title} subheader={`Category: ${product.category}`} />
      <CardMedia component='img' height='200' image={product.image} alt={product.title} />
      <CardContent sx={{ flex: 1 }}>
        <Typography gutterBottom variant='h6' component='div'>
          Description : {product.description}
        </Typography>
        <Typography variant='h5' color='text.secondary'>
          Price: ${product.price}
        </Typography>
      </CardContent>
      {children}
    </Card>
  );
};

export default ProductBigCard;
