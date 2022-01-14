import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
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
            <Button
                title={'button'}
                onPress={()=>{
                    Auth(login, pass)

                }}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default Login;
