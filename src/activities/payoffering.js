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

import { useNavigation } from "@react-navigation/native";

const PayOffering = ({ navigation }) => {
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
              <Title>Offering - Purity Pay</Title>
            </Body>
          </Header>

          <Content></Content>

          <Footer>
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
          </Footer>
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

export default PayOffering;
