import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {Button, Input, Text} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import {useStateValue} from '../../central_state_mgt/StateProvider';
import ViewOrderList from './ViewOrderList';

const ViewOrderForm = () => {
  const [mode, setMode] = useState({dateFrom: 'date', dateTo: 'date'});
  const [date, setDate] = useState({dateFrom: new Date(), dateTo: new Date()});
  const [txtDate, setTxtDate] = useState({dateFrom: '', dateTo: ''});
  const [show, setShow] = useState({dateFrom: false, dateTo: false});
  const [state, dispatch] = useStateValue();

  const populateOrders = () => {
    axios
      .get(
        `http://10.0.2.2:1234/api/v1/order/getOrdersByDate?userId=1&dateFrom=${date.dateFrom}&dateTo=${date.dateTo}`,
      )
      .then(({data}) => {
        dispatch({
          type: 'LOAD_ORDERS',
          order: data.data,
        });
      })
      .catch((err) => {});
  };

  const onChangeFromDate = (event, selectedDate) => {
    if (selectedDate) {
      const currentDate = selectedDate || date;
      setShow({...show, dateFrom: false});
      setDate({...date, dateFrom: currentDate});
      setTxtDate({...txtDate, dateFrom: formatDate(currentDate)});
      console.log(date);
    }
  };

  const onChangeToDate = (event, selectedDate) => {
    if (selectedDate) {
      const currentDate = selectedDate || date;
      setShow({...show, dateTo: false});
      setDate({...date, dateTo: currentDate});
      setTxtDate({...txtDate, dateTo: formatDate(currentDate)});
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

  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Button
            onPress={() => {
              setShow({...show, dateFrom: true});
            }}>
            <Text>Date From</Text>
          </Button>
          <Text style={{marginTop: 10, marginRight: 15}}>
            {date.dateFrom ? date.dateFrom.toDateString() : ''}
          </Text>
          {show.dateFrom && (
            <DateTimePicker
              testID="dateTimePickerFrom"
              value={date.dateFrom}
              mode={mode.dateFrom}
              is24Hour={true}
              display="default"
              onChange={onChangeFromDate}
            />
          )}
        </View>

        <View>
          <Button
            onPress={() => {
              setShow({...show, dateTo: true});
            }}>
            <Text>Date To</Text>
          </Button>
          <Text style={{marginTop: 10}}>
            {date.dateTo && date.dateTo.toDateString()}
          </Text>
          {show.dateTo && (
            <DateTimePicker
              testID="dateTimePickerTo"
              value={date.dateTo}
              mode={mode.dateTo}
              is24Hour={true}
              display="default"
              minimumDate={date.dateFrom}
              onChange={onChangeToDate}
            />
          )}
        </View>
      </View>
      <View style={{alignContent: 'center'}}>
        <Button success full curve onPress={populateOrders}>
          <Text>View Orders</Text>
        </Button>
      </View>
    </View>
  );
};

export default ViewOrderForm;
