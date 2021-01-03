import React, {useState} from 'react';
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

const Login = ({navigation}) => {
  const [username, setUserName] = useState('');
  const [password, setUserPassword] = useState('');

  const handleSubmit = () => {
    navigation.navigate('Order');
  };

  return (
    <View style={styles.container}>
      <Form style={styles.loginView}>
        <Item floatingLabel style={styles.formItem}>
          <Label>Username</Label>
          <Input
            onChange={(e) => {
              setUserName(e.nativeEvent.text);
            }}
          />
        </Item>
        <Item floatingLabel last style={styles.formItem}>
          <Label>Password</Label>
          <Input
            onChange={(e) => {
              setUserPassword(e.nativeEvent.text);
            }}
          />
        </Item>
        <Button style={styles.btn} rounded success onPress={handleSubmit}>
          <Text>Login</Text>
        </Button>
      </Form>
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
