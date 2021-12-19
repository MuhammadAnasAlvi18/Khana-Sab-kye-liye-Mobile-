import React , {useState , useEffect} from "react";
import { View, Text , StyleSheet , TextInput , TouchableOpacity } from "react-native";
import ManagerLogin from "../components/managerLogin";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../config/firebase";
import UserLogin from "../components/userlogin";
import Profile from "./profile";



const User = () => {

    const [helperid , sethelperid] = useState(null)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              sethelperid(uid)
              // ...
            } else {
                console.log('error')
            }
          });
    })

    if(helperid === null){
        return(
            <UserLogin></UserLogin>
        )
    }
    else{
        return(
        <Profile></Profile>
        )
    }
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   inputStyle: {
//     borderWidth: 2,
//     padding: "5px",
//     margin: 5,
//   },
//   btn: {
//     borderWidth: 2,
//     padding: 5,
//     margin: 5,
//     textTransform: "uppercase",
//   },
//   txt: {
//     textTransform: "uppercase",
//     fontSize: 20,
//   },
// });

export default User;
