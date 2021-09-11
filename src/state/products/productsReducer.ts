import { ProductAction, ProductEnum } from './productsTypes';
import { ProductDocInterface } from '../../types';

export interface ProductsStateInterface {
  products: ProductDocInterface[];
  product: ProductDocInterface | null;
  loading: boolean;
  error: string;
}

const initialState: ProductsStateInterface = {
  products: [],
  product: null,
  loading: false,
  error: '',
};

export const productsReducer = (
  state = initialState,
  action: ProductAction
): ProductsStateInterface => {
  switch (action.type) {
    case ProductEnum.PRODUCT_START:
      return { ...state, loading: true, error: '' };
    case ProductEnum.PRODUCT_ERROR:
      return { ...state, loading: false, error: action.payload };
    case ProductEnum.PRODUCT_ADD:
      return { ...state, products: [...state.products, action.payload], loading: false };
    case ProductEnum.PRODUCT_GET_ALL:
      return { ...state, products: action.payload, loading: false };
    case ProductEnum.PRODUCT_DELETE:
      return {
        ...state,
        products: state.products.filter((i) => i.docId !== action.payload),
        loading: false,
      };
    case ProductEnum.PRODUCT_GET_ONE:
      return { ...state, product: action.payload, loading: false };
    case ProductEnum.PRODUCT_UPDATE: {
      const { docId, product } = action.payload;
      return {
        ...state,
        loading: false,
        product: null,
        products: state.products.map((i) => (i.docId === docId ? { ...product, docId } : i)),
      };
    }
    default:
      return state;
  }
};
