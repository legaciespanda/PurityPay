import { Platform, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;
const numColumns = 2;

export const AppStyles = {
         color: {
           //05014a
           deepblue: "#1184e8",
           activeTintColor: "#1184e8",
           main: "#1184e8",
           row: "#1184e8",
           text: "#1184e8",
           title: "#1184e8",
           subtitle: "#1184e8",
           categoryTitle: "#161616",
           tint: "#1184e8",
           description: "#bbbbbb",
           filterTitle: "#8a8a8a",
           starRating: "#2bdf85",
           location: "#a9a9a9",
           white: "white",
           facebook: "#4267b2",
           grey: "grey",
           greenBlue: "#00aea8",
           placeholder: "#a0a0a0",
           background: "#1184e8",
           blue: "#1184e8",
         },
         fontSize: {
           title: 30,
           content: 20,
           normal: 16,
         },
         buttonWidth: {
           main: "70%",
         },
         textInputWidth: {
           main: "80%",
         },
         fontName: {
           main: "Noto Sans",
           bold: "Noto Sans",
         },
         borderRadius: {
           main: 25,
           small: 5,
         },
       };

export const AppIcon = {
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 8,
    marginRight: 10
  },
  style: {
    tintColor: AppStyles.color.main,
    width: 25,
    height: 25
  },
  // images: {
  //   home: require("../assets/icons/home.png"),
  //   defaultUser: require("../assets/icons/default_user.jpg"),
  //   logout: require("../assets/icons/shutdown.png")
  // }
};

export const HeaderButtonStyle = StyleSheet.create({
  multi: {
    flexDirection: "row"
  },
  container: {
    padding: 10
  },
  image: {
    justifyContent: "center",
    width: 35,
    height: 35,
    margin: 6
  },
  rightButton: {
    color: AppStyles.color.tint,
    marginRight: 10,
    fontWeight: "normal",
    fontFamily: AppStyles.fontName.main
  }
});

export const ListStyle = StyleSheet.create({
  title: {
    fontSize: 16,
    color: AppStyles.color.subtitle,
    fontFamily: AppStyles.fontName.bold,
    fontWeight: "bold"
  },
  subtitleView: {
    minHeight: 55,
    flexDirection: "row",
    paddingTop: 5,
    marginLeft: 10
  },
  leftSubtitle: {
    flex: 2
  },
  avatarStyle: {
    height: 80,
    width: 80
  }
});
