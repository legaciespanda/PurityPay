import React, {Component, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { AppStyles } from "../config/styles";


import Rave from "react-native-rave-webview";
import { WebView } from "react-native-webview";
import PaystackWebView from "react-native-paystack-webview";


import { Container, Header, Content, Footer,
   FooterTab, Button, Icon, Text, Badge, Item , 
   Card, CardItem, Body,Input,Textarea, Form, Picker,Toast  } from 'native-base';




const PayTithe = ({ navigation }) => {



  const [billingEmail, setbillingEmail] = useState("");
  const [amount, setamount] = useState("");
  const [billingName, setbillingName] = useState("");
  const [billingMobile, setbillingMobile] = useState("");




  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Banner */}
      <View
        style={{
          flex: 1,
        }}
      >
        <Container>
          <Content padder>
            <Card>
              <CardItem header>
                <Text>
                  Since you are registered with PurityPay, your name, email and
                  phone number will be filled in automatically. Input the amount
                  you want to pay and and pay your tithe.
                </Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>Name: </Text>
                  <Item regular>
                    <Input
                      disabled
                      onChangeText={(text) => setbillingName(text)}
                      value={billingName}
                      placeholder="Ernest Obot"
                    />
                  </Item>
                  <Text>Email: </Text>
                  <Item regular>
                    <Input
                      disabled
                      onChangeText={(text) => setbillingEmail(text)}
                      value={billingEmail}
                      placeholder="youandinews@gmail.com"
                    />
                  </Item>
                  <Text>Phone Number: </Text>
                  <Item disabled regular>
                    <Input
                      disabled
                      onChangeText={(text) => setbillingMobile(text)}
                      value={billingMobile}
                      placeholder="07012159048"
                    />
                  </Item>

                  <Text>Amount: </Text>
                  <Item regular>
                    <Input
                      onChangeText={(text) => setamount(text)}
                      value={amount}
                      placeholder="2000"
                    />
                  </Item>
                </Body>
              </CardItem>

              <CardItem footer button>
                <Rave
                  buttonText="Pay Now"
                  raveKey="FLWPUBK-924d5a473354facb54dbf37dc5d28f73-X"
                  amount={20000}
                  billingEmail="ayoshokz@gmail.com"
                  billingMobile="08101274387"
                  billingName="Oluwatobi Shokunbi"
                  ActivityIndicatorColor="green"
                  onCancel={() => console.log()}
                  onSuccess={(transactionRef) => console.log(transactionRef)}
                  btnStyles={{
                    backgroundColor: "green",
                    width: 100,
                    alignContent: "center",
                  }}
                  textStyles={{ color: "white", alignSelf: "center" }}
                  onError={() => {
                    alert("something went wrong");
                  }}
                  txref="1234"
                />
              </CardItem>
            </Card>
          </Content>
        </Container>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.white,
  }
});

export default PayTithe;
