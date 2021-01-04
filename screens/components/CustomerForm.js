import React, {useState} from 'react';
import {
  Container,
  Button,
  Content,
  Form,
  Item,
  Input,
  Text,
  View,
  Toast,
  Root,
} from 'native-base';
import axios from 'axios';
// import axios from '../../Axios';
import {useStateValue} from '../../central_state_mgt/StateProvider';
import {log} from 'react-native-reanimated';

const CustomerForm = () => {
  const [state, dispatch] = useStateValue();
  const [custName, setCustname] = useState('');
  const [custAddress, setCustomerAddress] = useState('');
  const [custMobile, setCustmobile] = useState('');
  const [custNic, setCustnic] = useState('');
  const handleSubmit = () => {
    axios
      .post('http://10.0.2.2:1234/api/v1/customer/saveCustomer', {
        customerName: custName,
        customerAddress: custAddress,
        customerMobile: custMobile,
        customerNIC: custNic,
      })
      .then(({data}) => {
        if (data.isDone) {
          console.log('inside if');
          Toast.show({
            text: 'Successfully Added',
            buttonText: 'Okay',
            type: 'success',
            postion: 'top',
          });
          dispatch({
            type: 'ADD_CUSTOMER',
            customer: data.data,
          });
        } else {
          console.log('Inside else');
          Toast.show({
            text: `Error ${data.data}`,
            buttonText: 'Okay',
            type: 'success',
            postion: 'bottom',
          });
        }
      })
      .catch((err) => {
        Toast.show({
          text: `Catch`,
          buttonText: 'Okay',
          type: 'success',
          postion: 'top',
        });
      });
  };

  const onCancel = () => {
    setCustname('');
    setCustomerAddress('');
    setCustmobile('');
    setCustnic('');
  };

  return (
    <Root>
      <Container>
        <Content style={{marginTop: 20}}>
          <Form>
            <Item>
              <Input
                placeholder="Customer Name"
                value={custName}
                onChange={(e) => {
                  setCustname(e.nativeEvent.text);
                }}
              />
            </Item>
            <Item>
              <Input
                placeholder="Customer Address"
                value={custAddress}
                onChange={(e) => {
                  setCustomerAddress(e.nativeEvent.text);
                }}
              />
            </Item>
            <Item>
              <Input
                placeholder="Customer Mobile"
                value={custMobile}
                onChange={(e) => {
                  setCustmobile(e.nativeEvent.text);
                }}
              />
            </Item>
            <Item>
              <Input
                placeholder="Customer NIC"
                value={custNic}
                onChange={(e) => {
                  setCustnic(e.nativeEvent.text);
                }}
              />
            </Item>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginVertical: 10,
              }}>
              <Button success onPress={handleSubmit}>
                <Text>Save Customer</Text>
              </Button>
              <Button danger onPress={onCancel}>
                <Text>Cancel</Text>
              </Button>
            </View>
          </Form>
        </Content>
      </Container>
    </Root>
  );
};

export default CustomerForm;
