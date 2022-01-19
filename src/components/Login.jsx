import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image} from 'react-native';
import PostService from '../API/PostService'
import MyInput from "../UI/MyInput";
import '@react-navigation/native'
import {ImageBackground} from "react-native-web";

const Login = (props, {navigation}) => {

    const [token, setToken] = useState('')
    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')

    const Auth = async (userLogin, password)=> {
        const response =  await PostService.getToken(userLogin, password)
        console.log(response)
        if(response.data.success===true)
            props.setIsAuth(true)
        else
        {}
        // navigation.navigate('MainMenu')
        // // we should remove arrow "back"
        // navigation.reset(
        //     {
        //         index: 0,
        //         routes: [{ name: 'MainMenu' }],
        //     }
        // )
    }

    return (
        <View style={styles.container}>
            <Image source={require('../Images/logoNab.png')}/>
            <View>
                <Image
                    source={require('../Images/logoText.png')}
                    style={styles.logoText}
                />
            </View>
            <MyInput
                value={login}
                secure={false}
                label={'login'}
                onChange={setLogin}
            />
            <MyInput
                value={pass}
                secure={true}
                label={'password'}
                onChange={setPass}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={()=>{
                    Auth(login, pass)

                }}>
                <Text style={{fontSize:18, color:'#fff'}}>
                    Enter
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        backgroundColor:'#90c900',
        width:160,
        height:60,
        margin:30,
        borderRadius:30,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText:{
        flex: 1,
        width:160,
        maxHeight:60,
        resizeMode:'contain',
        marginBottom:60
    }
})

export default Login;
