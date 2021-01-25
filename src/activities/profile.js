import React, { useEffect, Component, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator
} from "react-native";
import { AppStyles } from "../config/styles";

import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Text,
  Body,
  Title,
  Subtitle,
  Card,
  CardItem,
  Thumbnail,
  Left,
  ListItem,
  List,
} from "native-base";

import firebase from "../config/fb";
import "@firebase/auth";
import "@firebase/firestore";



const ProfileActivity = ({ navigation }) => {

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      getTask3();
      setLoading(false);
    }, 3000);
  }, []);

  const userEmail = () => {
    let email = firebase.auth().currentUser.email;
    return email;
  }

  const getTask3 = async () => {
    try {
      const userDatax = await firebase
        .firestore()
        .collection("Users")
        .doc(userEmail())
        .get();
      if (userDatax != undefined) {
        //fetch user data and push to array
        setUserData(userDatax.data());
        console.log("Get Task 3", userData)
      }
    } catch (error) {
      console.log("Get Task 3", error);
    }
  }
  // const getTask2 = () => {
  //   var arrData = [];
  //   const userDatab = firebase
  //     .firestore()
  //     .collection("Users")
  //     .where("email", "==", userEmail())
  //     .get();

  //     userDatab.forEach((documentSnapshot) => {
  //       arrData.push(documentSnapshot.data());
  //     });
  //     console.log(arrData);

  //   setUserData(arrData);
  // }

  //   //retreieves task from the remote server (Firebase)
  // const getTask = () => {
  //   const dbRef = firebase.firestore().collection("Users").doc(userEmail());
  //     dbRef.onSnapshot(data => getCollection(data))
  // }

  //    //a callback function to get returned data from getTask method
  //  const getCollection = (querySnapshot) => {
  //   const userDetails = [];
  //   querySnapshot.forEach((res) => {
  //     const {email,name,phone,} = res.data();
  //     userDetails.push({
  //       key: res.id,
  //       email,
  //       name,
  //       phone
  //     });
  //     //save the data to setTask state hook as an array
  //     setUserData(filterUserDetail(userDetails));
  //  });
  // }

  // //get each user specific data base on their email id
  //   const filterUserDetail = (val) => {
  //     const filteredResult = val.filter((tt) => tt.email === userEmail());
  //     return filteredResult;
  //   };

  //log user out of the app
  const __logout = () => {

    Alert.alert(
      "Log Out!",
      "Are you sure really want to log out?" + userEmail(),
      [
        {
          text: "No",
          onPress: () => null,
          style: "cancel",
        },
        { text: "Yes", onPress: () => takeToLogin() },
      ],
      { cancelable: false }
    );
  }

  const takeToLogin = () => {
    firebase.auth().signOut()
    navigation.navigate("LoginActivity");
  }

  return (
    loading ?
      <ActivityIndicator
        animating={loading}
        color={AppStyles.color.main}
        size="large"
        style={styles.activityIndicator}
      />
      :
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
                <Title>Profile - Church Donate</Title>
              </Body>
            </Header>
            <Content>
              <Card>
                <CardItem>
                  <Left>
                    {/* style={{ width: "90%", resizeMode: "contain", margin: 30 }} */}
                    <Thumbnail source={require("../../assets/user.jpg")} />
                    <Body>
                      <Text>Welcome Back</Text>
                      <Text note>{`${userData.name}`}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image
                    source={require("../../assets/user.jpg")}
                    style={{ height: 200, width: null, flex: 1 }}
                  />
                </CardItem>
              </Card>
              <ListItem icon style={{ marginTop: 20 }}>
                <Left>
                  <Button style={{ backgroundColor: AppStyles.color.main }}>
                    <Icon active name="person" />
                  </Button>
                </Left>
                <Body>
                  <Text>{userData.name}</Text>
                </Body>
              </ListItem>

              <ListItem icon style={{ marginTop: 20 }}>
                <Left>
                  <Button style={{ backgroundColor: AppStyles.color.main }}>
                    <Icon active name="mail" />
                  </Button>
                </Left>
                <Body>
                  <Text>{userEmail()}</Text>
                </Body>
              </ListItem>

              <ListItem icon style={{ marginTop: 20 }}>
                <Left>
                  <Button style={{ backgroundColor: AppStyles.color.main }}>
                    <Icon active name="call" />
                  </Button>
                </Left>
                <Body>
                  <Text>{userData.phone}</Text>
                </Body>
              </ListItem>

              <View style={styles.button}>
                <TouchableOpacity
                  style={styles.signIn}
                  onPress={() => __logout()}
                >
                  <Text
                    style={[
                      styles.signup,
                      {
                        color: "#fff",
                      },
                    ]}
                  >
                    Log Out
                </Text>
                </TouchableOpacity>
              </View>
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
  signup: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    paddingTop: 6,
    borderRadius: 10,
    backgroundColor: AppStyles.color.main,
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "50%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  activityIndicator: {
    alignItems: "center",
    height: 800,
  },
});

export default ProfileActivity
