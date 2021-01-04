import React, {useEffect, useState} from 'react';
import {
  Container,
  Button,
  Content,
  List,
  ListItem,
  Text,
  Root,
  Left,
  Right,
  View,
  Input,
  Item,
} from 'native-base';
import axios from 'axios';
import {useStateValue} from '../../central_state_mgt/StateProvider';
import {log} from 'react-native-reanimated';
import CustomisableAlert, {
  closeAlert,
  showAlert,
} from 'react-native-customisable-alert';

const ItemList = () => {
  const [{items}, setItems] = useStateValue();
  const [renderList, setRenderList] = useState([]);
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    console.log(state);
    console.log('use effect runs');
    axios
      .get('http://10.0.2.2:1234/api/v1/item/getAllItems')
      .then(({data}) => {
        if (data.isDone) {
          dispatch({
            type: 'LOAD_ITEMS',
            item: data.data,
          });
          setRenderList(items);
        } else {
          Toast.show({
            text: 'Something Went Wrong',
            buttonText: 'Okay',
            type: 'Error',
            postion: 'top',
          });
        }
      })
      .catch((err) => {
        Toast.show({
          text: 'Something Went Wrong',
          buttonText: 'Okay',
          type: 'Error',
          postion: 'top',
        });
      });
  }, []);

  const searchWithInput = ({nativeEvent}) => {
    const userInput = nativeEvent.text;
    let list = [];
    if (userInput !== '') {
      items.map((item) => {
        if (
          item.itemName
            .toString()
            .toLowerCase()
            .startsWith(userInput.toLowerCase())
        ) {
          console.log('here');
          list.push(item);
          console.log('here 2');
        }
      });
    } else {
      list = items;
    }

    setRenderList(list);
  };

  return (
    <Root>
      <Container>
        <Content>
          <Item>
            <Input placeholder="Type to search" onChange={searchWithInput} />
          </Item>
          <List>
            {items &&
              renderList.map((data) => {
                return (
                  <ListItem key={data._id}>
                    <Left>
                      <Text>{data.itemName}</Text>
                    </Left>
                    <Right>
                      <Button
                        success
                        rounded
                        small
                        onPress={() => {
                          showAlert({
                            title: 'Something went good!',
                            message: 'Your code works!',
                            alertType: 'custom',
                            customAlert: (
                              <View
                                style={{
                                  backgroundColor: 'white',
                                  padding: 20,
                                  width: '85%',
                                }}>
                                <Text style={{padding: 15}}>
                                  Item Name : {data.itemName}
                                </Text>
                                <Text style={{padding: 15}}>
                                  Price per kG : {data.itemPrice}
                                </Text>
                                <Button onPress={() => closeAlert()}>
                                  <Text>Close</Text>
                                </Button>
                              </View>
                            ),
                          });
                        }}>
                        <Text>View</Text>
                      </Button>
                    </Right>
                  </ListItem>
                );
              })}
          </List>
        </Content>
        <CustomisableAlert
          titleStyle={{
            fontSize: 18,
            fontWeight: 'bold',
          }}
        />
      </Container>
    </Root>
  );
};

export default ItemList;
