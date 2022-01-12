import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import PostService from '../API/PostService'

const Login = (props) => {

    const [token, setToken] = useState('')
    let response = 'kek';
    useEffect(()=>{
        response = PostService.getToken()
    },[])

    return (
        <View>
            <Button title={'батон'} onPress={()=>console.log(response)}/>
        </View>
    );
};

export default Login;
