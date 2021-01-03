import React from 'react';
import {List, ListItem, Text, Left, Right, Button} from 'native-base';
import {useStateValue} from '../../central_state_mgt/StateProvider';

const OrderList = () => {
  const [{basket}, setBasket] = useStateValue();

  return (
    <List>
      {basket.length ? (
        basket.map((item) => {
          return (
            <ListItem>
              <Left>
                <Text>{item.item}</Text>
                <Text>{item.item}</Text>
              </Left>
              <Right>
                <Button small danger>
                  <Text>--</Text>
                </Button>
              </Right>
            </ListItem>
          );
        })
      ) : (
        <Text>Add Items</Text>
      )}
    </List>
  );
};

export default OrderList;
