import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Geoposition from "./src/components/Geoposition";
import React from "react";
import CameraView from "./src/components/CameraView";
import Gallery from "./src/UI/Gallery";
import Login from "./src/components/Login";

export default function App() {
  return (
    <View style={styles.container}>
      {/*<Geoposition/>*/}
      {/*<CameraView/>*/}
      {/*<Gallery/>*/}
      {/*<Popup/>*/}
      <Login/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent:'center',
    alignItems:'center'
  },
});
