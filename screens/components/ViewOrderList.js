import {
  Body,
  CardItem,
  Text,
  Card,
  View,
  List,
  ListItem,
  Button,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {useStateValue} from '../../central_state_mgt/StateProvider';
import {Badge} from 'react-native-paper';
import NumberFormat from 'react-number-format';
import Modal from 'react-native-modal';

const ViewOrderList = () => {
  const [{orderSet}, setOrders] = useStateValue();
  const [itemList, setItemList] = useState([]);
  const [modal, viewModal] = useState(false);
  useEffect(() => {}, [orderSet]);

  const viewItemList = (items) => {
    console.log(items);
    setItemList(items);
    viewModal(true);
  };

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
                    <Text>Customer : {order.customer?.customerName}</Text>
                    <Text>Date : {formatDate(order.orderDate)}</Text>
                  </Body>
                </CardItem>
                <CardItem>
                  <NumberFormat
                    value={order.items.reduce((accu, obj) => {
                      return accu + obj.itemPrice * obj.itemQty;
                    }, 0)}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rs.'}
                    renderText={(value) => <Text>{value}</Text>}
                  />
                </CardItem>
                <CardItem>
                  <Button
                    onPress={() => {
                      viewItemList(order.items);
                    }}>
                    <Text>View Item List</Text>
                  </Button>
                </CardItem>
              </Card>
            </ListItem>
          );
        })}
      <Modal backdropColor="white" backdropOpacity={1} isVisible={modal}>
        <Text style={{textAlign: 'center', marginBottom: 15}}>
          List of Items
        </Text>
        <View style={{flex: 1}}>
          {itemList &&
            itemList.map((data) => {
              return (
                <View
                  key={data._id}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Text>{data.itemName}</Text>
                  <Text>{data.itemQty}</Text>
                  <NumberFormat
                    value={data.itemPrice}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rs.'}
                    renderText={(value) => <Text>{value}</Text>}
                  />
                  <NumberFormat
                    value={data.itemQty * data.itemPrice}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rs.'}
                    renderText={(value) => <Text>{value}</Text>}
                  />
                </View>
              );
            })}
          <Badge success style={{marginTop: 30}}>
            {
              <NumberFormat
                value={itemList?.reduce((accu, obj) => {
                  return accu + obj.itemPrice * obj.itemQty;
                }, 0)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'Rs.'}
                renderText={(value) => <Text>{value}</Text>}
              />
            }
          </Badge>
          <Button
            full
            danger
            style={{marginTop: 20}}
            onPress={() => viewModal(false)}>
            <Text>Close</Text>
          </Button>
        </View>
      </Modal>
    </List>
  );
};

export default ViewOrderList;
