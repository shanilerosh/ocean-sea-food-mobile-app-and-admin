import React, {useEffect} from 'react';
import {
  Container,
  Header,
  Content,
  Tab,
  Tabs,
  Text,
  Body,
  Title,
  Right,
} from 'native-base';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';

const Customer = () => {
  return (
    <Container>
      <Header style={{backgroundColor: '#2c3e50'}}>
        <Body>
          <Title>Customers</Title>
        </Body>
        <Right />
      </Header>
      <Tabs>
        <Tab
          heading="Register"
          tabStyle={{backgroundColor: '#2c3e50'}}
          activeTabStyle={{backgroundColor: '#2c3e50'}}>
          <CustomerForm />
        </Tab>
        <Tab
          heading="View"
          tabStyle={{backgroundColor: '#2c3e50'}}
          activeTabStyle={{backgroundColor: '#2c3e50'}}>
          <CustomerList />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Customer;
