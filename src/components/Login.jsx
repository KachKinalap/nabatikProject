import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet, TouchableOpacity} from 'react-native';
import PostService from '../API/PostService'
import MyInput from "../UI/MyInput";
import '@react-navigation/native'

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
            <Text style={{fontSize:24, marginBottom:40}}>Welcome to the Nabatik project!</Text>
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
                <Text style={{fontSize:18}}>
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
        backgroundColor:'#06c9f3',
        width:160,
        height:60,
        margin:30,
        borderRadius:6,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Login;
