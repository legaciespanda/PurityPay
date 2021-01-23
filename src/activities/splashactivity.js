// Import React and Component
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  Text,
  Alert,
} from "react-native";
import { AppStyles } from "../config/styles";

// import HomeActivity from './src/activities/mainactivity';

import firebase from "../config/fb";
import "@firebase/auth";

const SplashScreen = ({ navigation }) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
  const [isLoggedIn, setisLoggedIn] = useState();
  const [initializing, setInitializing] = useState(true);

  //afetr loading the splash screen for 5 seconds, take the user to the main activity
  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      // isLoggedIn
      //   ? navigation.replace("HomeActivity")
      //   : navigation.replace("LoginActivity");
      //   //__isTheUserAuthenticated();
      const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber;
    }, 4000);
  });

  // useEffect(() => {
  //   const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  //check if user has been signed in already
  function onAuthStateChanged(isLoggedIn) {
    setisLoggedIn(isLoggedIn);
    if (isLoggedIn) {
      navigation.replace("HomeActivity");
    } else {
      navigation.replace("LoginActivity");
    }
    // if (initializing) setInitializing(false);
  }

  // if (initializing) return null;

  //check if user is authenticated
  // __isTheUserAuthenticated = () => {
  // let user = firebase.auth().currentUser.uid;
  //   if (user === null) {
  //       //Alert.alert("Logged in already", user);
  //       navigation.replace("HomeActivity")
  //       //console.log(tag,  user);
  //     } else {
  //       //Alert.alert("Not Logged in", user);
  //       navigation.replace("LoginActivity")
  //     }
  //   };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Initializing Church Donate...</Text>
      <Image
        source={require("../../assets/loader.gif")}
        style={{ width: "90%", resizeMode: "contain", margin: 30 }}
      />

      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffff",
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
  header: {
    fontSize: 20,
    color: AppStyles.color.deepblue,
    fontWeight: "bold",
    paddingVertical: 14,
  },
});
