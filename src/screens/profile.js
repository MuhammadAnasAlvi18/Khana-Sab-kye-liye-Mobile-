import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import auth from "../config/firebase";
import { onAuthStateChanged  , signOut} from "firebase/auth";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";
import logo from "../components/logo.png";
import { doc ,collection, getFirestore, addDoc , setDoc } from "firebase/firestore";

const Profile = () => {
  const [userid, setuserid] = useState(null);
  const [name, setname] = useState("");
  const [fathername, setfathername] = useState("");
  const [cnic, setcnic] = useState("");
  const [birth, setbirth] = useState("");
  const [family, setfamily] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Monthly Ration", value: "monthly ration" },
    { label: "Daily one time", value: "Daily one time" },
    { label: "Daily two time", value: "Daily two time" },
    { label: "Daily three time", value: "Daily three time" },
  ]);
  const [userImage, setUserImage] = useState(null);
  const [CNICImage, setCNICImage] = useState(null);
  const [income, setincome] = useState("");
  const db = getFirestore()

  const UserpickerImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setUserImage(result.uri);
    }
  };

  const CNICpickerImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setCNICImage(result.uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            console.log(uid);
            setuserid(uid);
            // ...
          } else {
            // User is signed out
            // ...
          }
        });
      })}
      <Text>{userid}</Text>
      <Image source={logo} style={{ width: 300, height: 300, marginTop: 40 }} />
      <Text>Apply To "Khana Sab KE Liye"</Text>
      <TouchableOpacity style={styles.btn} onPress={()=>{
        signOut(auth).then(() => {
            // Sign-out successful.
            setuserid(null)
          }).catch((error) => {
            // An error happened.
          });
    }}><Text>SIGNOUT</Text></TouchableOpacity>
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter Name"
        value={name}
        onChangeText={(text) => {
          setname(text);
        }}
      ></TextInput>
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter Father Name"
        value={fathername}
        onChangeText={(text) => {
          setfathername(text);
        }}
      ></TextInput>
      <TextInput
        style={styles.inputStyle}
        placeholder="CNIC Number"
        value={cnic}
        onChangeText={(text) => {
          setcnic(text);
        }}
      ></TextInput>
      <TextInput
        style={styles.inputStyle}
        placeholder="Date Of Birth"
        value={birth}
        onChangeText={(text) => {
          setbirth(text);
        }}
      ></TextInput>
      <TextInput
        style={styles.inputStyle}
        placeholder="Family Members"
        value={family}
        onChangeText={(text) => {
          setfamily(text);
        }}
      ></TextInput>
      <DropDownPicker
        style={
          ({ flex: 1 }, { justifyContent: "center" }, { alignItems: "center" })
        }
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
      <Button
        title="Pick your image from camera roll"
        onPress={UserpickerImage}
      />
      {userImage && (
        <Image
          source={{ uri: userImage }}
          style={{ width: 200, height: 200 }}
        />
      )}
      <Button
        title="Pick your CNIC image from camera roll"
        onPress={CNICpickerImage}
      />
      {CNICImage && (
        <Image
          source={{ uri: CNICImage }}
          style={{ width: 200, height: 200 }}
        />
      )}
      <TextInput
        style={styles.inputStyle}
        placeholder="Monthly Income"
        value={income}
        onChangeText={(text) => {
          setincome(text);
        }}
      ></TextInput>
      <TouchableOpacity
        style={styles.btn}
        onPress={async () => {
            // let obj = {
            //     userid : userid,
            //     name : name,
            //     fathername : fathername,
            //     cnic : cnic,
            //     birth : birth,
            //     family : family,
            //     value : value,
            //     userImage : userImage,
            //     CNICImage : CNICImage,
            //     income : income
            // }
            // let helpRef = collection(db, 'help');
            // await addDoc(helpRef, obj);

            await setDoc(doc(db, "help", userid), {
                    userid : userid,
                    name : name,
                    fathername : fathername,
                    cnic : cnic,
                    birth : birth,
                    family : family,
                    value : value,
                    userImage : userImage,
                    CNICImage : CNICImage,
                    income : income
                });


            setname('')
            setfathername('')
            setcnic('')
            setbirth('')
            setfamily('')
            setValue(null)
            setUserImage(null)
            setCNICImage(null)
            setincome('')

        }}
      >
        <Text>SUBMIT</Text>
      </TouchableOpacity>
    </ScrollView>
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
  containerStyle: {
    backgroundColor: "#000",
  },
  labelStyle: {
    color: "#fff",
  },
});

export default Profile;
