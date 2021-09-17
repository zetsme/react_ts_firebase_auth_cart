import { Button, Grid } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AddEditModal from '../components/AddEditModal';
import AdminPageProductCard from '../components/AdminPageProductCard';

import { useAppSelector } from '../hooks/useAppSelector';
import { productsActionCreators } from '../state';

const initialState = {
  title: '',
  price: 0,
  category: '',
  description: '',
  image: '',
};

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [inputValues, setInputValues] = useState(initialState);

  const { error, loading, products, product } = useAppSelector((state) => state.products);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (editMode && product) {
      dispatch(productsActionCreators.updateProduct(product.docId, inputValues));
      setEditMode(false);
    } else {
      dispatch(productsActionCreators.addProduct(inputValues));
    }
    handleClose();
  };
  const onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) =>
    setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const editProduct = (docId: string) => {
    setEditMode(true);
    dispatch(productsActionCreators.getOneProduct(docId));
    handleOpen();
  };

  useEffect(() => {
    dispatch(productsActionCreators.getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (product) {
      setInputValues((prev) => ({ ...prev, ...product }));
    }
  }, [product]);
  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => {
    setOpen(false);
    setEditMode(false);
    setInputValues(initialState);
    dispatch(productsActionCreators.clearProduct());
  }, [dispatch]);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <>
      <AddEditModal {...{ editMode, handleClose, inputValues, onChange, onSubmit, open }} />
      <Button variant='contained' sx={{ margin: '20px 0' }} onClick={handleOpen}>
        Add New Product
      </Button>
      <Grid pb={4} pt={2} container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.docId} xs='auto'>
            <AdminPageProductCard {...{ product, editProduct }} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProductsPage;
