import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {View, Button, Platform} from 'react-native';
import ItemList from './components/ItemList';
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

const Items = () => {
  return (
    <Container>
      <Header>
        <Body>
          <Title>Item</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <ItemList />
      </Content>
    </Container>
  );
};

export default Items;
