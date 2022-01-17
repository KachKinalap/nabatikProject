import {SafeAreaView, StyleSheet, LogBox} from 'react-native';
import React from "react";
import LoginRouter from "./src/components/LoginRouter";
import MainMenu from "./src/components/MainMenu";




export default function App() {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications
  return (
    <SafeAreaView style={styles.container}>
      <LoginRouter/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    width:'100%',
    height:'100%',

  }
})
