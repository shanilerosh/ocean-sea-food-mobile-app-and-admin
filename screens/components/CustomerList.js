import React, {useEffect} from 'react';
import {
  Container,
  Button,
  Content,
  List,
  ListItem,
  Text,
  Root,
  Left,
  Right,
  View,
} from 'native-base';
import axios from 'axios';
import {useStateValue} from '../../central_state_mgt/StateProvider';
import {log} from 'react-native-reanimated';
import CustomisableAlert, {
  closeAlert,
  showAlert,
} from 'react-native-customisable-alert';

const CustomerList = () => {
  const [{customers}, setCustomers] = useStateValue();
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    console.log('use effect runs');
    axios
      .get('http://10.0.2.2:1234/api/v1/customer/findAllCustomers')
      .then(({data}) => {
        if (data.isDone) {
          dispatch({
            type: 'LOAD_CUSTOMERS',
            customer: data.data,
          });
        } else {
          Toast.show({
            text: 'Something Went Wrong',
            buttonText: 'Okay',
            type: 'Error',
            postion: 'top',
          });
        }
      })
      .catch((err) => {
        Toast.show({
          text: 'Something Went Wrong',
          buttonText: 'Okay',
          type: 'Error',
          postion: 'top',
        });
      });
  }, []);

  useEffect(() => {}, [customers]);

  return (
    <Root>
      <Container>
        <Content>
          <List>
            {customers &&
              customers.map((data) => {
                return (
                  <ListItem key={data._id}>
                    <Left>
                      <Text>{data.customerName}</Text>
                    </Left>
                    <Right>
                      <Button
                        success
                        rounded
                        small
                        onPress={() => {
                          showAlert({
                            title: 'Something went good!',
                            message: 'Your code works!',
                            alertType: 'custom',
                            customAlert: (
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  padding: 20,
                                  width: '85%',
                                }}>
                                <Text style={{padding: 15}}>
                                  Name : {data.customerName}
                                </Text>
                                <Text style={{padding: 15}}>
                                  Mobile : {data.customerMobile}
                                </Text>
                                <Text style={{padding: 15}}>
                                  Address : {data.customerAddress}
                                </Text>
                                <Text style={{padding: 15}}>
                                  NIC : {data.customerNIC}
                                </Text>
                                <Button onPress={() => closeAlert()}>
                                  <Text>Close</Text>
                                </Button>
                              </View>
                            ),
                          });
                        }}>
                        <Text>View</Text>
                      </Button>
                    </Right>
                  </ListItem>
                );
              })}
          </List>
        </Content>
        <CustomisableAlert
          titleStyle={{
            fontSize: 18,
            fontWeight: 'bold',
          }}
        />
      </Container>
    </Root>
  );
};

export default CustomerList;
