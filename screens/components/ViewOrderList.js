import {Body, CardItem, Text, Card, View, List, ListItem} from 'native-base';
import React, {useEffect} from 'react';
import {useStateValue} from '../../central_state_mgt/StateProvider';
import {Badge} from 'react-native-paper';
import {NumberFormat} from 'react-number-format';
import {acc} from 'react-native-reanimated';

const ViewOrderList = () => {
  const [{orderSet}, setOrders] = useStateValue();

  useEffect(() => {}, [orderSet]);

  const formatDate = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  return (
    <List>
      {orderSet &&
        orderSet.map((order) => {
          console.log(order.orderDate);
          return (
            <ListItem key={order._id}>
              <Card>
                <CardItem header>
                  <Badge info>
                    <Text>{order._id}</Text>
                  </Badge>
                </CardItem>
                <CardItem>
                  <Body>
                    <Text>Customer : {order.customer.customerName}</Text>
                    <Text>Date : {formatDate(order.orderDate)}</Text>
                  </Body>
                </CardItem>
                <CardItem footer>
                  <NumberFormat
                    value={order.items.reducer(
                      accu,
                      (obj) => {
                        return acc + obj.itemPrice;
                      },
                      0,
                    )}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rs.'}
                    renderText={(value) => <H3>{value}</H3>}
                  />
                </CardItem>
              </Card>
            </ListItem>
          );
        })}
    </List>
  );
};

export default ViewOrderList;
