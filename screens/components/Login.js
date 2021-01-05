import React, {useState, useEffect} from 'react';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Text,
  Button,
} from 'native-base';
import {View, StyleSheet, Image} from 'react-native';
import {cos} from 'react-native-reanimated';
import {Formik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const reviewSchema = yup.object({
  username: yup.string().required().min(4),
  password: yup.string().required().min(6).max(20),
});

const Login = ({navigation}) => {
  const checkUser = (user) => {
    axios.get();
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Formik
        initialValues={{username: '', password: ''}}
        validationSchema={reviewSchema}
        onSubmit={(values, action) => {
          action.resetForm();
          checkUser(values);
        }}>
        {(props) => (
          <Form>
            <Item floatingLabel style={{width: 300, height: 60}}>
              <Label>Username</Label>
              <Input
                onChangeText={props.handleChange('username')}
                value={props.values.username}
                onBlur={props.handleBlur('username')}
              />
            </Item>
            <Text
              style={{
                color: 'red',
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              {props.touched.username && props.errors.username}
            </Text>
            <Item floatingLabel last style={{width: 300, height: 60}}>
              <Label>Password</Label>
              <Input
                onChangeText={props.handleChange('password')}
                value={props.values.password}
                onBlur={props.handleBlur('password')}
              />
            </Item>
            <Text
              style={{
                color: 'red',
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              {props.touched.password && props.errors.password}
            </Text>
            <Button
              full
              rounded
              success
              onPress={props.handleSubmit}
              style={{marginTop: 10, alignContent: 'center'}}>
              <Text>Login</Text>
            </Button>
          </Form>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginView: {
    height: 180,
    width: 400,
  },
  formItem: {
    marginBottom: 30,
  },
  btn: {
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default Login;
