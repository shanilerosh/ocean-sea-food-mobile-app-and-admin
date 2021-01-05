import React, {useEffect} from 'react';
import {List, ListItem, Text, Left, Right, Button} from 'native-base';
import {useStateValue} from '../../central_state_mgt/StateProvider';

const OrderList = () => {
  const [{basket}, setBasket] = useStateValue();
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    console.log('use effect basket', basket);
  }, [basket]);

  const removeItem = (id) => {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      itemId: id,
    });
  };

  return (
    <List>
      {basket.length ? (
        basket.map((item) => {
          return (
            <ListItem key={item.itemId}>
              <Left>
                <Text>{item.itemName}</Text>
                <Text>{item.itemQty}</Text>
              </Left>
              <Right>
                <Button
                  small
                  danger
                  onPress={() => {
                    removeItem(item.itemId);
                  }}>
                  <Text>--</Text>
                </Button>
              </Right>
            </ListItem>
          );
        })
      ) : (
        <Text style={{textAlign: 'center'}}>Add Items</Text>
      )}
    </List>
  );
};

export default OrderList;
