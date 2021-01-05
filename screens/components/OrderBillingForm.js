import React, {useState, useEffect} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Container,
  Content,
  View,
  Text,
  Form,
  Item,
  Input,
  Button,
  Right,
  Left,
  ListItem,
  List,
} from 'native-base';
import Modal from 'react-native-modal';
import CustomerList from './CustomerList';
import {useStateValue} from '../../central_state_mgt/StateProvider';
import axios from 'axios';

const OrderBillingForm = () => {
  const [custModal, setCustModal] = useState(false);
  const [itemModal, setItemModal] = useState(false);
  const [mode, setMode] = useState('date');
  const [date, setDate] = useState(new Date());
  const [customerName, setCustomerName] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [customer, setCustomer] = useState('');
  const [show, setShow] = useState(false);
  const [qty, setQty] = useState('');
  const [txtDate, setTxtDate] = useState('');
  const [{customers}, setCustomers] = useStateValue();
  const [{items}, setItems] = useStateValue();
  const [renderList, setRenderList] = useState([]);
  const [renderListItem, setrenderListItem] = useState([]);
  const [state, dispatch] = useStateValue();
  //Load all customers
  useEffect(() => {
    axios
      .get('http://10.0.2.2:1234/api/v1/customer/findAllCustomers')
      .then(({data}) => {
        if (data.isDone) {
          dispatch({
            type: 'LOAD_CUSTOMERS',
            customer: data.data,
          });
          console.log('here', customers);
          setRenderList(customers);
        } else {
        }
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    axios
      .get('http://10.0.2.2:1234/api/v1/item/getAllItems')
      .then(({data}) => {
        if (data.isDone) {
          dispatch({
            type: 'LOAD_ITEMS',
            item: data.data,
          });
          setRenderList(items);
        } else {
        }
      })
      .catch((err) => {});
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setTxtDate(formatDate(currentDate.toString()));
    dispatch({
      type: 'SET_RQ_DATE',
      requiredDate: currentDate,
    });
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

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const searchWithInputCust = ({nativeEvent}) => {
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

  const searchWithInputItem = ({nativeEvent}) => {
    const userInput = nativeEvent.text;
    let list = [];
    if (userInput !== '') {
      items.map((item) => {
        if (
          item.itemName
            .toString()
            .toLowerCase()
            .startsWith(userInput.toLowerCase())
        ) {
          list.push(item);
        }
      });
    } else {
      list = items;
    }

    setrenderListItem(list);
  };

  return (
    <Container>
      <Content>
        <Form>
          <Item>
            <Input
              placeholder="Select Customer"
              onChange={() => {
                setCustModal(true);
              }}
              value={customerName}
            />
          </Item>
          {/* Date */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <Item style={{flex: 2}}>
              <Input placeholder="Required Date" disabled value={txtDate} />
            </Item>
            <Item last style={{flex: 1}}>
              <Button
                small
                style={{marginTop: 4}}
                onPress={() => {
                  setShow(true);
                }}>
                <Text>Set Date</Text>
              </Button>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  minimumDate={new Date()}
                  onChange={onChange}
                />
              )}
            </Item>
          </View>

          {/* Adding Items */}
          <Item>
            <Button
              onPress={() => {
                setItemModal(true);
              }}>
              <Text>Add Items</Text>
            </Button>
          </Item>
        </Form>
        {/* Modal1 */}
        <Modal isVisible={custModal}>
          <View style={{flex: 1}}>
            <Input
              placeholder="Please Select Item"
              style={{height: 60}}
              onChange={(e) => {
                searchWithInputCust(e);
              }}
            />
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
                          onPress={() => {
                            dispatch({
                              type: 'ADD_CUSTOMER_TO_ORDER',
                              selectedCustomer: data._id,
                            });
                            setCustomerName(data.customerName);
                            setCustModal(false);
                          }}>
                          <Text>Select Customer</Text>
                        </Button>
                      </Right>
                    </ListItem>
                  );
                })}
            </List>
          </View>
        </Modal>

        {/* Item Modal */}
        <Modal backdropColor="white" isVisible={itemModal}>
          <View style={{flex: 1}}>
            <Input
              placeholder="Please Add Item to Bucket"
              style={{height: 60}}
              onChange={(e) => {
                searchWithInputItem(e);
              }}
            />
            <List>
              {items &&
                renderListItem.map((data) => {
                  return (
                    <ListItem key={data._id}>
                      <Left>
                        <Text>{data.itemName}</Text>
                        <Input
                          placeholder="Enter Qty"
                          onChange={(e) => {
                            setQty(e.nativeEvent.text);
                          }}
                        />
                      </Left>
                      <Right>
                        <Button
                          success
                          onPress={() => {
                            console.log('Pressed', data._id);
                            // Add to Bucket
                            dispatch({
                              type: 'ADD_TO_BASKET',
                              item: {
                                itemId: data._id,
                                itemName: data.itemName,
                                itemPrice: data.itemPrice,
                                itemQty: qty,
                              },
                            });
                            setItemModal(false);
                            setQty('');
                          }}>
                          <Text>Add</Text>
                        </Button>
                      </Right>
                    </ListItem>
                  );
                })}
            </List>
          </View>
        </Modal>
      </Content>
    </Container>
  );
};

export default OrderBillingForm;
