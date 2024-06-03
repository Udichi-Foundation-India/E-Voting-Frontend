import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { Image, SafeAreaView, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native";

export default function Splash({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(AsyncStorage.getItem("user"));
  }, []);

  setTimeout(() => {
    navigation.navigate("Login");
  }, 3000);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Image source={require("../assets/img/white_logo.png")} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0B4890",
    height: "100%",
  },
  text: {
    paddingTop: 50,
    fontSize: 32,
    color: "#FFFFFF",
  },
});
