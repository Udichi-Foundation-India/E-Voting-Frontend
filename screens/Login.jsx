import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signin } from "../services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const [voter, setVoter] = useState("");
  const [password, setPassword] = useState("");
  const { navigate } = useNavigation();

  const submitForm = () => {
    signin({
      voter,
      password,
    })
      .then(async (res) => {
        try {
          console.log(res.data);
          await AsyncStorage.setItem("user_id", JSON.stringify(res.data._id)),
            ToastAndroid.show(
              `Welcome Back!`,
              ToastAndroid.SHORT
            );
          setVoter("");
          setPassword("");
          navigate("Polls");
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => console.log(error.response));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/img/evote-logo.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.innerTitle}>Make your vote matter today!</Text>
        </View>
        <View style={styles.inputContainer}>
          <Input
            value={voter}
            onChangeText={(voter) => setVoter(voter)}
            Icon={<Feather name="user" size={24} color="silver" />}
            placeholder={"Voter Number"}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            value={password}
            onChangeText={(password) => setPassword(password)}
            Icon={<Feather name="lock" size={24} color="silver" />}
            placeholder={"Password"}
            secureTextEntry
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button title={"Signin"} onPress={submitForm} />
        </View>
      </View>
      <View style={styles.footer}>
        <View>
          <Text style={styles.registerLink}>
            Don't have an account?{" "}
            <Text onPress={() => navigate("Register")} style={styles.text}>
              Signup
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  header: {
    marginLeft: 8,
    paddingTop: 32,
    padding: 16,
  },
  title: {
    fontSize: 18,
    paddingVertical: 8,
  },
  innerTitle: {
    fontSize: 14,
    color: "#BCBCBC",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  logoText: {
    fontSize: 32,
    paddingLeft: 12,
    color: "#0B4890",
  },
  inputContainer: {
    display: "flex",
    paddingHorizontal: 24,
    paddingTop: 8,
    borderRadius: 8,
  },
  text: {
    fontSize: 14,
    paddingTop: 8,
    textAlign: "right",
    color: "#0B4890",
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  footer: {
    paddingHorizontal: 24,
  },
  registerLink: {
    textAlign: "center",
    paddingTop: 48,
    color: "#A1A1A1",
  },
});
