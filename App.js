import {SafeAreaView, StyleSheet, LogBox} from 'react-native';
import React, {useState} from "react";
import LoginRouter from "./src/components/LoginRouter";
import * as Font from 'expo-font';


export default function App() {
  // LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  // LogBox.ignoreAllLogs();//Ignore all log notifications
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
