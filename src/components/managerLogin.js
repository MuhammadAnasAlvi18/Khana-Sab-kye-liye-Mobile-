import React , {useState} from "react";
import { View, Text , StyleSheet , TextInput , TouchableOpacity } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../config/firebase";

const ManagerLogin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");


  function loginManager() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigation.navigate("Profile")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

    setemail("");
    setpassword("");
  }


  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Manager Login Here</Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setemail(text);
        }}
      ></TextInput>
      <TextInput
        secureTextEntry={true}
        style={styles.inputStyle}
        placeholder="Password"
        value={password}
        onChangeText={(text) => {
          setpassword(text);
        }}
      ></TextInput>
      <TouchableOpacity style={styles.btn} onPress={loginManager}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputStyle: {
    borderWidth: 2,
    padding: "5px",
    margin: 5,
  },
  btn: {
    borderWidth: 2,
    padding: 5,
    margin: 5,
    textTransform: "uppercase",
  },
  txt: {
    textTransform: "uppercase",
    fontSize: 20,
  },
});

export default ManagerLogin;
