import React, {useEffect, useState} from 'react';
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
  Input,
  Item,
} from 'native-base';
import axios from 'axios';
import {useStateValue} from '../../central_state_mgt/StateProvider';
import {log} from 'react-native-reanimated';
import CustomisableAlert, {
  closeAlert,
  showAlert,
} from 'react-native-customisable-alert';

const CustomerList = (props) => {
  const orderProcessing = props.orderProcessing;
  const [{customers}, setCustomers] = useStateValue();
  const [renderList, setRenderList] = useState([]);
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    console.log(state);
    console.log('use effect runs');
    axios
      .get(
        'https://ocean-sea-food-api.herokuapp.com/api/v1/customer/findAllCustomers',
      )
      .then(({data}) => {
        if (data.isDone) {
          dispatch({
            type: 'LOAD_CUSTOMERS',
            customer: data.data,
          });
          setRenderList(customers);
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

  useEffect(() => {
    setRenderList(customers);
  }, [customers]);

  const searchWithInput = ({nativeEvent}) => {
    const userInput = nativeEvent.text;
    let list = [];
    if (userInput !== '') {
      customers.map((customer) => {
        if (
          customer.customerName
            .toString()
            .toLowerCase()
            .startsWith(userInput.toLowerCase())
        ) {
          console.log('here');
          list.push(customer);
          console.log('here 2');
        }
      });
    } else {
      list = customers;
    }

    setRenderList(list);
  };

  return (
    <Root>
      <Container>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 10,
            color: '#95a5a6',
            marginTop: 10,
          }}>
          Search Customer
        </Text>
        <Content>
          <Item>
            <Input placeholder="Type to search" onChange={searchWithInput} />
          </Item>
          <List>
            {customers &&
              renderList.map((data) => {
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
