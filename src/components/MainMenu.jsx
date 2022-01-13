import React from 'react';
import {SafeAreaView, Text, StyleSheet} from "react-native";

const MainMenu = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>MainMenu</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default MainMenu;
