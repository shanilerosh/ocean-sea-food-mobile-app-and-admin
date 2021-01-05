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
} from 'native-base';
import React, {useEffect} from 'react';
import NumberFormat from 'react-number-format';
import {Icon} from 'react-native-vector-icons/Feather';
import {calculateBasketTotal} from '../../central_state_mgt/Reducer';
import {useStateValue} from '../../central_state_mgt/StateProvider';
import CustomisableAlert, {
  closeAlert,
  showAlert,
} from 'react-native-customisable-alert';
import axios from 'axios';

const OrderSummary = () => {
  const [{basket}, setBasket] = useStateValue();
  const [{selectedCustomer}, setSelectedCustomer] = useStateValue();
  const [{requiredDate}, setRequiredDate] = useStateValue();
  const [state, dispatch] = useStateValue();
  useEffect(() => {}, [basket]);

  const proceedOrder = () => {
    if (!selectedCustomer) {
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
        .post('http://10.0.2.2:1234/api/v1/customer/findAllCustomers')
        .then((data) => {

        })
        .catch((err) => {
          
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
        setSelectedCustomer('');
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

          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={{flex: 2}}>Total Amount:</Text>
            <NumberFormat
              value={calculateBasketTotal(basket)}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'Rs.'}
              renderText={(value) => <Text>{value}</Text>}
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
