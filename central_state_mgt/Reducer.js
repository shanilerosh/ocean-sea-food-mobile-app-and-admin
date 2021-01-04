export const initialState = {
  basket: [],
  customers: [],
  items: [],
};

//   export const calculateBasketTotal = (basket) => {
//     return basket?.reduce((amount, item) => item.price + amount, 0);
//   };

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CUSTOMERS':
      return {...state, customers: action.customer};
    case 'ADD_CUSTOMER':
      return {...state, customers: [...state.customers, action.customer]};
    case 'LOAD_ITEMS':
      return {...state, items: [...state.items, action.item]};
    case 'ADD_TO_BASKET':
      return {...state, basket: [...state.basket, action.item]};
    case 'REMOVE_FROM_BASKET':
      const index = state.basket.findIndex((basket) => {
        return basket.id === action.id;
      });
      let nwBskt = [...state.basket];
      if (index >= 0) {
        nwBskt.splice(index, 1);
      } else {
        console.warn(`Can't remove the produce`);
      }
      return {...state, basket: nwBskt};
    default:
      return state;
  }
};

export default reducer;
