import { Button, CardActions } from '@mui/material';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { productsActionCreators } from '../state';
import { ProductDocInterface } from '../types';
import AlertDialog from './AlertDialog';
import ProductBigCard from './ProductBigCard';

interface AdminPageProductCardProps {
  product: ProductDocInterface;
  editProduct: (docId: string) => void;
}

const AdminPageProductCard: React.FC<AdminPageProductCardProps> = ({ product, editProduct }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = useCallback(() => setOpen(true), []);

  const handleClose = useCallback(() => setOpen(false), []);
  const handleConfirm = () => {
    handleClose();
    dispatch(productsActionCreators.deleteProduct(product.docId));
  };

  return (
    <ProductBigCard {...{ product }}>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant='contained' onClick={() => editProduct(product.docId)}>
          Update
        </Button>
        <Button variant='contained' color='secondary' onClick={handleClickOpen}>
          Delete
        </Button>
        <AlertDialog {...{ handleClose, handleConfirm, open }} />
      </CardActions>
    </ProductBigCard>
  );
};

export default AdminPageProductCard;
