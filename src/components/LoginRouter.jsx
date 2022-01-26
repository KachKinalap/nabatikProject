import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./Login";
import AppRouter from "./AppRouter";

const LoginRouter = () => {
    const [isAuth, setIsAuth] = useState(false)
    const [token, setToken] = useState('')

    const Stack = createNativeStackNavigator();

    // const slideToMain = ()=>{
    //     navigation.navigate('MainMenu')
    // }

    return (
        <View style={styles.container}>
        <NavigationContainer>

                {
                    isAuth
                    ?
                        <AppRouter setIsAuth={setIsAuth} token={token}/>
                    :
                        <Stack.Navigator screenOptions={{
                            headerShown: false
                        }}>
                            <Stack.Screen
                                name="Login"
                                component={()=><Login setIsAuth={setIsAuth} setToken={setToken}/>}
                            />
                        </Stack.Navigator>
                }



        </NavigationContainer>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
    }
})

export default LoginRouter;
