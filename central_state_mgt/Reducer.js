export const initialState = {
  basket: [],
};

//   export const calculateBasketTotal = (basket) => {
//     return basket?.reduce((amount, item) => item.price + amount, 0);
//   };

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
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
