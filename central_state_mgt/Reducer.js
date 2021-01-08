export const initialState = {
  basket: [],
  customers: [],
  items: [],
  orders: [],
  selectedCustomer: {},
  requiredDate: '',
  orderSet: [],
};

export const calculateBasketTotal = (basket) => {
  return basket.reduce((acc, cr) => {
    return acc + cr.itemPrice * cr.itemQty;
  }, 0);
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_RQ_DATE':
      return {...state, requiredDate: action.requiredDate};
    case 'LOAD_CUSTOMERS':
      return {...state, customers: action.customer};
    case 'ADD_CUSTOMER':
      return {...state, customers: [...state.customers, action.customer]};
    case 'ADD_CUSTOMER_TO_ORDER':
      return {...state, selectedCustomer: action.selectedCustomer};
    case 'SIGN_IN_USER':
      return {...state, loggedInUser: action.loggedInUser};
    case 'LOAD_ITEMS':
      return {...state, items: action.item};
    case 'LOAD_ORDERS':
      return {...state, orderSet: action.order};
    case 'EMPTY_BASKET':
      return {...state, basket: []};
    case 'ADD_TO_BASKET':
      //Checking for Duplicat
      let flag = false;
      if (state.basket.length) {
        const list = state.basket;
        list.map((item, index) => {
          if (item.itemId == action.item.itemId) {
            list.splice(index, 1, {
              itemId: item.itemId,
              itemName: item.itemName,
              itemPrice: item.itemPrice,
              itemQty:
                parseFloat(item.itemQty) + parseFloat(action.item.itemQty),
            });
            flag = true;
          }
        });

        if (flag) {
          return {...state, basket: list};
        } else {
          list.push(action.item);
          return {...state, basket: list};
        }
      } else {
        return {...state, basket: [...state.basket, action.item]};
      }
    case 'REMOVE_FROM_BASKET':
      const index = state.basket.findIndex((basket) => {
        return basket.itemId === action.itemId;
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
