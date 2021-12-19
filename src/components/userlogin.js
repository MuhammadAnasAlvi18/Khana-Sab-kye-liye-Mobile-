import React, { useState, useHistory, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import auth from "../config/firebase";


const UserLogin = ({navigation}) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const db = getFirestore()



  function signup() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        alert('Registered Successfully')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

    setemail("");
    setpassword("");
  }

  function login() {
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

  function forget() {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }


  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          console.log(uid)
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
  })

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Signup & Signin Here</Text>
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
      <TouchableOpacity style={styles.btn} onPress={signup}>
        Signup
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={login}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={forget}>
        <Text>Forget Password ?</Text>
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

export default UserLogin;
