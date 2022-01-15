import React from 'react';
import {SafeAreaView, StyleSheet, Text} from "react-native";

const History = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>First</Text>
            <Text>Second</Text>
            <Text>Third</Text>
            <Text>Fourth</Text>
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

export default History;
