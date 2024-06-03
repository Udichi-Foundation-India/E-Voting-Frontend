import { useState } from "react";
import { Text, StyleSheet, SafeAreaView, View, Image } from "react-native";
import Input from "../components/Input";
import { Feather } from "@expo/vector-icons";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { signup } from "../services/auth";

export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [voter, setVoter] = useState("");
  const { navigate } = useNavigation();

  const submitForm = () => {
    signup({
      name,
      phone,
      aadhar,
      voter,
      password,
    })
      .then(async (res) => {
        try {
          setName("");
          setPhone("");
          setPassword("");
          setAadhar("");
          setVoter("");
          navigate("Login");
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
          <Text style={styles.title}>Create an Account</Text>
          <Text style={styles.innerTitle}>Make your vote matter today!</Text>
        </View>
        <View style={styles.inputContainer}>
          <Input
            value={name}
            onChangeText={(name) => setName(name)}
            Icon={<Feather name="user" size={24} color="silver" />}
            placeholder={"Name"}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            value={phone}
            onChangeText={(phone) => setPhone(phone)}
            Icon={<Feather name="phone" size={24} color="silver" />}
            placeholder={"Phone Number"}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            value={aadhar}
            onChangeText={(aadhar) => setAadhar(aadhar)}
            Icon={<Feather name="list" size={24} color="silver" />}
            placeholder={"Aadhar Number"}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            value={voter}
            onChangeText={(voter) => setVoter(voter)}
            Icon={<Feather name="list" size={24} color="silver" />}
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
          <Button title={"Signup"} onPress={submitForm} />
        </View>
      </View>
      <View style={styles.footer}>
        <View>
          <Text style={styles.loginLink}>
            Already have an account?{" "}
            <Text onPress={() => navigate("Login")} style={styles.text}>
              Signin
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
    paddingTop: 20,
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
  buttonContainer: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  text: {
    fontSize: 14,
    paddingTop: 8,
    textAlign: "right",
    color: "#0B4890",
  },
  loginLink: {
    textAlign: "center",
    color: "#A1A1A1",
    paddingTop: 36,
  },
});
