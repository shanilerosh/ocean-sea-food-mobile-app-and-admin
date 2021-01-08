import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {View, Button, Platform} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Left,
  List,
  ListItem,
  Right,
  Body,
  Card,
  CardItem,
  Icon,
  Text,
  Form,
  Item,
  Input,
} from 'native-base';
import OrderList from './components/OrderList';
import OrderBillingForm from './components/OrderBillingForm';
import OrderSummary from './components/OrderSummary';

const Order = () => {
  return (
    <Container>
      <Header style={{backgroundColor:'#2c3e50'}}>
        <Body>
          <Title>Order</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <OrderBillingForm />
      </Content>
      <Content>
        <OrderList />
      </Content>
      <Content>
        <OrderSummary />
      </Content>
    </Container>
  );
};

export default Order;
