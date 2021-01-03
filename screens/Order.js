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
import OrderForm from './components/OrderForm';

const Order = () => {
  return (
    <Container>
      <Header hasTabs>
        <Body>
          <Title>Order</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <OrderForm />
      </Content>
    </Container>
  );
};

export default Order;
