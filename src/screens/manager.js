import React , {useState , useEffect} from "react";
import { View, Text , StyleSheet , TextInput , TouchableOpacity } from "react-native";
import ManagerLogin from "../components/managerLogin";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../config/firebase";



const Manager = () => {

    const [managerid , setmanagerid] = useState(null)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              setmanagerid(uid)
              // ...
            } else {
                console.log('error')
            }
          });
    })

    if(managerid === 'ICpSGgRbxwMRq7gmG46Muh2Ll3I2'){
        return(
            <Text>Logged In</Text>
        )
    }
    else{
        return(
        <ManagerLogin></ManagerLogin>
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

export default Manager;
