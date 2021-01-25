import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

import { AppStyles } from "../config/styles";

import firebase from "../config/fb";
import "@firebase/auth";

const ForgotActivity = ({ navigation }) => {
  const [data, setData] = React.useState({
    username: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
  });

  //sign user in and take them to the home activity
  const __resetPassword = async () => {
    try {
      let response = await firebase
        .auth()
        .sendPasswordResetEmail(data.username);
      if (response) {
        Alert.alert("Psssword Resent Success✅. Please check your email");
        //console.log(response);
        //navigation.replace("LoginActivity")
      }
    } catch (e) {
      Alert.alert("Error ✅", e.message);
      console.error(e.message);
    }
  };

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={AppStyles.color.main}
        barStyle="light-content"
      />
      <View style={styles.header}>
        <Text style={styles.text_header}>Reset Password</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: AppStyles.color.white,
          },
        ]}
      >
        <Text
          style={[
            styles.text_footer,
            {
              color: AppStyles.color.white,
            },
          ]}
        >
          Email
        </Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={AppStyles.color.main} size={20} />
          <TextInput
            placeholder="Your Email"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: AppStyles.color.main,
              },
            ]}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Enter valid email address.</Text>
          </Animatable.View>
        )}

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => __resetPassword()}
          >
            <Text
              style={[
                styles.signup,
                {
                  color: "#fff",
                },
              ]}
            >
              Send Password Reset
            </Text>
          </TouchableOpacity>
          <Text style={{ color: AppStyles.color.main, marginTop: 15 }}>
            Please check your mail to create a new password after clicking on
            the password reset button above.
          </Text>
        </View>
      </Animatable.View>
    </View>
  );
};

export default ForgotActivity;

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
    flex: 3,
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
    textAlign: "center",
  },
  text_footer: {
    color: AppStyles.color.main,
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: AppStyles.color.main,
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
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
    textAlign: "center",
    alignItems: "center",
    paddingTop: 6,
    borderRadius: 10,
    backgroundColor: AppStyles.color.main,
    fontSize: 18,
    fontWeight: "bold",
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
