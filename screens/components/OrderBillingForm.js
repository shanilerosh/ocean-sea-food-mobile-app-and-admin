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
  Toast,
  Root,
} from 'native-base';
import Modal from 'react-native-modal';
import {useStateValue} from '../../central_state_mgt/StateProvider';
import axios from 'axios';
import NumberFormat from 'react-number-format';

const OrderBillingForm = () => {
  const [custModal, setCustModal] = useState(false);
  const [itemModal, setItemModal] = useState(false);
  const [mode, setMode] = useState('date');
  const [date, setDate] = useState(new Date());
  const [customerName, setCustomerName] = useState('');
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
    if (selectedDate) {
      const currentDate = selectedDate || date;
      setShow(false);
      setDate(currentDate);
      setTxtDate(formatDate(currentDate.toString()));
      dispatch({
        type: 'SET_RQ_DATE',
        requiredDate: currentDate,
      });
    }
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
          list.push(customer);
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
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
              marginLeft: 8,
              marginBottom: 10,
            }}>
            <Item style={{flex: 2}}>
              <Input placeholder="Required Date" disabled value={txtDate} />
            </Item>
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
          </View>

          {/* Adding Items */}
          <Button
            style={{backgroundColor: '#2980b9'}}
            block
            curve
            onPress={() => {
              setItemModal(true);
            }}>
            <Text>Add Items</Text>
          </Button>
        </Form>
        {/* Modal1  Customer*/}
        <Modal backdropColor="white" backdropOpacity={1} isVisible={custModal}>
          <View style={{flex: 1}}>
            <Input
              placeholder="Please Enter Customer Name"
              style={{height: 40}}
              onChange={(e) => {
                searchWithInputCust(e);
              }}
            />
            <List style={{flex: 5}}>
              {renderList &&
                renderList.map((data) => {
                  return (
                    <ListItem key={data._id}>
                      <Left>
                        <Text>{data.customerName}</Text>
                      </Left>
                      <Right>
                        <Button
                          style={{width: 100, textAlign: 'center'}}
                          success
                          onPress={() => {
                            dispatch({
                              type: 'ADD_CUSTOMER_TO_ORDER',
                              selectedCustomer: {
                                id: data._id,
                                customerName: data.customerName,
                              },
                            });
                            setCustomerName(data.customerName);
                            setCustModal(false);
                          }}>
                          <Text>Select</Text>
                        </Button>
                      </Right>
                    </ListItem>
                  );
                })}
            </List>
          </View>
        </Modal>

        {/* Item Modal */}
        <Modal backdropColor="white" backdropOpacity={1} isVisible={itemModal}>
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
                      <Left style={{flex: 1}}>
                        <Text style={{flex: 1}}>{data.itemName}</Text>
                        <NumberFormat
                          style={{flex: 2, color: 'blueviolet'}}
                          value={data.itemPrice}
                          displayType={'text'}
                          thousandSeparator={true}
                          prefix={'Rs.'}
                          renderText={(value) => <Text>{value}</Text>}
                        />
                        <Input
                          style={{flex: 2, marginLeft: 10}}
                          placeholder="Enter Qty"
                          keyboardType="number-pad"
                          onChange={(e) => {
                            setQty(e.nativeEvent.text);
                          }}
                        />
                      </Left>
                      <Right>
                        <Button
                          success
                          onPress={() => {
                            if (!qty) {
                            } else {
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
                            }
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
