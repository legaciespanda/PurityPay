import React, { useEffect, Component, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { AppStyles } from "../config/styles";

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
} from "native-base";

import firebase from "../config/fb";
import "@firebase/firestore";
import "@firebase/auth";

const History = ({ navigation }) => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      getTransaction();
      setLoading(false);
    }, 3000);
  }, []);

  //USER EMAIL
  const userEmail = () => {
    let email = firebase.auth().currentUser.email;
    return email;
  };

  //retreieves task from the remote server (Firebase)
  const getTransaction = () => {
    const dbRef = firebase.firestore().collection("Transactions");
    dbRef.onSnapshot((data) => getCollection(data));
  };

  //a callback function to get returned data from getTask method
  const getCollection = (querySnapshot) => {
    const taskArr = [];
    querySnapshot.forEach((res) => {
      taskArr.push(res.data());
      //save the data to setTask state hook as an array
      setHistoryData(filterByEmail(taskArr));
    });
  };
  //GET LIST OF TRANSACTIONS BASED ON CURRENT USER EMAIL
  const filterByEmail = (val) => {
    const filteredResult = val.filter((tt) => tt.email === userEmail());
    return filteredResult;
  };

  //fuunctional component to delete task from database
  const deleteTransaction = (taskID) => {
    //check for internet before making request for deleting task
    if (TrackTaskConnected) {
      const dbRef = firebase.firestore().collection("Transaction").doc(taskID);
      dbRef.delete().then((res) => {
        //show toast
        Toast.show({
          text: "Task Deleted Successfully!",
          buttonText: "Okay",
          duration: 2000,
        });
        console.log("Item removed from database");
      });
    } else {
      Alert.alert(
        "Error in Internet Connection",
        "To delete task, you must be connected to a Wi-Fi or turn on data",
        [
          {
            text: "Ok",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    }
  };

  const deleteTransactionYes = (taskID) => {
    Alert.alert(
      "Delete Transaction!",
      "Are you really sure you want to delete this transaction?",
      [
        {
          text: "No",
          onPress: () => null,
          style: "cancel",
        },
        { text: "Yes", onPress: () => deleteTransaction(taskID) },
      ],
      { cancelable: false }
    );
  };

  return loading ? (
    <ActivityIndicator
      animating={loading}
      color={AppStyles.color.main}
      size="large"
      style={styles.activityIndicator}
    />
  ) : (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Banner */}
      <View
        style={{
          flex: 1,
        }}
      >
        <Container>
          <Content>
            <FlatList
              data={historyData}
              renderItem={({ item, index }) => (
                <Card>
                  <CardItem>
                    <Text>Refernce</Text>
                    <Right>
                      <Text>{`${item.reference}`}</Text>
                    </Right>
                  </CardItem>

                  <CardItem>
                    <Text>Status</Text>
                    <Right>
                      {item.status == "failure" ? (
                        <Text style={{ color: "#FF0000", flex: 1 }} danger>
                          Failed
                        </Text>
                      ) : (
                        <Text style={{ color: "#00FF00", flex: 1 }}>
                          Success
                        </Text>
                      )}
                    </Right>
                  </CardItem>

                  <CardItem>
                    <Text>Amount</Text>
                    <Right>
                      <Text>{`${item.amount_paid}`}</Text>
                    </Right>
                  </CardItem>

                  <CardItem>
                    <Text>Date</Text>
                    <Right>
                      <Text>{`${item.transaction_date}`}</Text>
                    </Right>
                  </CardItem>

                  <CardItem>
                    <Text>Code</Text>
                    <Right>
                      <Text>{`${item.customer_code}`}</Text>
                    </Right>
                  </CardItem>

                  <CardItem>
                    <Text>Delete Transaction</Text>
                    <Right>
                      <Button
                        onPress={() => deleteTransactionYes(item.id)}
                        danger
                      >
                        <Icon active name="ios-close" />
                      </Button>
                    </Right>
                  </CardItem>
                </Card>
              )}
            />
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
  recordText: {
    color: AppStyles.color.main,
    fontSize: 20,
    textAlign: "center",
    alignSelf: "center",
  },
  activityIndicator: {
    alignItems: "center",
    height: 500,
  },
});

export default History;
