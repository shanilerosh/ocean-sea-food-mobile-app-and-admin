import React from 'react';
import {View, Text} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';

import {
  Container,
  Header,
  Body,
  Right,
  Content,
  Card,
  CardItem,
  Thumbnail,
  List,
  ListItem,
  Left,
} from 'native-base';
import {Title} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ViewOrderForm from './components/ViewOrderForm';
import ViewOrderList from './components/ViewOrderList';

const Dashboard = () => {
  return (
    <Container>
      <Header style={{backgroundColor: '#2c3e50'}}>
        <Body>
          <Title>Dashboard</Title>
        </Body>
        <Right />
      </Header>
      <Content
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Card style={{width: '90%', marginTop: 10}}>
          <CardItem>
            <Body style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <List>
                  <ListItem avatar>
                    <Left>
                      <Thumbnail
                        source={{
                          uri:
                            'http://www.graphicsfuel.com/wp-content/uploads/2011/07/user-icon.jpg',
                        }}
                      />
                    </Left>
                  </ListItem>
                </List>
              </View>

              <View style={{flex: 2}}>
                <Text>Shanil Miranda</Text>
                <Text>Role</Text>
                <Text>Yo Yo</Text>
              </View>
            </Body>
          </CardItem>
        </Card>

        {/* Progess */}
        <Card style={{width: '90%', marginTop: 10}}>
          <CardItem>
            <Body
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <View>
                <ProgressCircle
                  percent={30}
                  radius={50}
                  borderWidth={8}
                  color="#27ae60"
                  shadowColor="#ecf0f1"
                  bgColor="#fff">
                  <Text style={{fontSize: 18}}>{'30%'}</Text>
                </ProgressCircle>
                <Text style={{marginTop: 10}}>Monthly Progress</Text>
              </View>

              <View>
                <ProgressCircle
                  percent={30}
                  radius={50}
                  borderWidth={8}
                  color="#27ae60"
                  shadowColor="#ecf0f1"
                  bgColor="#fff">
                  <Text style={{fontSize: 18}}>{'30%'}</Text>
                </ProgressCircle>
                <Text style={{marginTop: 10}}>Units Progress</Text>
              </View>
            </Body>
          </CardItem>
        </Card>

        <Card style={{width: '90%', marginTop: 10, alignContent: 'center'}}>
          <Text style={{textAlign: 'center', fontSize: 15, fontWeight: 'bold'}}>
            Filter Orders 💹
          </Text>
          <CardItem>
            <Body style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <ViewOrderForm />
              </View>
            </Body>
          </CardItem>
        </Card>

        <Card style={{width: '90%', marginTop: 10}}>
          <Text style={{textAlign: 'center', fontSize: 15, fontWeight: 'bold'}}>
            My Orders 💹
          </Text>
          <CardItem>
            <Body style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <ViewOrderList />
              </View>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

export default Dashboard;
