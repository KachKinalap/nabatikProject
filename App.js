import {SafeAreaView, StyleSheet, Dimensions} from 'react-native';
import React from "react";
import LoginRouter from "./src/components/LoginRouter";
import MainMenu from "./src/components/MainMenu";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/*<LoginRouter/>*/}
      <MainMenu/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,

  }
})
