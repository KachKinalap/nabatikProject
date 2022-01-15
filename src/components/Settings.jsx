import React from 'react';
import {SafeAreaView, StyleSheet, Text} from "react-native";

const Settings = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Plant the bomb</Text>
            <Text>Don't plant the bomb</Text>
            <Text>Fuck them all</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'space-around',
        alignItems:'center'
    }
})

export default Settings;
