import {
  Body,
  Card,
  Text,
  CardItem,
  View,
  Left,
  Right,
  Badge,
  Button,
  H3,
} from 'native-base';
import React, {useEffect} from 'react';
import NumberFormat from 'react-number-format';
import {calculateBasketTotal} from '../../central_state_mgt/Reducer';
import {useStateValue} from '../../central_state_mgt/StateProvider';
import io from 'socket.io-client';
import CustomisableAlert, {
  closeAlert,
  showAlert,
} from 'react-native-customisable-alert';
import axios from 'axios';

//Connecting Socket
const socket = io('https://ocean-sea-food-api.herokuapp.com/', {
  transports: ['websocket', 'polling'],
});

const OrderSummary = () => {
  const [{basket}, setBasket] = useStateValue();
  const [{selectedCustomer}, setSelectedCustomer] = useStateValue();
  const [{requiredDate}, setRequiredDate] = useStateValue();
  const [state, dispatch] = useStateValue();
  const [{user}] = useStateValue();
  useEffect(() => {}, [basket]);

  const proceedOrder = () => {
    if (!selectedCustomer.customerName) {
      console.log(selectedCustomer);
      showAlert({
        title: 'No Customer Selected',
        message: 'Please Select a Customer',
        alertType: 'error',
      });
    } else if (!requiredDate) {
      showAlert({
        title: 'Please Select a Required Date',
        message: 'Please Select a Customer',
        alertType: 'error',
      });
    } else if (!basket.length) {
      showAlert({
        title: 'No Items Selected',
        message: 'Please Select Items to Proceed',
        alertType: 'error',
      });
    } else {
      //Porceed
      axios
        .post(
          'https://ocean-sea-food-api.herokuapp.com/api/v1/order/placeorder',
          {
            requiredDate,
            items: basket,
            total: calculateBasketTotal(basket),
            customer: selectedCustomer,
            user: {
              userId: user._id,
              userName: user.username,
            },
          },
        )
        .then(({data}) => {
          console.log(data);
          if (data.isDone) {
            console.log('show');
            showAlert({
              title: 'Order Successfully placed',
              message: 'View your orders for further information',
              alertType: 'success',
            });
            socket.emit('placeOrder', data?.data);
            dispatch({
              type: 'EMPTY_BASKET',
            });
          } else {
            showAlert({
              title: 'Error',
              message: 'Something went wrong please try again',
              alertType: 'error',
            });
          }
        })
        .catch((err) => {
          console.log(err);
          showAlert({
            title: 'Error',
            message: 'Something went wrong please try again',
            alertType: 'error',
          });
        });
    }
  };

  const cancelOrder = () => {
    showAlert({
      message: 'All your files will be deleted!',
      alertType: 'warning',
      onPress: () => {
        dispatch({
          type: 'EMPTY_BASKET',
        });
        closeAlert();
      },
    });
  };

  return (
    <Card>
      <CardItem bordered>
        <Body>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={{flex: 2}}>Items in Basket:</Text>
            <Badge warning style={{width: 30}}>
              <Text>{basket.length}</Text>
            </Badge>
          </View>

          <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
            <Text style={{flex: 2}}>Total Amount:</Text>
            <NumberFormat
              value={calculateBasketTotal(basket)}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'Rs.'}
              renderText={(value) => <H3>{value}</H3>}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 30,
            }}>
            <Button block success onPress={proceedOrder} stlye={{flex: 1}}>
              <Text>Place Order</Text>
            </Button>
            <Button danger onPress={cancelOrder} stlye={{flex: 2}}>
              <Text>Cancel</Text>
            </Button>
          </View>
        </Body>
      </CardItem>
      <CardItem style={{flex: 1}}></CardItem>
      {/* //Error */}
      <CustomisableAlert
        titleStyle={{
          fontSize: 18,
          fontWeight: 'bold',
        }}
      />
    </Card>
  );
};

export default OrderSummary;
