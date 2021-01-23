import React, { useEffect,Component,useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
  FlatList
} from "react-native";
import { AppStyles } from "../config/styles";

import { Col, Row, Grid } from "react-native-easy-grid";

import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  Badge,
  Fab,
  Body,
  Title,
  Subtitle,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Right,
  Toast,
  Textarea,
  Drawer,
    SideBar,
} from "native-base";


import { useNavigation } from '@react-navigation/native';
import { color } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";


import firebase from '../config/fb';
import '@firebase/auth';



const HomeActivity = ({ navigation }) => {

  //log user out of the app
  const __logout = ()=>{

            Alert.alert(
              "Log Out!",
              "Are you sure really want to log out?",
              [
                {
                  text: "No",
                  onPress: () => null,
                  style: "cancel",
                },
                { text: "Yes", onPress: () => takeToLogin()},
              ],
              { cancelable: false }
            );
  }

  const takeToLogin = ()=>{
    firebase.auth().signOut()
    navigation.navigate("LoginActivity");
  }

   //check if user is authenticated
    __isTheUserAuthenticated = () => {
    let user = firebase.auth().currentUser.uid;
        if (user) {
          Alert.alert("Logged in already", user);
        } else {
          Alert.alert("Not Logged in");
        }
      };

  const closeDrawer =  () => {
    drawer._root.close()
    };
    
    const openDrawer = () => {
        drawer._root.open()
    };
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Banner */}
      <View
        style={{
          flex: 1,
        }}
      >
        {/* <Drawer
          ref={(ref) => {
            _drawer = ref;
          }}
          content={<SideBar />}
        >
          <Container>
            <Header style={{ backgroundColor: "#C0C0C0" }}>
              <Left>
                <Button transparent onPress={openDrawer()}>
                  <Icon name="menu" />
                </Button>
              </Left>
              <Body>
                <Title style={{ color: "#FFF" }}> title </Title>
              </Body>
            </Header>
            <Content>// Your other content here</Content>
          </Container>
        </Drawer> */}

        <Container>
          <Header>
            <Body>
              <Title style={{ color: AppStyles.color.white }}>Purity Pay</Title>
            </Body>
          </Header>

          <Content>
            <Grid>
              <Col style={{ backgroundColor: "#000000", height: 200 }}>
                <Text style={styles.header}>Purity Pay</Text>
                <Image
                  source={require("../../assets/loader.gif")}
                  style={{ width: "40%", marginStart: 110 }}
                />
              </Col>
              <Col
                style={{ backgroundColor: AppStyles.color.white, height: 30 }}
              >
                <Text style={styles.pay}>Can A Man Rob God? - Malachi 6:8</Text>
              </Col>
              <Row
                style={{ backgroundColor: AppStyles.color.row, height: 150 }}
              >
                <Button
                  onPress={() => navigation.navigate("PayTithe")}
                  large
                  iconLeft
                  light
                  style={styles.iconBg}
                >
                  <Icon style={styles.iconText} name="md-card" />
                  <Text style={styles.iconText}>Tithe</Text>
                </Button>

                <Button onPress={() => __logout()} 
                 large iconLeft light style={styles.iconBg}>
                  <Icon style={styles.iconText} name="md-card" />
                  <Text style={styles.iconText}>Offering</Text>
                </Button>
              </Row>

              <Row
                style={{ backgroundColor: AppStyles.color.row, height: 150 }}
              >
                <Button
                  onPress={() => navigation.navigate("SettingsActivity")}
                  large
                  iconLeft
                  light
                  style={styles.iconBg}
                >
                  <Icon style={styles.iconText} name="ios-settings" />
                  <Text style={styles.iconText}>More</Text>
                </Button>

                <Button
                  onPress={() => navigation.navigate("LoginActivity")}
                  large
                  iconLeft
                  light
                  style={styles.iconBg}
                >
                  <Icon style={styles.iconText} name="md-card" />
                  <Text style={styles.iconText}>Donation</Text>
                </Button>
              </Row>
              <Row
                style={{ backgroundColor: AppStyles.color.row, height: 125 }}
              >
                <Button
                  onPress={() => __isTheUserAuthenticated()}
                  large
                  iconLeft
                  light
                  style={styles.iconBg}
                >
                  <Icon style={styles.iconText} name="ios-person" />
                  <Text style={styles.iconText}>Profile</Text>
                </Button>

                <Button
                  onPress={() => navigation.navigate("RegisterActivity")}
                 large iconLeft light style={styles.iconBg}>
                  <Icon style={styles.iconText} name="ios-book" />
                  <Text style={styles.iconText}>History</Text>
                </Button>
              </Row>
            </Grid>
          </Content>

          {/* <Footer>
            <FooterTab>
              <Button
                onPress={() => navigation.navigate("HomeActivity")}
                active
                vertical
              >
                <Icon name="ios-add-circle" />
                <Text>Home</Text>
              </Button>
              <Button
                onPress={() => navigation.navigate("CompletedTaskActivity")}
                vertical
              >
                <Icon name="ios-checkbox" />
                <Text>Make Payment</Text>
              </Button>
              <Button
                onPress={() => navigation.navigate("SettingsActivity")}
                vertical
              >
                <Icon name="ios-settings" />
                <Text>Setings</Text>
              </Button>
            </FooterTab>
          </Footer> */}
        </Container>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.white,
  },
  header: {
    fontSize: 30,
    color: AppStyles.color.white,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
    marginBottom: -30,
  },
  pay: {
    fontSize: 20,
    color: AppStyles.color.main,
    fontWeight: "bold",
    textAlign: "center",
  },
  iconText: {
    color: AppStyles.color.main,
    textTransform: "capitalize",
  },
  iconBg: {
    backgroundColor: AppStyles.color.white,
    marginStart: 30,
    marginTop: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  icon: {
    color: AppStyles.color.main,
  },
});

export default HomeActivity;
