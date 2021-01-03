import React from 'react';
import {List, ListItem, Text} from 'native-base';

function OrderList() {
  return (
    <List>
      <ListItem>
        <Left>
          <Text>Simon Mignolet</Text>
        </Left>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    </List>
  );
}

export default OrderList;
