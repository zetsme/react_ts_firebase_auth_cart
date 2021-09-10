import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ProductSmallCard from '../components/ProductSmallCard';
import { useAppSelector } from '../hooks/useAppSelector';
import {
  addProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
} from '../state/products/productsActionCreators';

const initialState = {
  title: '',
  price: 0,
  category: '',
  description: '',
  image: '',
  amount: 0,
};

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [inputValues, setInputValues] = useState(initialState);
  const { title, price, category, amount, description, image } = inputValues;

  const { error, loading, products, product } = useAppSelector((state) => state.products);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (editMode && product?.docId) {
      dispatch(updateProduct(product?.docId, inputValues));
      setEditMode(false);
    } else {
      dispatch(addProduct(inputValues));
    }
    setInputValues(initialState);
  };
  const onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) =>
    setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const editProduct = (docId: string) => {
    setEditMode(true);
    dispatch(getOneProduct(docId));
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (product) {
      setInputValues((prev) => ({ ...prev, ...product }));
    }
  }, [product]);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <div>
      <div>
        <form onSubmit={onSubmit}>
          <h3>{editMode ? 'Update Product' : 'Add New Product'}</h3>
          <input
            type='text'
            placeholder='Product Title'
            name='title'
            value={title}
            onChange={onChange}
          />
          <input
            type='text'
            placeholder='Category'
            name='category'
            value={category}
            onChange={onChange}
          />
          <textarea
            placeholder='Description'
            name='description'
            value={description}
            onChange={onChange}
          />
          <input
            type='text'
            placeholder='Image URL'
            name='image'
            value={image}
            onChange={onChange}
          />
          <label>
            Amount
            <input
              type='number'
              placeholder='Amount'
              name='amount'
              value={amount}
              onChange={onChange}
            />
          </label>
          <label>
            Price
            <input
              type='number'
              placeholder='Price'
              name='price'
              value={price}
              onChange={onChange}
            />
          </label>

          <button type='submit'>{editMode ? 'Update Product' : 'Add New Product'}</button>
        </form>
      </div>
      <div>
        {products.map((product) => (
          <ProductSmallCard key={product.docId} {...{ product, editProduct }} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
