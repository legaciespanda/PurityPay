// Import React and Component
import React, {useState, useEffect} from 'react';
import { ActivityIndicator, View, StyleSheet, Image, Text, Alert } from 'react-native';
import { AppStyles } from "../config/styles";

// import HomeActivity from './src/activities/mainactivity';

import firebase from '../config/fb';
import '@firebase/auth';



const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
    const [isLoggedIn, setisLoggedIn] = useState();
    const [initializing, setInitializing] = useState(true);

  //afetr loading the splash screen for 5 seconds, take the user to the main activity
    useEffect(()=>{

        setTimeout(() => {
          setAnimating(false);
          !isLoggedIn? navigation.replace("LoginActivity"):navigation.replace("HomeActivity")
        }, 6000);
    })

         function onAuthStateChanged(isLoggedIn) {
              setUser(isLoggedIn);
              if (initializing) setInitializing(false);
      }

      useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
      }, []);

  if (initializing) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Initializing PurityPay...</Text>
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
    color:  AppStyles.color.deepblue,
    fontWeight: "bold",
    paddingVertical: 14,
  },
});
