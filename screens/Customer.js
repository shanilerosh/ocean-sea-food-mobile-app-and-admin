import React, {useEffect} from 'react';
import {Container, Header, Content, Tab, Tabs, Text} from 'native-base';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';

const Customer = () => {
  return (
    <Container>
      <Tabs>
        <Tab heading="Register">
          <CustomerForm />
        </Tab>
        <Tab heading="View">
          <CustomerList />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Customer;
