import React, { useState } from "react";
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { AppStyles } from "../config/styles";

import firebase from '../config/fb';
import '@firebase/firestore';
import '@firebase/auth';



const RegisterActivity = ({ navigation }) => {
    const [name, setName] = useState("");
     const [password, setPassword] = useState("");
     const [email, setEmail] = useState("");
     const [phone, setPhone] = useState("");

    const [confirm_password, setConfirm_password] = useState("");
    const [check_textInputChange, setcheck_textInputChange] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [confirm_secureTextEntry, setConfirm_secureTextEntry] = useState(true);
   
    
//   const [data, setData] = React.useState({
//     username: "",
//     password: "",
//     confirm_password: "",
//     check_textInputChange: false,
//     secureTextEntry: true,
//     confirm_secureTextEntry: true,
//   });

  const textInputChange = (val) => {
      if (val.length !== 0) {
          setName(val);
          setcheck_textInputChange(true)
    //   setData({
    //     ...data,
    //     username: val,
    //     check_textInputChange: true,
    //   });
    } else {
          setName(val);
          setcheck_textInputChange(false);
    }
  };

  const handlePasswordChange = (val) => {
      setPassword(val);
  };

    const handleConfirmPasswordChange = (val) => {
      setConfirm_password(val)
  };

    const updateSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry);
  };

    const updateConfirmSecureTextEntry = () => {
      setConfirm_secureTextEntry(!confirm_secureTextEntry);
  };

   const __doCreateUser = async () => {
     __createUserData()

    try {
      let response = await firebase.auth().createUserWithEmailAndPassword(
        email,
        password
      )
      if (response && response.user) {
        Alert.alert("Success ✅", response.user)
        console.log(response.user);
         //navigation.navigate("LoginActivity")

      }
    } catch (e) {
      Alert.alert("Error ✅", e.message)
      console.error(e.message)
    }
  }

  const __createUserData = () =>{
    const dbRef = firebase.firestore().collection('Users').doc(email);

              dbRef.set({
                  email: email,
                  password: password,
                  name: name,
                  phone: phone

                }).then((res) => {

                }).catch((err) => {
                  console.error("Error found: ", err);
                });
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Register on Purity Pay</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
                  <Text style={styles.text_footer}>Name</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Name"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setName(val)}
            />
            {check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <Text style={[styles.text_footer, {marginTop: 20}]}>Email</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setEmail(val)}
            />
            {check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="envelope" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          
          <Text style={[styles.text_footer, {marginTop: 20}]}>Phone Number</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Phone Number"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setPhone(val)}
            />
            {check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 20,
              },
            ]}
          >
            Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Password"
              secureTextEntry={secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>


          {/* <Text
            style={[
              styles.text_footer,
              {
                marginTop: 20,
              },
            ]}
          >
            Confirm Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Confirm Your Password"
              secureTextEntry={confirm_secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View> */}

          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              By signing up you agree to our
            </Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              {" "}
              Terms of service
            </Text>
            <Text style={styles.color_textPrivate}> and</Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              {" "}
              Privacy policy
            </Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity style={styles.signup} onPress={() => __doCreateUser()}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                  },
                ]}
              >
                Sign Up
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={() => navigation.navigate("LoginActivity")}
             // onPress={() => navigation.goBack()}
              style={[
                styles.signIn,
                {
                  borderColor: AppStyles.color.main,
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: AppStyles.color.main,
                  },
                ]}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default RegisterActivity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.main,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === "ios" ? 3 : 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    textAlign:"center"
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: AppStyles.color.main,
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: AppStyles.color.main,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  signup: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: AppStyles.color.main,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  color_textPrivate: {
    color: "grey",
  },
});
