import React, {useEffect} from 'react';
import {List, ListItem, Text, Left, Right, Button, View} from 'native-base';
import {useStateValue} from '../../central_state_mgt/StateProvider';
import NumberFormat from 'react-number-format';
import {Badge} from 'react-native-paper';

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
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text>{item.itemName}</Text>
                  <Text>{item.itemQty}kg</Text>
                  <NumberFormat
                    value={item.itemPrice}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rs.'}
                    renderText={(value) => <Text>{value}</Text>}
                  />
                  <NumberFormat
                    value={item.itemPrice * item.itemQty}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rs.'}
                    renderText={(value) => <Text>{value}</Text>}
                  />
                </View>
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
