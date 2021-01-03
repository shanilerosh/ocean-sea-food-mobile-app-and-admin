import React, {useState, useEffect} from 'react';
import {Form, Item, Input, View, Button, Text} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Platform, StyleSheet} from 'react-native';
import {useStateValue} from '../../central_state_mgt/StateProvider';
import axios from '../../Axios';
import {InputAutoSuggest} from 'react-native-autocomplete-search';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList} from 'react-native-gesture-handler';

const OrderForm = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [txtDate, setTxtDate] = useState('');
  const [item, setAddItem] = useState('');
  const [qty, setQty] = useState('');

  const [{basket}, setBasket] = useStateValue();
  const [state, dispatch] = useStateValue();
  const [{customers}, setCustomers] = useStateValue();
  const [{items}, setItems] = useStateValue();

  useEffect(() => {
    const loadAllCustomers = async () => {
      const {data} = await axios({
        method: 'GET',
        url: '/customer/findAllCustomers',
      });

      if (data.isDone) {
        dispatch({
          type: 'LOAD_CUSTOMERS',
          customer: data.data,
        });
      } else {
        alert('Error');
      }
    };

    loadAllCustomers();
  }, []);

  useEffect(() => {
    const loadAllItems = async () => {
      const {data} = await axios({
        method: 'GET',
        url: '/item/getAllItems',
      });
      if (data.isDone) {
        dispatch({
          type: 'LOAD_ITEMS',
          item: data.data,
        });
      } else {
        alert('Error');
        //Error do this
      }
    };

    loadAllItems();
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setTxtDate(formatDate(currentDate.toString()));
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

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const submitItem = () => {
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        item,
        qty,
      },
    });
    setAddItem('');
    setQty('');
  };

  return (
    <Form>
      <Item>
        <Input placeholder="Customer Name" />
      </Item>
      <View
        style={{
          width: 300,
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
      <View
        style={{
          width: 400,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignContent: 'center',
        }}>
        <Item style={{flex: 4}}>
          <Input
            placeholder="Item Name"
            value={item}
            onChange={(e) => {
              setAddItem(e.nativeEvent.text);
            }}
          />
        </Item>
        <Item style={{flex: 2, marginLeft: 10}}>
          <Input
            placeholder="Qty"
            value={qty}
            onChange={(e) => {
              setQty(e.nativeEvent.text);
            }}
          />
        </Item>
        <Item last style={{flex: 2}}>
          <Button small style={{marginTop: 4}} onPress={submitItem}>
            <Text>Add Item</Text>
          </Button>
        </Item>
      </View>
      <View></View>
    </Form>
  );
};

const getSuggestion = (data) => {
  let arr = [];
  data.map((item) => {
    arr.push({
      id: item._id,
      name: item.customerName,
    });
  });
  return arr;
};

export default OrderForm;
