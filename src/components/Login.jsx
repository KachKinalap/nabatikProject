import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import PostService from '../API/PostService'
import MyInput from "../UI/MyInput";
import '@react-navigation/native'

const Login = (props, navigation) => {

    const [token, setToken] = useState('')
    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')

    const Auth = (userLogin, password)=> {
        const response = PostService.getToken(userLogin, password)
        console.log(response)

        //console.log(token._W)
        //console.log(token)
        // if(token){
        //     props.action()
        // }

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
            <Button title={'батон'} onPress={()=>Auth(login, pass)}/>
            <Button title={'батон2'} onPress={()=>console.log(token)}/>
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
