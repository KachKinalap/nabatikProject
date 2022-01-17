import React from 'react';
import {SafeAreaView, Text, StyleSheet, Image, View, TouchableOpacity} from "react-native";
import TipProvider from "react-native-tip";
import { Tip } from "react-native-tip";


const MainMenu = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.iconsCont}>
                <View style={styles.backImage}>
                    <Text style={styles.labelItem}>Take a photo</Text>
                    <TouchableOpacity style={{marginTop:5}} onPress={()=>navigation.navigate('Camera')}>
                        <Image source={require('../Images/camera.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.backImage}>
                    <Text style={styles.labelItem}>History</Text>
                    <TouchableOpacity style={{marginTop:5}} onPress={()=>navigation.navigate('History')}>
                        <Image source={require('../Images/history.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.backImage}>
                    <Text style={styles.labelItem}>Settings</Text>
                    <TouchableOpacity style={{marginTop:5}} onPress={()=>navigation.navigate('Settings')}>
                        <Image source={require('../Images/settings.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#06c9f3'
    },
    iconsCont:{
        height:'80%',
        justifyContent:'space-around',
        alignItems:'center'
    },
    backImage:{
        backgroundColor:'#06c9f3',
        width:140,
        height:140,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:50
    },
    labelItem:{
        fontSize:16,
        fontWeight:'700'
    }
})

export default MainMenu;
