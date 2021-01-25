import React, { useEffect, Component, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import { AppStyles } from "../config/styles";

import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Body,
  Title,
} from "native-base";

import firebase from "../config/fb";
import "@firebase/firestore";
import "@firebase/auth";

const Transaction = ({ navigation }) => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const setTransactionDate = (date) => {
    return new Date(date.toDate()).toDateString();
  };

  const userEmail = () => {
    let email = firebase.auth().currentUser.email;
    return email;
  };

  //function for saving task
  const saveTask = () => {
    const dbRef = firebase.firestore().collection("Transactions");
    //const fdb = firebase.firestore();
    //dbRef.enablePersistence({ synchorizeTabs: true });
    //show spinner
    //setLoadSpinner(true);
    //save data to firebase
    dbRef
      .add({
        amount_paid: 3500,
        transaction_date: "2016-10-01T11:03:09.000Z",
        status: "success",
        reference: "DG4uishudoq90LD",
        gateway_response: "Successful",
        ip_address: "41.1.25.1",
        customer_code: 84312,
        first_name: "Obot",
        last_name: "Ernest",
        email: userEmail(),
      })
      .then((res) => {
        //when added successfully clear the state
        //navigate to home activity
        Alert.alert("Transaction Successful: ");
      })
      .catch((err) => {
        console.error("Error found: ", err);
        Alert.alert("Error found: ", err);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Banner */}
      <View
        style={{
          flex: 1,
        }}
      >
        <Container>
          <Header>
            <Body>
              <Title>Transaction - Church Pay</Title>
            </Body>
          </Header>

          <Content>
            <Button
              onPress={() => {
                saveTask();
              }}
              style={{ backgroundColor: AppStyles.color.main }}
            >
              <Icon active name="person" />
            </Button>
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
  },
});

export default Transaction;
