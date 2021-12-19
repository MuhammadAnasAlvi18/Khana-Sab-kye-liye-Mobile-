import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NavigationFunc from './src/components/navigation';

export default function App() {
  return (
    <View style={{flex:1}}>
      <NavigationFunc></NavigationFunc>
    </View>
  );
}
