import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks/useAppSelector';
import { ordersActionCreators } from '../state';
import { CartItemInterface } from '../types';

const OrdersPage: React.FC = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useAppSelector((state) => state.orders);
  useEffect(() => {
    dispatch(ordersActionCreators.ordersGetAll());
  }, [dispatch]);
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  const total = (cart: CartItemInterface[]) =>
    cart.reduce((acc, cur) => (acc += cur.amount * cur.price), 0);
  return (
    <div>
      <Typography variant='h3'>Orders Page</Typography>
      {loading && <Typography variant='h4'>Loading ....</Typography>}
      {!loading && orders.length === 0 && <Typography variant='h4'>No Orders</Typography>}
      {!loading && orders.length && (
        <div>
          {orders.map((order) => (
            <Accordion
              key={order.docId}
              expanded={expanded === order.docId}
              onChange={handleChange(order.docId)}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                  <Typography>{order.displayName}</Typography>
                  <Typography>{order.email}</Typography>
                </Box>
                <Typography sx={{ marginLeft: 'auto', pr: 4 }}>${total(order.cart)}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {order.cart.map((item) => (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }} key={item.docId}>
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                      <Typography>{item.title}</Typography>
                      <Typography>* {item.amount}</Typography>
                    </Box>
                    <Typography>{item.amount * item.price}</Typography>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
