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
  H3,
} from 'native-base';
import axios from 'axios';
// import axios from '../../Axios';
import {useStateValue} from '../../central_state_mgt/StateProvider';
import {log} from 'react-native-reanimated';
import * as yup from 'yup';
import {Formik} from 'formik';
import {Badge} from 'react-native-paper';

const customerSchema = yup.object({
  customerName: yup.string().required().min(4),
  customerAddress: yup.string().required().min(5),
  customerMobile: yup
    .number()
    .typeError('You must enter a number')
    .required()
    .min(10),
  customerNIC: yup.string().required().min(10),
});

const CustomerForm = () => {
  const [state, dispatch] = useStateValue();

  const handleSubmit = (customer) => {
    console.log(customer);
    axios
      .post('http://10.0.2.2:1234/api/v1/customer/saveCustomer', {
        customerName: customer.customerName,
        customerAddress: customer.customerAddress,
        customerMobile: customer.customerMobile,
        customerNIC: customer.customerNIC,
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
          Toast.show({
            text: `Error please try again`,
            buttonText: 'Okay',
            type: 'danger',
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
          Customer Registration
        </Text>
        <Content style={{marginTop: 20}}>
          <Formik
            initialValues={{
              customerName: '',
              customerAddress: '',
              customerMobile: '',
              customerNIC: '',
            }}
            validationSchema={customerSchema}
            onSubmit={(values, action) => {
              handleSubmit(values);
              action.resetForm();
              console.log(values);
            }}>
            {(props) => (
              <Form>
                <Item>
                  <Input
                    placeholder="Customer Name"
                    value={props.values.customerName}
                    onChangeText={props.handleChange('customerName')}
                    onBlur={props.handleBlur('customerName')}
                  />
                </Item>
                <Text
                  style={{
                    color: 'red',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  {props.touched.customerName && props.errors.customerName}
                </Text>
                <Item>
                  <Input
                    placeholder="Customer Address"
                    value={props.values.customerAddress}
                    onChangeText={props.handleChange('customerAddress')}
                    onBlur={props.handleBlur('customerAddress')}
                  />
                </Item>
                <Text
                  style={{
                    color: 'red',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  {props.touched.customerAddress &&
                    props.errors.customerAddress}
                </Text>
                <Item>
                  <Input
                    placeholder="Customer Mobile"
                    value={props.values.customerMobile}
                    onChangeText={props.handleChange('customerMobile')}
                    onBlur={props.handleBlur('customerMobile')}
                    keyboardType="number-pad"
                  />
                </Item>
                <Text
                  style={{
                    color: 'red',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  {props.touched.customerMobile && props.errors.customerMobile}
                </Text>
                <Item>
                  <Input
                    placeholder="Customer NIC"
                    value={props.values.customerNIC}
                    onChangeText={props.handleChange('customerNIC')}
                    onBlur={props.handleBlur('customerNIC')}
                  />
                </Item>
                <Text
                  style={{
                    color: 'red',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  {props.touched.customerNIC && props.errors.customerNIC}
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginVertical: 10,
                  }}>
                  <Button success onPress={props.handleSubmit}>
                    <Text>Save Customer</Text>
                  </Button>
                  <Button danger onPress={props.resetForm}>
                    <Text>Cancel</Text>
                  </Button>
                </View>
              </Form>
            )}
          </Formik>
        </Content>
      </Container>
    </Root>
  );
};

export default CustomerForm;
