import { v4 as uuidv4 } from 'uuid';

export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (order,address,time,date) => ({
  type: ADD_ORDER,
  payload: { ...order, orderId: uuidv4(),address:address,time:time,date:date },
});